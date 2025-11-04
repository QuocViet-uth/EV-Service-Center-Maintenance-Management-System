#!/bin/bash

# Wait for the database to be ready
./wait-for-db.sh

# Run the migrations
for migration in ../sql/migrations/*.sql; do
  echo "Running migration: $migration"
  psql -U "$DB_USER" -d "$DB_NAME" -f "$migration"
done

# Seed the database with sample data
echo "Seeding the database with sample data..."
psql -U "$DB_USER" -d "$DB_NAME" -f ../sql/seeds/seed_sample_data.sql

echo "Database migration and seeding completed."