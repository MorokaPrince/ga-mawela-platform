import { createHmac, timingSafeEqual } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import bcrypt from "bcryptjs";

export type PlatformRole = "admin" | "member";

export type PlatformUser = {
  id: string;
  email: string;
  name: string;
  role: PlatformRole;
  passwordHash: string;
};

export type PlatformSession = {
  id: string;
  email: string;
  name: string;
  role: PlatformRole;
  exp: number;
};

const USERS_PATH = path.join(process.cwd(), "data", "platform-users.json");
export const PLATFORM_SESSION_COOKIE = "ga_mawela_session";

function getAuthSecret() {
  return (
    process.env.PLATFORM_AUTH_SECRET ??
    process.env.NEXTAUTH_SECRET ??
    "ga-mawela-dev-session-secret"
  );
}

function base64UrlEncode(input: string) {
  return Buffer.from(input, "utf8").toString("base64url");
}

function base64UrlDecode(input: string) {
  return Buffer.from(input, "base64url").toString("utf8");
}

function signPayload(payload: string) {
  return createHmac("sha256", getAuthSecret()).update(payload).digest("base64url");
}

export async function readPlatformUsers() {
  const raw = await readFile(USERS_PATH, "utf8");
  return JSON.parse(raw) as PlatformUser[];
}

export async function authenticatePlatformUser(email: string, password: string) {
  const users = await readPlatformUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find((entry) => entry.email.toLowerCase() === normalizedEmail);

  if (!user) {
    return null;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  return valid ? user : null;
}

export function createPlatformSessionToken(user: PlatformUser) {
  const session: PlatformSession = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
  };

  const payload = base64UrlEncode(JSON.stringify(session));
  const signature = signPayload(payload);
  return `${payload}.${signature}`;
}

export function verifyPlatformSessionToken(token?: string | null) {
  if (!token) {
    return null;
  }

  const [payload, signature] = token.split(".");
  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(payload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const parsed = JSON.parse(base64UrlDecode(payload)) as PlatformSession;
    if (parsed.exp < Date.now()) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}
