const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const BACKUP_DIR = process.env.BACKUP_PATH || './backups';
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/codebridge';
const RETENTION_DAYS = parseInt(process.env.BACKUP_RETENTION_DAYS) || 30;

// Create backup directory if not exists
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

function createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(BACKUP_DIR, `backup-${timestamp}`);
    
    console.log(`Creating backup at ${backupPath}...`);
    
    const command = `mongodump --uri="${DB_URI}" --out="${backupPath}"`;
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Backup failed: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Backup stderr: ${stderr}`);
        }
        console.log(`[OK] Backup completed: ${backupPath}`);
        cleanOldBackups();
    });
}

function cleanOldBackups() {
    const files = fs.readdirSync(BACKUP_DIR);
    const now = Date.now();
    const maxAge = RETENTION_DAYS * 24 * 60 * 60 * 1000;
    
    files.forEach(file => {
        const filePath = path.join(BACKUP_DIR, file);
        const stats = fs.statSync(filePath);
        
        if (now - stats.mtimeMs > maxAge) {
            fs.rmSync(filePath, { recursive: true, force: true });
            console.log(`Deleted old backup: ${file}`);
        }
    });
}

// Run backup
createBackup();

// Schedule daily backups (optional - uncomment to enable)
// setInterval(createBackup, 24 * 60 * 60 * 1000);
