// Run this in MongoDB Compass or mongosh
// Database: codebridge
// Collection: admins

use codebridge

// First, check if admin exists
db.admins.findOne({email: "admin@codebridge.ss"})

// If no admin exists, create one
// Password: ChangeMe123! (hashed with bcrypt)
db.admins.insertOne({
  name: "Admin User",
  email: "admin@codebridge.ss",
  password: "$2a$10$rZ5fGKJ7qvZ5fGKJ7qvZ5u7qvZ5fGKJ7qvZ5fGKJ7qvZ5fGKJ7qvZ",
  role: "super_admin",
  createdAt: new Date(),
  lastLogin: null
})

// Verify
db.admins.findOne({email: "admin@codebridge.ss"})
