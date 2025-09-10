import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from './connect/db.connect';
import { sessions, users } from './db/schema';
import { eq, and, gt, lt } from 'drizzle-orm';

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const SESSION_COOKIE_NAME = 'session_token';

function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function createSession(userId: number) {
  try {
    // For now, use cookies-only session without database storage
    // This will still provide 7-day session management
    const sessionToken = generateSessionToken();
    const expiresAt = new Date(Date.now() + SESSION_DURATION);

    // Set session cookie with user ID encoded
    const cookieStore = await cookies();
    const sessionData = JSON.stringify({ userId, sessionToken, expires: expiresAt.toISOString() });
    
    cookieStore.set(SESSION_COOKIE_NAME, sessionData, {
      expires: expiresAt,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return {
      success: true,
      session: { sessionToken, expires: expiresAt },
    };
  } catch (error) {
    console.error('Error creating session:', error);
    return {
      success: false,
      error: 'Failed to create session',
    };
  }
}

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionCookie) {
      return null;
    }

    // Parse session data from cookie
    let sessionData;
    try {
      sessionData = JSON.parse(sessionCookie);
    } catch {
      // Invalid session data, clear cookie
      cookieStore.delete(SESSION_COOKIE_NAME);
      return null;
    }

    const { userId, expires } = sessionData;
    const expiresDate = new Date(expires);

    // Check if session is expired
    if (expiresDate < new Date()) {
      cookieStore.delete(SESSION_COOKIE_NAME);
      return null;
    }

    // Get user from database
    const userResult = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (userResult.length === 0) {
      // User not found, clear cookie
      cookieStore.delete(SESSION_COOKIE_NAME);
      return null;
    }

    const user = userResult[0];

    // Check if session is close to expiring (within 1 day) and extend it
    const oneDayFromNow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    if (expiresDate < oneDayFromNow) {
      await extendSession(userId);
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      expires: expiresDate,
    };
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

export async function extendSession(userId: number) {
  try {
    const newExpiresAt = new Date(Date.now() + SESSION_DURATION);
    const sessionToken = generateSessionToken();

    // Update cookie with new expiration
    const cookieStore = await cookies();
    const sessionData = JSON.stringify({ userId, sessionToken, expires: newExpiresAt.toISOString() });
    
    cookieStore.set(SESSION_COOKIE_NAME, sessionData, {
      expires: newExpiresAt,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return { success: true };
  } catch (error) {
    console.error('Error extending session:', error);
    return { success: false };
  }
}

export async function deleteSession() {
  try {
    const cookieStore = await cookies();
    
    // Clear session cookie
    cookieStore.delete(SESSION_COOKIE_NAME);

    return { success: true };
  } catch (error) {
    console.error('Error deleting session:', error);
    return { success: false };
  }
}

// Remove the cleanupExpiredSessions function since we're not using database storage
