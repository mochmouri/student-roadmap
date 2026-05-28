-- Run this once in your Neon SQL editor to create all required tables.
-- NextAuth tables + custom columns for premium status.

CREATE TABLE IF NOT EXISTS users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL UNIQUE,
  "emailVerified" TIMESTAMPTZ,
  image TEXT,
  "isPremium" BOOLEAN NOT NULL DEFAULT false,
  "hasBundle" BOOLEAN NOT NULL DEFAULT false,
  "lsCustomerId" TEXT
);

CREATE TABLE IF NOT EXISTS accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  "userId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  UNIQUE (provider, "providerAccountId")
);

CREATE TABLE IF NOT EXISTS sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  "sessionToken" TEXT NOT NULL UNIQUE,
  "userId" UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS verification_token (
  identifier TEXT NOT NULL,
  token TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (identifier, token)
);
