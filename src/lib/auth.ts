// Simple auth implementation for demo purposes
// In a real application, you would integrate with Better Auth or NextAuth.js

export async function auth() {
  // For demo purposes, return a mock user
  // In a real app, this would check session tokens, cookies, etc.
  return {
    user: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      image: null
    }
  };
}

export type Session = {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
} | null;
