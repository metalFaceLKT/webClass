
   const express = require('express');
   const cors = require('cors');
   const { Client } = require('pg');
   const redis = require('redis');

   const app = express();
   const PORT = process.env.PORT || 5000;

   // Middleware
   app.use(cors());
   app.use(express.json());

   // Configuration base de données
   const dbClient = new Client({
     host: process.env.DB_HOST || 'localhost',
     port: process.env.DB_PORT || 5432,
     database: process.env.DB_NAME || 'myapp',
     user: process.env.DB_USER || 'postgres',
     password: process.env.DB_PASSWORD || 'password'
   });

   // Configuration Redis
   const redisClient = redis.createClient({
     host: process.env.REDIS_HOST || 'localhost',
     port: process.env.REDIS_PORT || 6379
   });

   // Connexion aux services
   async function connectServices() {
     try {
       await dbClient.connect();
       await redisClient.connect();
       console.log('✅ Connected to database and Redis');
       
       // Créer la table si elle n'existe pas
       await dbClient.query(`
         CREATE TABLE IF NOT EXISTS users (
           id SERIAL PRIMARY KEY,
           name VARCHAR(100) NOT NULL,
           email VARCHAR(100) UNIQUE NOT NULL,
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
         )
       `);
     } catch (error) {
       console.error('❌ Error connecting to services:', error);
     }
   }

   // Routes
   app.get('/api/health', (req, res) => {
     res.json({ status: 'OK', service: 'backend' });
   });

   app.get('/api/users', async (req, res) => {
     try {
       // Vérifier le cache Redis
       const cached = await redisClient.get('users');
       if (cached) {
         return res.json(JSON.parse(cached));
       }

       // Récupérer depuis la base
       const result = await dbClient.query('SELECT * FROM users ORDER BY id');
       const users = result.rows;

       // Mettre en cache
       await redisClient.setEx('users', 300, JSON.stringify(users));

       res.json(users);
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   });

   app.post('/api/users', async (req, res) => {
     try {
       const { name, email } = req.body;
       const result = await dbClient.query(
         'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
         [name, email]
       );

       // Invalider le cache
       await redisClient.del('users');

       res.status(201).json(result.rows[0]);
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   });

   connectServices().then(() => {
     app.listen(PORT, '0.0.0.0', () => {
       console.log(`🚀 Backend running on port ${PORT}`);
     });
   });
  
