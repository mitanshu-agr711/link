import { db, testDatabaseConnection } from "./connect/db.connect";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import bcrypt from 'bcryptjs';

export async function GET() {
  const test = await testDatabaseConnection();
  return Response.json(test);
}

export async function POST(req: Request) {
  const { email, name, password } = await req.json();

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()));

    if (existingUser.length > 0) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await db.insert(users).values({
      email: email.toLowerCase(),
      name,
      password: hashedPassword,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error in register:", error);
    return Response.json({ error: "Database error" }, { status: 500 });
  }
}

export async function register(req: { body: { email: string; password: string; name?: string } }) {
  try {
    console.log('Register function called with:', req);
    const { email, password, name } = req.body;
    console.log('Extracted data:', { email, password: password ? '[HIDDEN]' : undefined, name });

    if (!email || !password || !name) {
      console.log('Missing required fields validation failed');
      return {
        success: false,
        error: "Email, password, and name are required"
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Invalid email format"
      };
    }

    // Validate password strength
    if (password.length < 6) {
      return {
        success: false,
        error: "Password must be at least 6 characters long"
      };
    }

    // Check if user already exists
    console.log('Checking if user exists with email:', email);
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    console.log('Existing user query result:', existingUser);
    if (existingUser.length > 0) {
      console.log('User already exists');
      return {
        success: false,
        error: "User with this email already exists"
      };
    }

    // Hash the password
    console.log('Hashing password...');
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Password hashed successfully');

    // Create new user
    console.log('Creating new user in database...');
    const newUser = await db
      .insert(users)
      .values({
        email: email.toLowerCase(),
        password: hashedPassword,
        name: name || "User",
      })
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
        createdAt: users.created_at
      });

    console.log('User created successfully:', newUser);
    if (newUser.length === 0) {
      return {
        success: false,
        error: "Failed to create user"
      };
    }

    return {
      success: true,
      user: newUser[0],
      message: "User registered successfully"
    };

  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: "Internal server error during registration"
    };
  }
}

export async function login(req: { body: { email: string; password: string } }) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return {
        success: false,
        error: "Email and password are required"
      };
    }

    // Find user by email
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (userResult.length === 0) {
      return {
        success: false,
        error: "Invalid email or password"
      };
    }

    const user = userResult[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        error: "Invalid email or password"
      };
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      message: "Login successful"
    };

  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "Internal server error during login"
    };
  }
}
