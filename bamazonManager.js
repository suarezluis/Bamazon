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
    "                                     " + " Manager Account.".blue.underline
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
  askManager();

  //connection.end();
}

//           oooo                                   ooooooooo.                            .o8                            .              .o o.
//           `888                                   `888   `Y88.                         "888                          .o8             .8' `8.
//   .oooo.o  888 .oo.    .ooooo.  oooo oooo    ooo  888   .d88' oooo d8b  .ooooo.   .oooo888  oooo  oooo   .ooooo.  .o888oo  .oooo.o .8'   `8.
//  d88(  "8  888P"Y88b  d88' `88b  `88. `88.  .8'   888ooo88P'  `888""8P d88' `88b d88' `888  `888  `888  d88' `"Y8   888   d88(  "8 88     88
//  `"Y88b.   888   888  888   888   `88..]88..8'    888          888     888   888 888   888   888   888  888         888   `"Y88b.  88     88
//  o.  )88b  888   888  888   888    `888'`888'     888          888     888   888 888   888   888   888  888   .o8   888 . o.  )88b `8.   .8'
//  8""888P' o888o o888o `Y8bod8P'     `8'  `8'     o888o        d888b    `Y8bod8P' `Y8bod88P"  `V88V"V8P' `Y8bod8P'   "888" 8""888P'  `8. .8'
//                                                                                                                                      `" "'
//
//

function showProducts() {
  console.clear();
  header();
  var table = new Table({
    head: [
      "ITEM ID".red.bold.underline,
      "PRODUCT NAME".blue.bold.underline,
      "DEPARTMENT".green.bold.underline,
      "PRICE".yellow.bold.underline,
      "STOCK".magenta.bold.underline
    ],
    colWidths: [10, 40, 15, 10, 10],
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
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      table.push([
        (res[i].item_id + "").red,
        (res[i].product_name + "").blue,
        (res[i].department_name + "").green,
        (res[i].price + "").yellow,
        (res[i].stock_quantity + "").magenta
      ]);
    }
    console.log(table.toString() + "\n");
    again();
  });
}

//                     oooo        ooo        ooooo                                                                 .o o.
//                     `888        `88.       .888'                                                                .8' `8.
//   .oooo.    .oooo.o  888  oooo   888b     d'888   .oooo.   ooo. .oo.    .oooo.    .oooooooo  .ooooo.  oooo d8b .8'   `8.
//  `P  )88b  d88(  "8  888 .8P'    8 Y88. .P  888  `P  )88b  `888P"Y88b  `P  )88b  888' `88b  d88' `88b `888""8P 88     88
//   .oP"888  `"Y88b.   888888.     8  `888'   888   .oP"888   888   888   .oP"888  888   888  888ooo888  888     88     88
//  d8(  888  o.  )88b  888 `88b.   8    Y     888  d8(  888   888   888  d8(  888  `88bod8P'  888    .o  888     `8.   .8'
//  `Y888""8o 8""888P' o888o o888o o8o        o888o `Y888""8o o888o o888o `Y888""8o `8oooooo.  `Y8bod8P' d888b     `8. .8'
//                                                                                  d"     YD                       `" "'
//                                                                                  "Y88888P'
//

function askManager() {
  inquirer
    .prompt({
      name: "option",
      type: "list",
      message: "Select action:?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Update Inventory",
        "Add new Product"
      ]
    })
    .then(function(answer) {
      switch (answer.option) {
        case "View Products for Sale":
          showProducts();

          break;
        case "View Low Inventory":
          showLowInventory();
          break;
        case "Update Inventory":
          updateInventory();
          break;
        case "Add new Product":
          addProduct();
          break;
      }
    });
}

//                                  o8o                .o o.
//                                  `"'               .8' `8.
//   .oooo.    .oooooooo  .oooo.   oooo  ooo. .oo.   .8'   `8.
//  `P  )88b  888' `88b  `P  )88b  `888  `888P"Y88b  88     88
//   .oP"888  888   888   .oP"888   888   888   888  88     88
//  d8(  888  `88bod8P'  d8(  888   888   888   888  `8.   .8'
//  `Y888""8o `8oooooo.  `Y888""8o o888o o888o o888o  `8. .8'
//            d"     YD                                `" "'
//            "Y88888P'
//

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

//           oooo                                   ooooo                                   ooooo                                                   .                                    .o o.
//           `888                                   `888'                                   `888'                                                 .o8                                   .8' `8.
//   .oooo.o  888 .oo.    .ooooo.  oooo oooo    ooo  888          .ooooo.  oooo oooo    ooo  888  ooo. .oo.   oooo    ooo  .ooooo.  ooo. .oo.   .o888oo  .ooooo.  oooo d8b oooo    ooo .8'   `8.
//  d88(  "8  888P"Y88b  d88' `88b  `88. `88.  .8'   888         d88' `88b  `88. `88.  .8'   888  `888P"Y88b   `88.  .8'  d88' `88b `888P"Y88b    888   d88' `88b `888""8P  `88.  .8'  88     88
//  `"Y88b.   888   888  888   888   `88..]88..8'    888         888   888   `88..]88..8'    888   888   888    `88..8'   888ooo888  888   888    888   888   888  888       `88..8'   88     88
//  o.  )88b  888   888  888   888    `888'`888'     888       o 888   888    `888'`888'     888   888   888     `888'    888    .o  888   888    888 . 888   888  888        `888'    `8.   .8'
//  8""888P' o888o o888o `Y8bod8P'     `8'  `8'     o888ooooood8 `Y8bod8P'     `8'  `8'     o888o o888o o888o     `8'     `Y8bod8P' o888o o888o   "888" `Y8bod8P' d888b        .8'      `8. .8'
//                                                                                                                                                                         .o..P'        `" "'
//                                                                                                                                                                         `Y8P'
//

function showLowInventory() {
  var table = new Table({
    head: [
      "ITEM ID".red.bold.underline,
      "PRODUCT NAME".blue.bold.underline,
      "DEPARTMENT".green.bold.underline,
      "PRICE".yellow.bold.underline,
      "STOCK".magenta.bold.underline
    ],
    colWidths: [10, 40, 15, 10, 10],
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
  connection.query("SELECT * FROM products WHERE stock_quantity<5", function(
    err,
    res
  ) {
    for (var i = 0; i < res.length; i++) {
      table.push([
        (res[i].item_id + "").red,
        (res[i].product_name + "").blue,
        (res[i].department_name + "").green,
        (res[i].price + "").yellow,
        (res[i].stock_quantity + "").magenta
      ]);
    }
    console.log(table.toString() + "\n");
    again();
  });
}

//                               .o8                .             ooooo                                                   .                                    .o o.
//                              "888              .o8             `888'                                                 .o8                                   .8' `8.
//  oooo  oooo  oo.ooooo.   .oooo888   .oooo.   .o888oo  .ooooo.   888  ooo. .oo.   oooo    ooo  .ooooo.  ooo. .oo.   .o888oo  .ooooo.  oooo d8b oooo    ooo .8'   `8.
//  `888  `888   888' `88b d88' `888  `P  )88b    888   d88' `88b  888  `888P"Y88b   `88.  .8'  d88' `88b `888P"Y88b    888   d88' `88b `888""8P  `88.  .8'  88     88
//   888   888   888   888 888   888   .oP"888    888   888ooo888  888   888   888    `88..8'   888ooo888  888   888    888   888   888  888       `88..8'   88     88
//   888   888   888   888 888   888  d8(  888    888 . 888    .o  888   888   888     `888'    888    .o  888   888    888 . 888   888  888        `888'    `8.   .8'
//   `V88V"V8P'  888bod8P' `Y8bod88P" `Y888""8o   "888" `Y8bod8P' o888o o888o o888o     `8'     `Y8bod8P' o888o o888o   "888" `Y8bod8P' d888b        .8'      `8. .8'
//               888                                                                                                                             .o..P'        `" "'
//              o888o                                                                                                                            `Y8P'
//

function updateInventory() {
  console.clear();
  header();
  var table = new Table({
    head: [
      "ITEM ID".red.bold.underline,
      "PRODUCT NAME".blue.bold.underline,
      "DEPARTMENT".green.bold.underline,
      "PRICE".yellow.bold.underline,
      "STOCK".magenta.bold.underline
    ],
    colWidths: [10, 40, 15, 10, 10],
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
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      table.push([
        (res[i].item_id + "").red,
        (res[i].product_name + "").blue,
        (res[i].department_name + "").green,
        (res[i].price + "").yellow,
        (res[i].stock_quantity + "").magenta
      ]);
    }
    console.log(table.toString() + "\n");

    inquirer
      .prompt([
        {
          name: "item",
          type: "input",
          message: "       Please enter the ID of the product you would you like to stock?"
            .red
        },
        {
          name: "number",
          type: "input",
          message: "       How many units would you like to stock?".magenta
        }
      ])
      .then(function(answer) {
        connection.query(
          "UPDATE products SET stock_quantity=? WHERE item_id=?;",
          [answer.number, answer.item],
          function(err, res) {
            showProducts();
          }
        );
      });
  });
}

//                  .o8        .o8  ooooooooo.                            .o8                            .     .o o.
//                 "888       "888  `888   `Y88.                         "888                          .o8    .8' `8.
//   .oooo.    .oooo888   .oooo888   888   .d88' oooo d8b  .ooooo.   .oooo888  oooo  oooo   .ooooo.  .o888oo .8'   `8.
//  `P  )88b  d88' `888  d88' `888   888ooo88P'  `888""8P d88' `88b d88' `888  `888  `888  d88' `"Y8   888   88     88
//   .oP"888  888   888  888   888   888          888     888   888 888   888   888   888  888         888   88     88
//  d8(  888  888   888  888   888   888          888     888   888 888   888   888   888  888   .o8   888 . `8.   .8'
//  `Y888""8o `Y8bod88P" `Y8bod88P" o888o        d888b    `Y8bod8P' `Y8bod88P"  `V88V"V8P' `Y8bod8P'   "888"  `8. .8'
//                                                                                                             `" "'
//
//

function addProduct() {
  console.clear();
  header();
  var luisArray = [];
  connection.query("SELECT DISTINCT department_name FROM products", function(
    err,
    res
  ) {
    for (let i = 0; i < res.length; i++) {
      luisArray.push(res[i].department_name);
    }
  });

  var table = new Table({
    head: [
      "ITEM ID".red.bold.underline,
      "PRODUCT NAME".blue.bold.underline,
      "DEPARTMENT".green.bold.underline,
      "PRICE".yellow.bold.underline,
      "STOCK".magenta.bold.underline
    ],
    colWidths: [10, 40, 15, 10, 10],
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
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      table.push([
        (res[i].item_id + "").red,
        (res[i].product_name + "").blue,
        (res[i].department_name + "").green,
        (res[i].price + "").yellow,
        (res[i].stock_quantity + "").magenta
      ]);
    }
    console.log(table.toString() + "\n");
    inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "       Please enter the name of the product you would you like to add?"
            .red
        },
        {
          name: "department",
          type: "list",
          message:
            "       Please enter the Department of the product you would you like to add?",
          choices: luisArray
        },
        {
          name: "price",
          type: "input",
          message: "       Please enter the price of the product you would you like to add?"
            .magenta
        },
        {
          name: "stock",
          type: "input",
          message: "       Please enter the stock of the product you would you like to add?"
            .magenta
        }
      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)",
          [answer.name, answer.department, answer.price, answer.stock],
          function(err, res) {
            showProducts();
          }
        );
      });
  });
}
