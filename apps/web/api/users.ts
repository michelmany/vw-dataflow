import type { VercelRequest, VercelResponse } from '@vercel/node';
import mockData from '../../mocks/api/db.json';

// Get users data from the existing mock structure
const users = mockData.users;

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method, query } = req;
  const userId = query.id ? parseInt(query.id as string) : null;

  switch (method) {
    case 'GET': {
      if (userId) {
        // Get single user
        const user = users.find(u => u.id === userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(user);
      } else {
        // Get all users
        return res.status(200).json(users);
      }
    }

    case 'POST': {
      // Create new user
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...req.body,
        createdAt: new Date().toISOString(),
        avatar: `https://i.pravatar.cc/150?u=${Math.random()
          .toString(36)
          .substring(7)}`,
      };
      users.push(newUser);
      return res.status(201).json(newUser);
    }

    case 'PUT': {
      // Update user
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      const userIndex = users.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
      }
      users[userIndex] = { ...users[userIndex], ...req.body };
      return res.status(200).json(users[userIndex]);
    }

    case 'DELETE': {
      // Delete user
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      const deleteIndex = users.findIndex(u => u.id === userId);
      if (deleteIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
      }
      const deletedUser = users.splice(deleteIndex, 1)[0];
      return res.status(200).json(deletedUser);
    }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).json({ error: `Method ${method} not allowed` });
  }
}
