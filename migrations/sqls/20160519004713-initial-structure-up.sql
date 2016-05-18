CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "customers" (
  "id" serial PRIMARY KEY,
  "login" varchar(255) NOT NULL,
  "password" varchar(255),
  "phone" varchar(20) UNIQUE NOT NULL,
  "energyCost" decimal(10,2),
  "wifiPassword" varchar(255),
  "limit" integer,
  "createdAt" timestamp with time zone,
  "updatedAt" timestamp with time zone
);

CREATE TABLE "plugs" (
  "id" varchar(128) PRIMARY KEY DEFAULT uuid_generate_v4(),
  "description" text,
  "enabled" boolean NOT NULL DEFAULT FALSE,
  "name" varchar(255) NOT NULL,
  "isProduction" boolean NOT NULL DEFAULT FALSE,
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

--insert some test data--
INSERT INTO customers (id, login, password, phone, "energyCost", "wifiPassword", "limit", "createdAt", "updatedAt")
VALUES (1, 'vkop@grdnz.com', 'qwerty', '380934682120', 0.99, 'qwerty', 2000, NOW(), NOW());

insert INTO plugs (name,"customerId") VALUES ('socket1',1);
insert INTO plugs (name,"customerId") VALUES ('socket2',1);
insert INTO plugs (name,"customerId") VALUES ('socket3',1);
insert INTO plugs (name,"customerId") VALUES ('socket4',1);
insert INTO plugs (name,"customerId") VALUES ('socket5',1);
insert INTO plugs (name,"customerId") VALUES ('socket6',1);



