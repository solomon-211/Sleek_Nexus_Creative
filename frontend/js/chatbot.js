// Advanced Chatbot Widget
class Chatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.conversationContext = null;
        this.userName = null;
        this.userEmail = null;
        this.isTyping = false;
        this.messageHistory = [];
        this.init();
    }

    init() {
        this.createChatWidget();
        this.attachEventListeners();
        this.loadChatHistory();
        const greeting = this.getTimeBasedGreeting();
        this.addBotMessage(`${greeting} Welcome to Sleek Nexus Creative!<br><br>I'm your virtual assistant. How may I help you today?`);
        this.showQuickReplies();
    }

    getTimeBasedGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning!';
        if (hour < 18) return 'Good afternoon!';
        return 'Good evening!';
    }

    loadChatHistory() {
        const saved = localStorage.getItem('chatHistory');
        if (saved) {
            this.messageHistory = JSON.parse(saved);
        }
    }

    saveChatHistory() {
        localStorage.setItem('chatHistory', JSON.stringify(this.messageHistory.slice(-20)));
    }

    createChatWidget() {
        const chatHTML = `
            <div id="chatbot-container" class="chatbot-closed">
                <button id="chatbot-toggle" class="chatbot-toggle" aria-label="Toggle chat">
                    <i class="fas fa-comments"></i>
                    <span class="chatbot-badge">1</span>
                </button>
                
                <div id="chatbot-window" class="chatbot-window">
                    <div class="chatbot-header">
                        <div class="chatbot-header-info">
                            <h3>Sleek Nexus Creative</h3>
                            <span class="chatbot-status"><span class="status-dot"></span>Online - Avg. reply time: 2 min</span>
                        </div>
                        <div class="chatbot-actions">
                            <button id="chatbot-minimize" class="chatbot-action-btn" aria-label="Minimize" title="Minimize">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button id="chatbot-restart" class="chatbot-action-btn" aria-label="Restart" title="Restart conversation">
                                <i class="fas fa-redo"></i>
                            </button>
                            <button id="chatbot-close" class="chatbot-close-btn" aria-label="Close chat">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div id="chatbot-messages" class="chatbot-messages"></div>
                    
                    <div id="chatbot-quick-replies" class="chatbot-quick-replies"></div>
                    
                    <div class="chatbot-input-area">
                        <button id="chatbot-emoji" class="chatbot-emoji-btn" aria-label="Emoji" title="Add emoji">
                            <i class="fas fa-smile"></i>
                        </button>
                        <input type="text" id="chatbot-input" placeholder="Type a message..." aria-label="Chat message">
                        <button id="chatbot-attach" class="chatbot-attach-btn" aria-label="Attach file" title="Attach file">
                            <i class="fas fa-paperclip"></i>
                        </button>
                        <button id="chatbot-send" class="chatbot-send-btn" aria-label="Send message">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    <div class="chatbot-footer">
                        <small>Powered by Sleek Nexus Creative AI</small>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    attachEventListeners() {
        document.getElementById('chatbot-toggle').addEventListener('click', () => this.toggleChat());
        document.getElementById('chatbot-close').addEventListener('click', () => this.toggleChat());
        document.getElementById('chatbot-minimize').addEventListener('click', () => this.minimizeChat());
        document.getElementById('chatbot-restart').addEventListener('click', () => this.restartChat());
        document.getElementById('chatbot-send').addEventListener('click', () => this.sendMessage());
        document.getElementById('chatbot-emoji').addEventListener('click', () => this.showEmojiPicker());
        document.getElementById('chatbot-attach').addEventListener('click', () => this.handleFileAttach());
        
        const input = document.getElementById('chatbot-input');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        input.addEventListener('input', () => this.showTypingIndicatorToBot());
    }

    minimizeChat() {
        const container = document.getElementById('chatbot-container');
        container.classList.toggle('minimized');
    }

    restartChat() {
        if (confirm('Are you sure you want to restart the conversation?')) {
            document.getElementById('chatbot-messages').innerHTML = '';
            this.userName = null;
            this.userEmail = null;
            this.messageHistory = [];
            localStorage.removeItem('chatHistory');
            const greeting = this.getTimeBasedGreeting();
            this.addBotMessage(`${greeting} Let's start fresh! How can I help you today?`);
            this.showQuickReplies();
        }
    }

    showEmojiPicker() {
        const emojis = ['[+1]', '[-1]', '[smile]', '[sad]', '[heart]', '[party]', '[clap]', '[fire]'];
        const input = document.getElementById('chatbot-input');
        const picker = document.createElement('div');
        picker.className = 'emoji-picker';
        picker.innerHTML = emojis.map(e => `<span class="emoji-item">${e}</span>`).join('');
        
        const existing = document.querySelector('.emoji-picker');
        if (existing) {
            existing.remove();
            return;
        }
        
        document.querySelector('.chatbot-input-area').appendChild(picker);
        picker.querySelectorAll('.emoji-item').forEach(item => {
            item.addEventListener('click', () => {
                input.value += item.textContent;
                picker.remove();
                input.focus();
            });
        });
    }

    handleFileAttach() {
        this.addBotMessage('File attachments are coming soon! For now, please describe your requirements or email us at info@SNC.ss');
    }

    showTypingIndicatorToBot() {
        // Simulate bot seeing user typing
        clearTimeout(this.typingTimeout);
        this.typingTimeout = setTimeout(() => {
            // User stopped typing
        }, 1000);
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const container = document.getElementById('chatbot-container');
        const badge = document.querySelector('.chatbot-badge');
        
        if (this.isOpen) {
            container.classList.remove('chatbot-closed');
            container.classList.add('chatbot-open');
            if (badge) badge.style.display = 'none';
            document.getElementById('chatbot-input').focus();
        } else {
            container.classList.remove('chatbot-open');
            container.classList.add('chatbot-closed');
        }
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addUserMessage(message);
        this.messageHistory.push({ role: 'user', text: message, time: new Date() });
        this.saveChatHistory();
        input.value = '';
        
        // Remove emoji picker if open
        const picker = document.querySelector('.emoji-picker');
        if (picker) picker.remove();
        
        this.showTypingIndicator();
        const delay = Math.min(800 + message.length * 20, 2000);
        setTimeout(() => {
            this.hideTypingIndicator();
            this.handleUserMessage(message);
        }, delay);
    }

    addUserMessage(text) {
        const messagesDiv = document.getElementById('chatbot-messages');
        const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const messageHTML = `
            <div class="chatbot-message user-message">
                <div class="message-content">${this.escapeHtml(text)}
                    <span class="message-time">${time}</span>
                    <span class="message-status"><i class="fas fa-check-double"></i></span>
                </div>
            </div>
        `;
        messagesDiv.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
    }

    addBotMessage(text) {
        const messagesDiv = document.getElementById('chatbot-messages');
        const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const messageHTML = `
            <div class="chatbot-message bot-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">${text}<span class="message-time">${time}</span></div>
            </div>
        `;
        messagesDiv.insertAdjacentHTML('beforeend', messageHTML);
        this.messageHistory.push({ role: 'bot', text: text, time: new Date() });
        this.saveChatHistory();
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const messagesDiv = document.getElementById('chatbot-messages');
        const typingHTML = `
            <div class="chatbot-message bot-message typing-indicator" id="typing-indicator">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <div class="typing-dots">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </div>
        `;
        messagesDiv.insertAdjacentHTML('beforeend', typingHTML);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    showQuickReplies(replies = null) {
        const quickRepliesDiv = document.getElementById('chatbot-quick-replies');
        
        const defaultReplies = [
            { text: 'Our Services', action: 'services' },
            { text: 'View Projects', action: 'projects' },
            { text: 'Courses', action: 'courses' },
            { text: 'Contact Us', action: 'contact' }
        ];
        
        const repliesToShow = replies || defaultReplies;
        
        quickRepliesDiv.innerHTML = repliesToShow.map(reply => 
            `<button class="quick-reply-btn" data-action="${reply.action}">${reply.text}</button>`
        ).join('');
        
        quickRepliesDiv.querySelectorAll('.quick-reply-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleQuickReply(btn.dataset.action, btn.textContent);
            });
        });
    }

    handleQuickReply(action, text) {
        if (text) this.addUserMessage(text);
        document.getElementById('chatbot-quick-replies').innerHTML = '';
        
        this.showTypingIndicator();
        setTimeout(() => {
            this.hideTypingIndicator();
            
            switch(action) {
                case 'services':
                    this.addBotMessage(`Excellent choice${this.userName ? ', ' + this.userName : ''}! We offer four main services:<br><br><strong>Software Development</strong> - Custom solutions<br><strong>Web & Mobile Apps</strong> - Responsive platforms<br><strong>Educational Technology</strong> - Learning systems<br><strong>IT Consulting</strong> - Strategic guidance<br><br>Which service would you like to learn more about?`);
                    this.showQuickReplies([
                        { text: 'Software Development', action: 'software' },
                        { text: 'Web & Mobile', action: 'webmobile' },
                        { text: 'EdTech', action: 'edtech' },
                        { text: 'IT Consulting', action: 'consulting' }
                    ]);
                    break;
                case 'projects':
                    this.addBotMessage("We have successfully completed over 50 projects, including:<br><br>• E-Learning platforms serving 10,000+ students<br>• Business management systems<br>• Mobile banking applications<br>• Custom enterprise solutions<br><br>Would you like to view our portfolio?");
                    this.showQuickReplies([
                        { text: 'View Portfolio', action: 'projects-page' },
                        { text: 'Request Quote', action: 'contact' },
                        { text: 'Back to Menu', action: 'menu' }
                    ]);
                    break;
                case 'courses':
                    this.addBotMessage("We offer professional tech training:<br><br>Full-Stack Web Development<br>Mobile App Development<br>EdTech Solutions<br>Cybersecurity<br>Data Analysis<br><br>Interested in enrolling?");
                    this.showQuickReplies([
                        { text: 'View All Courses', action: 'courses-page' },
                        { text: 'Get Course Info', action: 'contact' },
                        { text: 'Back to Menu', action: 'menu' }
                    ]);
                    break;
                case 'contact':
                    this.addBotMessage(`Perfect${this.userName ? ', ' + this.userName : ''}! Here is how you can reach us:<br><br><strong>Location:</strong> Juba, South Sudan<br><strong>Phone:</strong> +211 925 277 700<br><strong>Email:</strong> info@SNC.ss<br><strong>Business Hours:</strong> Monday-Friday, 9:00 AM - 6:00 PM<br><br>Would you like to complete our contact form?`);
                    this.showQuickReplies([
                        { text: 'Contact Form', action: 'contact-page' },
                        { text: 'WhatsApp Us', action: 'whatsapp' },
                        { text: 'Back to Menu', action: 'menu' }
                    ]);
                    break;
                case 'software':
                    this.addBotMessage("<strong>Software Development Services:</strong><br><br>• Custom application development<br>• Enterprise software solutions<br>• API development & integration<br>• Database design & management<br>• Cloud-based solutions<br><br>Average project timeline: 3-6 months. Would you like to request a quote?");
                    this.showQuickReplies([
                        { text: 'Request Quote', action: 'contact' },
                        { text: 'View Projects', action: 'projects' },
                        { text: 'Back to Services', action: 'services' }
                    ]);
                    break;
                case 'webmobile':
                    this.addBotMessage("<strong>Web & Mobile Development:</strong><br><br>• Responsive websites<br>• Progressive web applications (PWA)<br>• iOS & Android applications<br>• Cross-platform solutions<br>• E-commerce platforms<br><br>Project timeline: Starting from 2-4 weeks. Are you interested in learning more?");
                    this.showQuickReplies([
                        { text: 'Request Quote', action: 'contact' },
                        { text: 'View Projects', action: 'projects' },
                        { text: 'Back to Services', action: 'services' }
                    ]);
                    break;
                case 'edtech':
                    this.addBotMessage("<strong>Educational Technology:</strong><br><br>• Learning Management Systems (LMS)<br>• Online course platforms<br>• Student information systems<br>• Interactive learning tools<br>• Virtual classroom solutions<br><br>Currently serving over 10,000 students. Would you like to learn more?");
                    this.showQuickReplies([
                        { text: 'Request Demo', action: 'contact' },
                        { text: 'View Projects', action: 'projects' },
                        { text: 'Back to Services', action: 'services' }
                    ]);
                    break;
                case 'consulting':
                    this.addBotMessage("<strong>IT Consulting Services:</strong><br><br>• Technology strategy & planning<br>• Digital transformation<br>• System architecture design<br>• Security audits & compliance<br>• Cloud migration services<br><br>Would you like to schedule a consultation?");
                    this.showQuickReplies([
                        { text: 'Schedule Consultation', action: 'contact' },
                        { text: 'Learn More', action: 'services-page' },
                        { text: 'Back to Services', action: 'services' }
                    ]);
                    break;
                case 'projects-page':
                    this.addBotMessage("Redirecting you to our projects page...");
                    setTimeout(() => window.location.href = 'projects.html', 1000);
                    break;
                case 'services-page':
                    this.addBotMessage("Redirecting you to our services page...");
                    setTimeout(() => window.location.href = 'services.html', 1000);
                    break;
                case 'courses-page':
                    this.addBotMessage("Redirecting you to our courses page...");
                    setTimeout(() => window.location.href = 'courses.html', 1000);
                    break;
                case 'contact-page':
                    this.addBotMessage("Redirecting you to our contact form...");
                    setTimeout(() => window.location.href = 'contact.html', 1000);
                    break;
                case 'whatsapp':
                    this.addBotMessage("Opening WhatsApp messenger...");
                    setTimeout(() => window.open('https://wa.me/211925277700?text=Hello%20Sleek%20Technology', '_blank'), 1000);
                    break;
                case 'menu':
                    this.addBotMessage("Returning to the main menu. How may I assist you?");
                    this.showQuickReplies();
                    break;
            }
        }, 800);
    }

    handleUserMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Capture email if provided
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
        const emailMatch = message.match(emailRegex);
        if (emailMatch && !this.userEmail) {
            this.userEmail = emailMatch[0];
            this.addBotMessage(`Great! I've saved your email: ${this.userEmail}. Our team will reach out to you soon.`);
            return;
        }
        
        // Handle name input
        if (!this.userName && !lowerMessage.includes('service') && !lowerMessage.includes('contact') && message.split(' ').length <= 3) {
            this.userName = message.split(' ')[0];
            this.addBotMessage(`It's a pleasure to meet you, ${this.userName}!<br><br>I'm here to assist you in learning about Sleek Nexus Creative. How may I help you today?`);
            this.showQuickReplies();
            return;
        }
        
        // Smart keyword matching with context
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote') || lowerMessage.includes('budget') || lowerMessage.includes('how much')) {
            this.addBotMessage("Our pricing is project-specific and depends on:<br><br>• Scope and complexity<br>• Timeline and deadlines<br>• Technology stack required<br>• Ongoing maintenance needs<br><br>For an accurate quote, please share your project details with our team.");
            this.showQuickReplies([
                { text: 'Request Quote', action: 'contact' },
                { text: 'View Services', action: 'services' },
                { text: 'Share Email', action: 'email' }
            ]);
        } else if (lowerMessage.includes('email') || lowerMessage.includes('contact details') || lowerMessage.includes('reach you')) {
            this.addBotMessage(`Please share your email address and I'll make sure our team contacts you. You can type it directly here.`);
        } else if (lowerMessage.includes('time') || lowerMessage.includes('duration') || lowerMessage.includes('how long') || lowerMessage.includes('deadline')) {
            this.addBotMessage("Project timelines vary:<br><br>• Simple websites: 2-4 weeks<br>• Mobile apps: 2-4 months<br>• Custom software: 3-6 months<br>• Enterprise solutions: 6+ months<br><br>We provide detailed timelines during consultation. Need a rush project? We offer expedited services!");
            this.showQuickReplies([
                { text: 'Schedule Consultation', action: 'contact' },
                { text: 'View Projects', action: 'projects' },
                { text: 'Urgent Project', action: 'contact' }
            ]);
        } else if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('office') || lowerMessage.includes('address')) {
            this.addBotMessage("We are based in Juba, South Sudan, but we serve clients throughout South Sudan and internationally. We use modern collaboration tools for remote projects.<br><br><strong>Phone:</strong> +211 925 277 700<br><strong>Email:</strong> info@SNC.ss");
            this.showQuickReplies([
                { text: 'Get Directions', action: 'contact' },
                { text: 'WhatsApp Us', action: 'whatsapp' },
                { text: 'Back to Menu', action: 'menu' }
            ]);
        } else if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('installment')) {
            this.addBotMessage("We offer flexible payment terms:<br><br>• Deposit required to start<br>• Milestone-based payments for large projects<br>• Final payment upon completion<br>• Installment plans available<br><br>Payment plans can be customized to your needs. We accept bank transfers, mobile money, and international payments.");
            this.showQuickReplies([
                { text: 'Discuss Payment', action: 'contact' },
                { text: 'Request Invoice', action: 'contact' },
                { text: 'Back to Menu', action: 'menu' }
            ]);
        } else if (lowerMessage.includes('support') || lowerMessage.includes('maintenance') || lowerMessage.includes('after') || lowerMessage.includes('warranty')) {
            this.addBotMessage("We provide comprehensive post-launch support:<br><br>• Technical support and bug fixes<br>• Regular updates and maintenance<br>• Training for your team<br>• Performance monitoring<br>• 24/7 emergency support available<br><br>Support packages available upon request with SLA guarantees.");
            this.showQuickReplies([
                { text: 'Learn More', action: 'contact' },
                { text: 'Support Plans', action: 'contact' },
                { text: 'Back to Menu', action: 'menu' }
            ]);
        } else if (lowerMessage.includes('technology') || lowerMessage.includes('tech stack') || lowerMessage.includes('tools') || lowerMessage.includes('framework')) {
            this.addBotMessage("We work with modern technologies:<br><br><strong>Frontend:</strong> React, Angular, Vue.js<br><strong>Backend:</strong> Node.js, Python, PHP<br><strong>Mobile:</strong> React Native, Flutter<br><strong>Database:</strong> MongoDB, MySQL, PostgreSQL<br><strong>Cloud:</strong> AWS, Azure, Google Cloud<br><br>We choose the best tech stack for your specific needs.");
            this.showQuickReplies([
                { text: 'View Services', action: 'services' },
                { text: 'Request Consultation', action: 'contact' },
                { text: 'See Projects', action: 'projects' }
            ]);
        } else if (lowerMessage.includes('service')) {
            this.handleQuickReply('services');
        } else if (lowerMessage.includes('course') || lowerMessage.includes('training') || lowerMessage.includes('learn')) {
            this.handleQuickReply('courses');
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
            this.handleQuickReply('contact');
        } else if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('work')) {
            this.handleQuickReply('projects');
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('hola')) {
            this.addBotMessage(`Hello${this.userName ? ', ' + this.userName : ''}! How may I assist you today?`);
            this.showQuickReplies();
        } else if (lowerMessage.includes('thank')) {
            this.addBotMessage(`You're welcome${this.userName ? ', ' + this.userName : ''}! Is there anything else I can help you with?`);
            this.showQuickReplies();
        } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
            this.addBotMessage(`Thank you for contacting Sleek Nexus Creative${this.userName ? ', ' + this.userName : ''}! Feel free to reach out anytime. Have a great day!`);
            setTimeout(() => this.toggleChat(), 2000);
        } else if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
            this.addBotMessage(`I can help you with:<br><br>• Information about our services<br>• Project portfolio and case studies<br>• Training courses<br>• Pricing and quotes<br>• Contact information<br>• Technical questions<br><br>Just ask me anything or select an option below!`);
            this.showQuickReplies();
        } else {
            this.addBotMessage(`I can help you with information about our services, projects, courses, pricing, and contact details. Please select an option below or type your question.`);
            this.showQuickReplies();
        }
    }

    scrollToBottom() {
        const messagesDiv = document.getElementById('chatbot-messages');
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});
