DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(30,2) NOT NULL,
  stock_quantity INT(100) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Gold Ring", "Jewelery", 295.99, 10), ("Tennis Balls", "Sports", 13.99,300), ("Aged Sumatra 1 lb", "Food and Drink", 17.95, 50), ("Tekken 7", "Video Games", 15.00, 25), ("G star Acid Washed Jeans", "Apparel", 235.99, 10), ("Salt Lamp", "Home and Furniture", 80.00, 15), ("Adidas Triple White NMDs", "Apparel", 189.99, 12), ("Water Proof Matches 30ct", "Outdoors", 13.50, 60), ("EVGA 1070 Graphics card", "Electronics", 499.99, 17), ("Zapps Voodoo Chips 10ct", "Food and Drink", 13.00, 33)