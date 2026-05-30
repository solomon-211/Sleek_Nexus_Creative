const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function updatePassword() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/codebridge';
  const adminEmail = process.env.ADMIN_EMAIL || process.argv[2] || 'admin@codebridge.ss';
  const plainPassword = process.env.ADMIN_PASSWORD || process.argv[3] || 'admin123';

  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const dbName = process.env.MONGODB_DB || 'codebridge';
    const db = client.db(dbName);
    const admins = db.collection('admins');

    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    const result = await admins.updateOne(
      { email: adminEmail },
      { $set: { password: hashedPassword } }
    );

    if (result.matchedCount === 0) {
      console.log(`[WARNING] No admin found for ${adminEmail}`);
      return;
    }

    console.log(`[OK] Password updated for ${adminEmail}`);
  } catch (error) {
    console.error('[ERROR] Error:', error.message);
  } finally {
    await client.close();
  }
}

updatePassword();
