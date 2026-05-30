/**
 * WebSocket Server for Real-Time Features
 * Handles live notifications, chat, and real-time updates
 */

const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

class RealtimeServer {
  constructor(server, options = {}) {
    this.wss = new WebSocket.Server({ server });
    this.clients = new Map(); // clientId -> { ws, userId, channels }
    this.channels = new Map(); // channelName -> Set of clientIds
    this.messageHistory = new Map(); // channelName -> []

    this.maxHistorySize = options.maxHistorySize || 100;
    this.setupWebSocketServer();
  }

  setupWebSocketServer() {
    this.wss.on('connection', (ws, req) => {
      const clientId = uuidv4();
      console.log(`[WS] Client connected: ${clientId}`);

      const client = {
        id: clientId,
        ws,
        userId: null,
        channels: new Set(),
        isAlive: true,
      };

      this.clients.set(clientId, client);

      // Heartbeat
      ws.isAlive = true;
      ws.on('pong', () => {
        ws.isAlive = true;
      });

      // Handle incoming messages
      ws.on('message', (data) => {
        try {
          const message = JSON.parse(data.toString());
          this.handleMessage(clientId, message);
        } catch (error) {
          console.error('[WS] Error parsing message:', error);
          this.sendError(ws, 'Invalid message format');
        }
      });

      // Handle disconnect
      ws.on('close', () => {
        this.handleDisconnect(clientId);
      });

      // Handle errors
      ws.on('error', (error) => {
        console.error(`[WS] Client error (${clientId}):`, error);
      });

      // Send welcome message
      this.sendToClient(ws, {
        type: 'WELCOME',
        clientId,
        message: 'Connected to real-time server',
      });
    });

    // Heartbeat interval
    setInterval(() => {
      this.wss.clients.forEach((ws) => {
        if (ws.isAlive === false) return ws.terminate();
        ws.isAlive = false;
        ws.ping();
      });
    }, 30000);
  }

  handleMessage(clientId, message) {
    const client = this.clients.get(clientId);
    if (!client) return;

    const { type, payload } = message;

    switch (type) {
      case 'AUTHENTICATE':
        this.handleAuth(clientId, payload);
        break;
      case 'SUBSCRIBE':
        this.handleSubscribe(clientId, payload);
        break;
      case 'UNSUBSCRIBE':
        this.handleUnsubscribe(clientId, payload);
        break;
      case 'MESSAGE':
        this.handleBroadcast(clientId, payload);
        break;
      case 'PING':
        this.sendToClient(client.ws, { type: 'PONG' });
        break;
      default:
        console.warn(`[WS] Unknown message type: ${type}`);
    }
  }

  handleAuth(clientId, payload) {
    const client = this.clients.get(clientId);
    if (!client) return;

    try {
      const decoded = jwt.verify(payload.token, process.env.JWT_SECRET);
      client.userId = decoded.id;
      this.sendToClient(client.ws, {
        type: 'AUTH_SUCCESS',
        userId: client.userId,
      });
      console.log(`[WS] Client ${clientId} authenticated as user ${client.userId}`);
    } catch (error) {
      this.sendError(client.ws, 'Authentication failed');
    }
  }

  handleSubscribe(clientId, payload) {
    const client = this.clients.get(clientId);
    if (!client) return;

    const { channel } = payload;
    if (!channel) {
      this.sendError(client.ws, 'Channel name required');
      return;
    }

    client.channels.add(channel);

    if (!this.channels.has(channel)) {
      this.channels.set(channel, new Set());
    }
    this.channels.get(channel).add(clientId);

    // Send history if available
    if (this.messageHistory.has(channel)) {
      const history = this.messageHistory.get(channel);
      this.sendToClient(client.ws, {
        type: 'HISTORY',
        channel,
        messages: history,
      });
    }

    // Notify others
    this.broadcast(channel, {
      type: 'USER_JOINED',
      channel,
      userId: client.userId,
    }, clientId);

    console.log(`[WS] Client ${clientId} subscribed to ${channel}`);
  }

  handleUnsubscribe(clientId, payload) {
    const client = this.clients.get(clientId);
    if (!client) return;

    const { channel } = payload;
    client.channels.delete(channel);

    const channelClients = this.channels.get(channel);
    if (channelClients) {
      channelClients.delete(clientId);
    }

    console.log(`[WS] Client ${clientId} unsubscribed from ${channel}`);
  }

  handleBroadcast(clientId, payload) {
    const client = this.clients.get(clientId);
    if (!client) return;

    const { channel, message } = payload;
    if (!client.channels.has(channel)) {
      this.sendError(client.ws, `Not subscribed to ${channel}`);
      return;
    }

    const broadcastMessage = {
      type: 'MESSAGE',
      channel,
      userId: client.userId,
      clientId,
      content: message,
      timestamp: new Date().toISOString(),
    };

    // Store in history
    if (!this.messageHistory.has(channel)) {
      this.messageHistory.set(channel, []);
    }
    const history = this.messageHistory.get(channel);
    history.push(broadcastMessage);
    if (history.length > this.maxHistorySize) {
      history.shift();
    }

    // Broadcast to all subscribers
    this.broadcast(channel, broadcastMessage);
  }

  handleDisconnect(clientId) {
    const client = this.clients.get(clientId);
    if (!client) return;

    // Remove from all channels
    client.channels.forEach((channel) => {
      const channelClients = this.channels.get(channel);
      if (channelClients) {
        channelClients.delete(clientId);
      }

      this.broadcast(channel, {
        type: 'USER_LEFT',
        channel,
        userId: client.userId,
      });
    });

    this.clients.delete(clientId);
    console.log(`[WS] Client disconnected: ${clientId}`);
  }

  broadcast(channel, message, excludeClientId = null) {
    const channelClients = this.channels.get(channel);
    if (!channelClients) return;

    channelClients.forEach((clientId) => {
      if (clientId === excludeClientId) return;

      const client = this.clients.get(clientId);
      if (client && client.ws.readyState === WebSocket.OPEN) {
        this.sendToClient(client.ws, message);
      }
    });
  }

  sendToClient(ws, message) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }

  sendError(ws, error) {
    this.sendToClient(ws, {
      type: 'ERROR',
      message: error,
    });
  }

  // Public method to send notifications from server
  sendNotification(userId, notification) {
    const message = {
      type: 'NOTIFICATION',
      ...notification,
      timestamp: new Date().toISOString(),
    };

    this.clients.forEach((client) => {
      if (client.userId === userId) {
        this.sendToClient(client.ws, message);
      }
    });
  }

  // Broadcast to all connected clients
  broadcastToAll(message) {
    this.clients.forEach((client) => {
      this.sendToClient(client.ws, message);
    });
  }

  getStats() {
    return {
      connectedClients: this.clients.size,
      channels: this.channels.size,
      channelSubs: Array.from(this.channels.entries()).map(([name, subs]) => ({
        name,
        subscribers: subs.size,
      })),
    };
  }
}

module.exports = RealtimeServer;
