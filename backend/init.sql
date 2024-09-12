CREATE DATABASE MARKETPLACE
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    date_of_birth DATE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20)
);
ALTER TABLE users
ADD CONSTRAINT check_age_18_or_more
CHECK (date_of_birth <= CURRENT_DATE - INTERVAL '18 years');


CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    category VARCHAR(255),
    name VARCHAR(255),
    description VARCHAR(255),
    image VARCHAR(255),
    price INTEGER,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    products_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (products_id) REFERENCES products(id) ON DELETE CASCADE
);
