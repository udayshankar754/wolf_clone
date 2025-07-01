// backend/src/server.js

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const socketIo = require('socket.io');
const winston = require('winston');
const { Sequelize } = require('sequelize');
const Redis = require('redis');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Create Socket.IO server
const io = socketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'wolf777-api' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Initialize Redis client
let redisClient;
(async () => {
  try {
    redisClient = Redis.createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });

    redisClient.on('error', (error) => {
      logger.error('Redis Client Error', error);
    });

    await redisClient.connect();
    logger.info('Redis connected successfully');
  } catch (error) {
    logger.error('Redis connection failed', error);
  }
})();

// Initialize Sequelize (MySQL)
const sequelize = new Sequelize(
  process.env.DATABASE_NAME || 'wolf777',
  process.env.DATABASE_USER || 'root',
  process.env.DATABASE_PASSWORD || 'poiuytrewq',
  {
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'mysql',
    logging: (msg) => logger.debug(msg)
  }
);

// Test database connection
(async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection established successfully');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
})();

// Configure middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
  credentials: true
}));
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: true }));

// Simple request logger middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/auth', require('./api/routes/auth.routes'));
app.use('/api/users', require('./api/routes/users.routes'));
app.use('/api/sports', require('./api/routes/sports.routes'));
app.use('/api/odds', require('./api/routes/odds.routes'));
app.use('/api/bets', require('./api/routes/bets.routes'));
app.use('/api/games', require('./api/routes/games.routes'));
app.use('/api/wallet', require('./api/routes/wallet.routes'));
app.use('/api/promotions', require('./api/routes/promotions.routes'));
app.use('/api/loyalty', require('./api/routes/loyalty.routes'));

// API Response Structure middleware
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (data) {
    if (res.statusCode >= 400) {
      return originalSend.call(this, {
        success: false,
        error: {
          code: res.statusCode,
          message: data.message || 'An error occurred'
        },
        timestamp: new Date().toISOString()
      });
    }
    
    return originalSend.call(this, {
      success: true,
      data,
      message: '',
      timestamp: new Date().toISOString()
    });
  };
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).send({
    message: err.message || 'Internal Server Error'
  });
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  // Join rooms based on subscriptions
  socket.on('subscribe', (channel) => {
    socket.join(channel);
    logger.info(`Client ${socket.id} subscribed to ${channel}`);
  });

  // Leave rooms when unsubscribing
  socket.on('unsubscribe', (channel) => {
    socket.leave(channel);
    logger.info(`Client ${socket.id} unsubscribed from ${channel}`);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

// Set up specific Socket.IO namespaces
const oddsNamespace = io.of('/odds');
oddsNamespace.on('connection', (socket) => {
  logger.info(`Client connected to odds namespace: ${socket.id}`);
});

const liveEventsNamespace = io.of('/live-events');
liveEventsNamespace.on('connection', (socket) => {
  logger.info(`Client connected to live-events namespace: ${socket.id}`);
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = { app, server, io, sequelize, redisClient, logger };