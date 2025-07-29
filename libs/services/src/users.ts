import { User } from '@libs/types';

// Use environment-aware API URL with fallback logic
const getApiUrl = (): string => {
  // In development, use environment variable if available, otherwise fallback to localhost
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  }

  // In production, use relative path to Vercel API routes
  return '/api';
};

const BASE_URL = `${getApiUrl()}/users`;

/**
 * Handles the response from a fetch call, throwing an error if the request failed.
 * @param response - The fetch Response object
 * @returns The parsed JSON data
 * @throws Error if response is not OK
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error Response:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      errorText
    });
    throw new Error(errorText || `API request failed with status ${response.status}`);
  }
  return response.json();
}

/**
 * Fetch all users from the API and normalize values.
 * @returns Promise resolving to an array of normalized User objects
 */
export async function getUsers(): Promise<User[]> {
  const response = await fetch(BASE_URL);
  const data = await handleResponse<User[]>(response);

  return data.map(user => ({
    ...user,
    role: user.role?.toLowerCase(),
    team: user.team?.toLowerCase(),
    status: user.status?.toLowerCase(),
  }));
}

/**
 * Fetch a single user by ID.
 * @param id - The user's ID
 * @returns Promise resolving to the User object
 */
export async function getUserById(id: number): Promise<User> {
  const response = await fetch(`${BASE_URL}/${id}`);
  return handleResponse<User>(response);
}

/**
 * Create a new user.
 * @param user - Partial User data (without ID)
 * @returns Promise resolving to the newly created User
 */
export async function createUser(user: Partial<User>): Promise<User> {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return handleResponse<User>(response);
}

/**
 * Update an existing user by ID.
 * @param id - The user's ID
 * @param updates - Partial User data to update
 * @returns Promise resolving to the updated User
 */
export async function updateUser(
  id: number,
  updates: Partial<User>
): Promise<User> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  return handleResponse<User>(response);
}

/**
 * Delete a user by ID.
 * @param id - The user's ID
 * @returns Promise resolving to the deleted User
 */
export async function deleteUser(id: number): Promise<User> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return handleResponse<User>(response);
}
