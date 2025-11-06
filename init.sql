SET NAMES utf8mb4;
SET @@session.sql_mode = REPLACE(@@session.sql_mode,'ONLY_FULL_GROUP_BY','');

-- Create database if not exists (docker-compose already creates it, but keep idempotent)
CREATE DATABASE IF NOT EXISTS evservice CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE evservice;