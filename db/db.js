const { Client } = require('pg');
const client = new Client('postgres://localhost:5432/seed_pet_store');

// const syncAndSeed = () => {
//     try {
//         console.log(`success`);
//     } catch(error) {
//         console.log(error);
//     }
// };

// syncAndSeed();

module.exports = client;