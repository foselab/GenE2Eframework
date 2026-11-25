const bcrypt = require('bcrypt');

// Funzione per verificare la password
// Confronta una password in chiaro con una hashata nel database
const verifyPassword = async (plainPassword, hashedPassword) => {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match;  // Ritorna true se la password corrisponde, altrimenti false
};

module.exports = {
  verifyPassword,
};
