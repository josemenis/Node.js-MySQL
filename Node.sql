-- ### Challenge #1: Customer View (Minimum Requirement)
-- 1. Create a MySQL Database called `bamazon`.
-- 2. Then create a Table inside of that database called `products`.
-- 3. The products table should have each of the following columns:
--    * sku (unique id for each product)
--    * product_name (Name of product)
--    * department_name
--    * price (cost to customer)
--    * stock_quantity (how much of the product is available in stores)
-- 4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;
USE bamazon_DB;
CREATE TABLE products(
  sku INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (sku)
);

-- for loops are looping through these objects
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Milk', 'Dairy', 3.18, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Cookie', 'Bakery', 1.29, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Butter', 'Dairy', 3.48, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Donut', 'Bakery', 1.79, 7);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Coke', 'Beverage', 1.34, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Pepsi', 'Beverage', 1.34, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Ham', 'Meat', 1.49, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Turkey', 'Meat', 1.19, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Orange', 'Produce', 0.69, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Lemon', 'Produce', 0.39, 45);

SELECT * FROM bamazon_db.products;