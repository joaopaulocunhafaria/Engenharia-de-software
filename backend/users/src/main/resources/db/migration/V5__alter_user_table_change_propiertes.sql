ALTER TABLE users DROP COLUMN user_password;
ALTER TABLE users DROP COLUMN user_role;
ALTER TABLE users ADD COLUMN password TEXT NOT NULL;
ALTER TABLE users ADD COLUMN role TEXT NOT NULL;