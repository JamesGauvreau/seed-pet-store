const client = require('./db.js');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS pets_products;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS pets;  
      DROP TABLE IF EXISTS owners;
    `);

    console.log('TABLES DROPPED!');
  } catch(error) {
    console.log(error);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE owners(
        Id SERIAL PRIMARY KEY,
        Name VARCHAR(30) NOT NULL
      );

      CREATE TABLE pets(
        Id SERIAL PRIMARY KEY,
        Name VARCHAR(20) NOT NULL,
        Dob DATE,
        Type VARCHAR(20) NOT NULL,
        Owner_Id INTEGER REFERENCES owners(Id)
      );

      CREATE TABLE products(
        Id SERIAL PRIMARY KEY,
        Name VARCHAR(30) NOT NULL
      );

      CREATE TABLE pets_products(
        pets_id INTEGER REFERENCES pets(Id),
        products_id INTEGER REFERENCES products(Id)
      );
    `);

    console.log('TABLES CREATED!');
  } catch(error) {
    console.log(error);
  }
}

const createOwner = async(ownersName) => {
  try {
    await client.query(`
      INSERT INTO owners (Name)
      VALUES ('${ownersName}');
    `);

    console.log('OWNER CREATED!');
  } catch(error) {
    console.log(error)
  }
}

const createPets = async(petsName, petsDob, petsOwnersId, petsType) => {
  try {
    await client.query(`
      INSERT INTO pets (Name, Dob, Owner_Id, Type)
      VALUES ('${petsName}', ${petsDob}, ${petsOwnersId}, '${petsType}');
    `);

    console.log('PETS CREATED!')
  } catch(error) {
    console.log(error)
  }
}

const createProducts = async(productsName) => {
  try {
    await client.query(`
      INSERT INTO products (Name)
      VALUES ('${productsName}');
    `);

    console.log('PRODUCTS CREATED!')
  } catch(error) {
    console.log(error)
  }
}

const createPetProducts = async(petsId, productsId) => {
  try {
     await client.query(`
      INSERT INTO pets_products (pets_Id, products_Id)
      VALUES ('${petsId}', '${productsId}')
     `)

     console.log('PET_PRODUCTS CREATED!')
  } catch(error) {
    console.log(error)
  }
}

const syncAndSeed = async() => {
  try {
    await client.connect();
    console.log('CONNECTED TO THE DB!');

    await dropTables();
    await createTables();

    await createOwner('Greg');
    await createOwner('Nully');
    await createOwner('Bill');
    await createOwner('Perry');

    await createPets('Bailey', 2000-12-31, 3, 'Yorkie')
    await createPets('Ollie', 2000-12-31, 4, 'Labradude')
    await createPets('Algee', 2000-12-31, 1, 'Black Lab')
    await createPets('Fred', 2000-12-31, 2, 'Fuzzlewuzzle')

    await createProducts('Dogomizer')
    await createProducts('Catch-a-lot')
    await createProducts('Tekno')

    await createPetProducts(1, 1)
    await createPetProducts(1, 3)
    await createPetProducts(1, 2)

  } catch(error) {
    console.log(error);
  }
}

syncAndSeed();