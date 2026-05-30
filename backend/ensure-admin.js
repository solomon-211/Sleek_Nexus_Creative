const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function ensureAdmin() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/codebridge';
  await mongoose.connect(uri);

  const admins = mongoose.connection.collection('admins');
  const email = 'admin@codebridge.ss';
  const password = 'admin123';
  const passwordHash = await bcrypt.hash(password, 10);

  const existing = await admins.findOne({ email });

  if (existing) {
    await admins.updateOne(
      { email },
      {
        $set: {
          password: passwordHash,
          name: existing.name || 'Admin User',
          role: existing.role || 'super_admin',
        },
      }
    );
    console.log('admin-updated');
  } else {
    await admins.insertOne({
      name: 'Admin User',
      email,
      password: passwordHash,
      role: 'super_admin',
      createdAt: new Date(),
      lastLogin: null,
    });
    console.log('admin-created');
  }

  await mongoose.disconnect();
}

ensureAdmin().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
