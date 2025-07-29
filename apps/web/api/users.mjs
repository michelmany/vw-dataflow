import { Redis } from '@upstash/redis';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load default users from db.json
const loadDefaultUsers = () => {
  try {
    const dbPath = join(__dirname, 'db.json');
    const dbContent = readFileSync(dbPath, 'utf8');
    const db = JSON.parse(dbContent);
    return db.users || [];
  } catch (error) {
    console.error('Error loading db.json:', error);
    // Fallback to hardcoded users if db.json fails to load
    return [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        status: 'active',
        team: 'engineering',
        avatar: 'https://i.pravatar.cc/150?u=john@example.com',
        createdAt: '2024-01-01T00:00:00Z',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'user',
        status: 'active',
        team: 'marketing',
        avatar: 'https://i.pravatar.cc/150?u=jane@example.com',
        createdAt: '2024-01-02T00:00:00Z',
      },
    ];
  }
};

const defaultUsers = loadDefaultUsers();

// Initialize Redis connection with validation
const getRedisClient = () => {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  
  console.log('Redis config check:', {
    hasUrl: !!url,
    hasToken: !!token,
    urlLength: url?.length || 0,
    tokenLength: token?.length || 0
  });
  
  if (!url || !token) {
    console.error('Missing Redis environment variables:', { url: !!url, token: !!token });
    return null;
  }
  
  return new Redis({ url, token });
};

const redis = getRedisClient();

// Storage abstraction using Upstash Redis
class UserStorage {
  static USERS_KEY = 'users';

  static async getAll() {
    try {
      if (!redis) {
        console.log('Redis not available, using default data');
        return [...defaultUsers];
      }
      
      const users = await redis.get(this.USERS_KEY);
      if (!users || users.length === 0) {
        // Initialize with default data if Redis is empty
        await this.save(defaultUsers);
        return [...defaultUsers];
      }
      return users;
    } catch (error) {
      console.error('Error getting users from Redis:', error);
      // Fallback to default data if Redis fails
      return [...defaultUsers];
    }
  }

  static async save(users) {
    try {
      if (!redis) {
        console.log('Redis not available, skipping save');
        return;
      }
      
      await redis.set(this.USERS_KEY, users);
      console.log('Successfully saved users to Redis');
    } catch (error) {
      console.error('Error saving users to Redis:', error);
      // Don't throw error, just log it
    }
  }

  static async getNextId() {
    try {
      const users = await this.getAll();
      return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    } catch (error) {
      console.error('Error getting next ID:', error);
      return 1;
    }
  }
}

export default async function handler(req, res) {
  console.log(`API Request: ${req.method} ${req.url}`);
  console.log('Environment check:', {
    NODE_ENV: process.env.NODE_ENV,
    hasRedisUrl: !!process.env.UPSTASH_REDIS_REST_URL,
    hasRedisToken: !!process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET': {
        const users = await UserStorage.getAll();
        return res.status(200).json(users);
      }

      case 'POST': {
        const users = await UserStorage.getAll();
        const newUser = {
          id: await UserStorage.getNextId(),
          name: req.body.name,
          email: req.body.email,
          role: req.body.role || 'viewer',
          status: req.body.status || 'active',
          team: req.body.team || 'General',
          avatar: `https://i.pravatar.cc/150?u=${req.body.email}`,
          createdAt: new Date().toISOString(),
        };
        users.push(newUser);
        await UserStorage.save(users);
        return res.status(201).json(newUser);
      }

      case 'PUT': {
        const { id } = req.query;
        const users = await UserStorage.getAll();
        const userIndex = users.findIndex(u => u.id === parseInt(id));
        if (userIndex === -1) {
          return res.status(404).json({ error: 'User not found' });
        }
        users[userIndex] = { ...users[userIndex], ...req.body };
        await UserStorage.save(users);
        return res.status(200).json(users[userIndex]);
      }

      case 'DELETE': {
        const deleteId = req.query.id;
        const users = await UserStorage.getAll();
        const deleteIndex = users.findIndex(u => u.id === parseInt(deleteId));
        if (deleteIndex === -1) {
          return res.status(404).json({ error: 'User not found' });
        }
        const deletedUser = users.splice(deleteIndex, 1)[0];
        await UserStorage.save(users);
        return res.status(200).json(deletedUser);
      }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
