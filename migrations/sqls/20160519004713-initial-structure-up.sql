CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "customers" (
  "id"           SERIAL PRIMARY KEY,
  "login"        VARCHAR(255)       NOT NULL,
  "password"     VARCHAR(255),
  "phone"        VARCHAR(20) UNIQUE NOT NULL,
  "energyCost"   DECIMAL(10, 2),
  "wifiPassword" VARCHAR(255),
  "limit"        INTEGER,
  "createdAt"    TIMESTAMP WITH TIME ZONE,
  "updatedAt"    TIMESTAMP WITH TIME ZONE
);

CREATE TABLE "plugs" (
  "id"           VARCHAR(128) PRIMARY KEY                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           DEFAULT uuid_generate_v4(),
  "description"  TEXT,
  "enabled"      BOOLEAN      NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        DEFAULT FALSE,
  "name"         VARCHAR(255) NOT NULL,
  "isProduction" BOOLEAN      NOT NULL                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        DEFAULT FALSE,
  "customerId"   INTEGER REFERENCES customers (id),
  "createdAt"    TIMESTAMP WITH TIME ZONE,
  "updatedAt"    TIMESTAMP WITH TIME ZONE
);

CREATE TABLE "timers" (
  "id"              SERIAL PRIMARY KEY,
  "triggerTime"     TIMESTAMP WITH TIME ZONE           NOT NULL,
  "isDeviceEnabled" BOOLEAN                            NOT NULL,
  "isCountdown"     BOOLEAN DEFAULT FALSE,
  "plugId"          VARCHAR(128) REFERENCES plugs (id) NOT NULL,
  "createdAt"       TIMESTAMP WITH TIME ZONE           NOT NULL,
  "updatedAt"       TIMESTAMP WITH TIME ZONE
);

CREATE TABLE "usage" (
  "id"        SERIAL PRIMARY KEY,
  "value"     DECIMAL(10, 2)           NOT NULL,
  "plugId"    VARCHAR(128) REFERENCES plugs (id),
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE
);

--insert some test data--
INSERT INTO customers (id, login, password, phone, "energyCost", "wifiPassword", "limit", "createdAt", "updatedAt")
VALUES (1, 'vkop@grdnz.com', 'qwerty', '380934682120', 0.99, 'qwerty', 2000, NOW(), NOW());
INSERT INTO customers (id, login, password, phone, "energyCost", "wifiPassword", "limit", "createdAt", "updatedAt")
VALUES (2, 'vladik.kopilash@gmail.com', 'qwerty', '380672693543', 0.5, 'qwerty', 2000, NOW(), NOW());

INSERT INTO plugs (id, name, "customerId") VALUES ('607fd019-2949-49b3-ab61-c470085a092c', 'kitchen', 1);
INSERT INTO plugs (id, name, "customerId") VALUES ('97f01dcb-3e3e-4fb2-b3d6-291381f624e9', 'heater', 1);
INSERT INTO plugs (id, name, "customerId") VALUES ('69646906-7e9d-477c-859b-4f6a603c0016', 'bedroom lamp', 1);
INSERT INTO plugs (id, name, "customerId") VALUES ('9c5de899-de31-4dce-93ec-1dda3a62466f', 'hairdryer', 1);
INSERT INTO plugs (id, name, "customerId") VALUES ('02c94da4-f234-4cf6-8187-bf496a1097b5', 'washing machine', 1);
INSERT INTO plugs (id, name, "customerId") VALUES ('84c5775a-5eff-4a73-aff2-de991414c2ea', 'TV', 1);
INSERT INTO plugs (id, name, "customerId") VALUES ('1', 'iron', 2);



