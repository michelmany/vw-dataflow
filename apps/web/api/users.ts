import { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  team: string;
  avatar: string;
  createdAt: string;
}

// Default data for initialization
const defaultUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    team: "engineering",
    avatar: "https://i.pravatar.cc/150?u=john@example.com",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "active",
    team: "marketing",
    avatar: "https://i.pravatar.cc/150?u=jane@example.com",
    createdAt: "2024-01-02T00:00:00Z",
  },
];

// Initialize Redis connection
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Storage abstraction using Upstash Redis
class UserStorage {
  private static USERS_KEY = 'users';

  static async getAll(): Promise<User[]> {
    try {
      const users = await redis.get<User[]>(this.USERS_KEY);
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

  static async save(users: User[]): Promise<void> {
    try {
      await redis.set(this.USERS_KEY, users);
    } catch (error) {
      console.error('Error saving users to Redis:', error);
      throw new Error('Failed to save users');
    }
  }

  static async getNextId(): Promise<number> {
    try {
      const users = await this.getAll();
      return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    } catch (error) {
      console.error('Error getting next ID:', error);
      return 1;
    }
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log(`API Request: ${req.method} ${req.url}`);
  
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
        const newUser: User = {
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
        const userIndex = users.findIndex(u => u.id === parseInt(id as string));
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
        const deleteIndex = users.findIndex(u => u.id === parseInt(deleteId as string));
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
    return res.status(500).json({ error: 'Internal server error' });
  }
}
