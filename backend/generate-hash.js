const bcrypt = require('bcryptjs');

const password = 'ChangeMe123!';
const hash = bcrypt.hashSync(password, 10);

console.log('Password:', password);
console.log('Hash:', hash);
console.log('\nCopy this MongoDB command:\n');
console.log(`db.admins.insertOne({
  name: "Admin User",
  email: "admin@codebridge.ss",
  password: "${hash}",
  role: "super_admin",
  createdAt: new Date(),
  lastLogin: null
})`);
