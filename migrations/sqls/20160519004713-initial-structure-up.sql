CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "customers" (
  "id" serial PRIMARY KEY,
  "login" varchar(255) NOT NULL,
  "password" varchar(255),
  "phone" varchar(20) NOT NULL,
  "energyCost" decimal(10,2),
  "wifiPassword" varchar(255),
  "limit" integer,
  "createdAt" timestamp with time zone,
  "updatedAt" timestamp with time zone
);

CREATE TABLE "plugs" (
  "id" varchar(128) PRIMARY KEY DEFAULT uuid_generate_v4(),
  "description" text,
  "enabled" boolean,
  "name" varchar(255),
  "isProduction" boolean,
  "customerId" integer REFERENCES customers(id) NOT NULL,
  "createdAt" timestamp with time zone,
  "updatedAt" timestamp with time zone
);

CREATE TABLE "timers" (
  "id" serial PRIMARY KEY,
  "triggerTime" TIMESTAMP WITH TIME ZONE NOT NULL,
  "isDeviceEnabled" boolean NOT NULL,
  "isCountdown" boolean DEFAULT FALSE,
  "plugId" VARCHAR(128) REFERENCES plugs(id) NOT NULL,
  "createdAt" timestamp with time zone NOT NULL,
  "updatedAt" timestamp with time zone
);

CREATE TABLE "usage" (
  "id" serial PRIMARY KEY,
  "date" timestamp WITH TIME ZONE,
  "value" decimal(10,2) NOT NULL,
  "plugId" VARCHAR(128) REFERENCES plugs(id)
);


