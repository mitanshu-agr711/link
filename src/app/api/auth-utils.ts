import { getSession } from './session';

export async function auth() {
  return await getSession();
}

export type Session = Awaited<ReturnType<typeof auth>>;
