//                                             o8o                       .o o.
//                                             `"'                      .8' `8.
//  oooo d8b  .ooooo.   .ooooo oo oooo  oooo  oooo  oooo d8b  .ooooo.  .8'   `8.
//  `888""8P d88' `88b d88' `888  `888  `888  `888  `888""8P d88' `88b 88     88
//   888     888ooo888 888   888   888   888   888   888     888ooo888 88     88
//   888     888    .o 888   888   888   888   888   888     888    .o `8.   .8'
//  d888b    `Y8bod8P' `V8bod888   `V88V"V8P' o888o d888b    `Y8bod8P'  `8. .8'
//                           888.                                        `" "'
//                           8P'
//                           "

var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");
var colors = require("colors");

//
//
//  oooo    ooo  .oooo.   oooo d8b  .oooo.o
//   `88.  .8'  `P  )88b  `888""8P d88(  "8
//    `88..8'    .oP"888   888     `"Y88b.
//     `888'    d8(  888   888     o.  )88b
//      `8'     `Y888""8o d888b    8""888P'
//
//
//

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});
var res1;
var res2;
var ticket;
connection.connect(function(err) {
  if (err) throw err;
  ticket = connection.threadId;
  main();
});

function header() {
  console.clear();
  console.log("");
  console.log(
    "                                     " + "Welcome to Bamazon".red.underline
  );
  console.log(
    "                                    " + " Supervisor Account".blue.underline
  );
  console.log(
    "                                   " +
      "Your connection ID is:".yellow.underline
  );
  console.log("");
  console.log(
    "                                           " + (" " + ticket + " ").inverse
  );
  console.log("");
}

//                               o8o                .o o.
//                               `"'               .8' `8.
//  ooo. .oo.  .oo.    .oooo.   oooo  ooo. .oo.   .8'   `8.
//  `888P"Y88bP"Y88b  `P  )88b  `888  `888P"Y88b  88     88
//   888   888   888   .oP"888   888   888   888  88     88
//   888   888   888  d8(  888   888   888   888  `8.   .8'
//  o888o o888o o888o `Y888""8o o888o o888o o888o  `8. .8'
//                                                  `" "'
//
//

function main() {
  header();
  askSupervisor();

  //connection.end();
}


function askSupervisor() {
    inquirer
    .prompt({
      name: "option",
      type: "list",
      message: "Select action:",
      choices: [
        "View Product Sales by Department",
        "Create New Department"
      ]
    })
    .then(function(answer) {
      switch (answer.option) {
        case "View Product Sales by Department":
          salesByDepartment();

          break;
        case "Create New Department":
        header();
        showDepartments();  
        setTimeout(() => {
            createDepartment();
        }, 20);
          break;
      }})}

      function salesByDepartment(){
        var table = new Table({
            head: [
              "DEPARTMENT ID".red.bold.underline,
              "DEPARTMENT NAME".blue.bold.underline,
              "OVER HEAD COST".green.bold.underline,
              "PRODUCT SALES".yellow.bold.underline,
              "TOTAL PROFIT".magenta.bold.underline
            ],
            //colWidths: [10, 40, 15, 10, 10],
            chars: {
              top: "═",
              "top-mid": "╤",
              "top-left": "╔",
              "top-right": "╗",
              bottom: "═",
              "bottom-mid": "╧",
              "bottom-left": "╚",
              "bottom-right": "╝",
              left: "║",
              "left-mid": "╟",
              mid: "─",
              "mid-mid": "┼",
              right: "║",
              "right-mid": "╢",
              middle: "│"
            }
          });
          
                    
          connection.query("SELECT department_id, departments.department_name, over_head_cost, ROUND(sum(product_sales),2) as product_sales, ROUND(sum(product_sales) - over_head_cost  ,2) as total_profit FROM departments RIGHT JOIN products ON departments.department_name = products.department_name GROUP BY department_id", function(
            err,
            res
          ) {
            
            for (var i = 0; i < res.length; i++) {
              
                
                table.push([
                (res[i].department_id + "").red,
                (res[i].department_name + "").blue,
                ("$" + res[i].over_head_cost + "").green,
                ("$" + res[i].product_sales + "").yellow,
                ("$" + res[i].total_profit + "").magenta
              ]);
            }
            console.log(table.toString() + "\n");
            again();
          });
        
      }

      function again() {
        inquirer
          .prompt({
            name: "again",
            type: "list",
            message: "       Would you like to return to the main menu or exit?",
            choices: ["              Main Menu", "              EXIT"]
          })
          .then(function(answer) {
            if (answer.again == "              Main Menu") {
              main();
            }
            if (answer.again == "              EXIT") {
              console.clear();
              connection.end();
            }
          });
      }

      function createDepartment(){
        
        inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "       Please enter the Name for the new Department:"
            .red
        },
        {
          name: "over",
          type: "input",
          message: "       What is the Over Head Cost?".magenta
        }
      ])
      .then(function(answer) {
        connection.query(
            "INSERT INTO departments (department_name, over_head_cost) VALUES (?, ? )",
            [answer.name, answer.over],
            function(err, res) {
              showDepartments();
            }
          );
          setTimeout(() => {
              again()
          }, 20);
      })
      }

      function showDepartments(){
        
          var table = new Table({
            head: [
              "DEPARTMENT ID".red.bold.underline,
              "DEPARTMENT NAME".blue.bold.underline,
              "OVER HEAD COST".green.bold.underline
              
            ],
            //colWidths: [10, 40, 15, 10, 10],
            chars: {
              top: "═",
              "top-mid": "╤",
              "top-left": "╔",
              "top-right": "╗",
              bottom: "═",
              "bottom-mid": "╧",
              "bottom-left": "╚",
              "bottom-right": "╝",
              left: "║",
              "left-mid": "╟",
              mid: "─",
              "mid-mid": "┼",
              right: "║",
              "right-mid": "╢",
              middle: "│"
            }
          });
          
                    
          connection.query("SELECT * FROM bamazon_db.departments;", function(
            err,
            res
          ) {
            
            for (var i = 0; i < res.length; i++) {
              
                
                table.push([
                (res[i].department_id + "").red,
                (res[i].department_name + "").blue,
                ("$" + res[i].over_head_cost + "").green
                
              ]);
            }
            console.log(table.toString() + "\n");
            
          });

      }