CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL,
    user_role TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);