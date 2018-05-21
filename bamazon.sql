
DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;


USE bamazon_db;


CREATE TABLE products (

  item_id INTEGER(10) AUTO_INCREMENT,

  product_name VARCHAR(30) NOT NULL,

  department_name VARCHAR(30) NOT NULL,

  price FLOAT(10) NOT NULL,
  stock_quantity INTEGER(10) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Horus X12S", "Transmitters", 580.99, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Taranis 9XE", "Transmitters", 411.99, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('GoPro HERO5', 'Cameras ', 250, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('RunCam 2', 'Cameras', 79.99, 12);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('TrampHV', 'VTX', 28.99, 26);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Cricket V2', 'VTX', 19.99, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('FatShark Dominator', 'Goggles', 499, 9);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('SkyZone SKY03 3D', 'Goggles', 479, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('BushMule', 'Aircraft', 183.42, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('TBS Vendetta 2', 'Aircraft', 499.99, 13);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('3S 22000mah', 'Batteries', 18.95, 35);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('4S 22000mah', 'Batteries', 21.82, 4);


