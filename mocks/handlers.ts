import { http, HttpResponse } from 'msw'
import { User } from '@libs/types'

// Mock users data for testing
const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    team: 'engineering',
    avatar: 'https://i.pravatar.cc/150?u=johndoe',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'editor',
    status: 'active',
    team: 'marketing',
    avatar: 'https://i.pravatar.cc/150?u=janesmith',
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'viewer',
    status: 'inactive',
    team: 'finance',
    avatar: 'https://i.pravatar.cc/150?u=bobjohnson',
    createdAt: '2024-01-03T00:00:00Z',
  },
]

let users = [...mockUsers]

export const handlers = [
  // Get all users
  http.get('http://localhost:3001/api/users', () => {
    return HttpResponse.json(users)
  }),

  // Get user by id
  http.get('http://localhost:3001/api/users/:id', ({ params }) => {
    const { id } = params
    const user = users.find(u => u.id === Number(id))
    
    if (!user) {
      return new HttpResponse('User not found', { status: 404 })
    }
    
    return HttpResponse.json(user)
  }),

  // Create new user
  http.post('http://localhost:3001/api/users', async ({ request }) => {
    const newUser = await request.json() as Omit<User, 'id' | 'createdAt'>
    
    const user: User = {
      ...newUser,
      id: Math.max(...users.map(u => u.id), 0) + 1,
      createdAt: new Date().toISOString(),
    }
    
    users.push(user)
    return HttpResponse.json(user, { status: 201 })
  }),

  // Update user
  http.put('http://localhost:3001/api/users/:id', async ({ params, request }) => {
    const { id } = params
    const updates = await request.json() as Partial<User>
    const userIndex = users.findIndex(u => u.id === Number(id))
    
    if (userIndex === -1) {
      return new HttpResponse('User not found', { status: 404 })
    }
    
    users[userIndex] = { ...users[userIndex], ...updates }
    return HttpResponse.json(users[userIndex])
  }),

  // Delete user
  http.delete('http://localhost:3001/api/users/:id', ({ params }) => {
    const { id } = params
    const userIndex = users.findIndex(u => u.id === Number(id))
    
    if (userIndex === -1) {
      return new HttpResponse('User not found', { status: 404 })
    }
    
    users.splice(userIndex, 1)
    return new HttpResponse(null, { status: 204 })
  }),
]

// Helper function to reset users data for tests
export const resetUsers = () => {
  users = [...mockUsers]
}

export { mockUsers }
