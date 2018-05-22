USE bamazon_db;
CREATE TABLE departments (

  department_id INTEGER(10) AUTO_INCREMENT,

  department_name VARCHAR(30) NOT NULL,

  over_head_cost VARCHAR(30) NOT NULL,

  
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_cost) VALUES ("Transmitters", 2000 );
INSERT INTO departments (department_name, over_head_cost) VALUES ("Cameras", 800 );
INSERT INTO departments (department_name, over_head_cost) VALUES ("VTX", 500 );
INSERT INTO departments (department_name, over_head_cost) VALUES ("Goggles", 1000 );
INSERT INTO departments (department_name, over_head_cost) VALUES ("Aircraft", 1200 );
INSERT INTO departments (department_name, over_head_cost) VALUES ("Batteries", 400 );