import { VercelRequest, VercelResponse } from '@vercel/node';
import { readFileSync } from 'fs';
import { join } from 'path';

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

// Load users data at startup
const dbPath = join(process.cwd(), 'mocks', 'api', 'db.json');
const usersData = JSON.parse(readFileSync(dbPath, 'utf8'));
const users: User[] = [...(usersData.users as User[])];

export default function handler(req: VercelRequest, res: VercelResponse) {
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
        return res.status(200).json(users);
      }

      case 'POST': {
        const newUser: User = {
          id: Math.max(...users.map(u => u.id)) + 1,
          name: req.body.name,
          email: req.body.email,
          role: req.body.role || 'viewer',
          status: req.body.status || 'active',
          team: req.body.team || 'General',
          avatar: `https://i.pravatar.cc/150?u=${req.body.email}`,
          createdAt: new Date().toISOString(),
        };
        users.push(newUser);
        return res.status(201).json(newUser);
      }

      case 'PUT': {
        const { id } = req.query;
        const userIndex = users.findIndex(u => u.id === parseInt(id as string));
        if (userIndex === -1) {
          return res.status(404).json({ error: 'User not found' });
        }
        users[userIndex] = { ...users[userIndex], ...req.body };
        return res.status(200).json(users[userIndex]);
      }

      case 'DELETE': {
        const deleteId = req.query.id;
        const deleteIndex = users.findIndex(u => u.id === parseInt(deleteId as string));
        if (deleteIndex === -1) {
          return res.status(404).json({ error: 'User not found' });
        }
        const deletedUser = users.splice(deleteIndex, 1)[0];
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
