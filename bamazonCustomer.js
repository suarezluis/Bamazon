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
  console.clear();
  console.log("");
  console.log(
    "                                     " + "Welcome to Bamazon".red.underline
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
  createTable();

  //connection.end();
}

//                                             .             ooooooooooooo            .o8       oooo              .o o.
//                                           .o8             8'   888   `8           "888       `888             .8' `8.
//   .ooooo.  oooo d8b  .ooooo.   .oooo.   .o888oo  .ooooo.       888       .oooo.    888oooo.   888   .ooooo.  .8'   `8.
//  d88' `"Y8 `888""8P d88' `88b `P  )88b    888   d88' `88b      888      `P  )88b   d88' `88b  888  d88' `88b 88     88
//  888        888     888ooo888  .oP"888    888   888ooo888      888       .oP"888   888   888  888  888ooo888 88     88
//  888   .o8  888     888    .o d8(  888    888 . 888    .o      888      d8(  888   888   888  888  888    .o `8.   .8'
//  `Y8bod8P' d888b    `Y8bod8P' `Y888""8o   "888" `Y8bod8P'     o888o     `Y888""8o  `Y8bod8P' o888o `Y8bod8P'  `8. .8'
//                                                                                                                `" "'
//
//

function createTable() {
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
    askCostumer();
  });
}

//                     oooo          .oooooo.                          .                                                      .o o.
//                     `888         d8P'  `Y8b                       .o8                                                     .8' `8.
//   .oooo.    .oooo.o  888  oooo  888           .ooooo.   .oooo.o .o888oo oooo  oooo  ooo. .oo.  .oo.    .ooooo.  oooo d8b .8'   `8.
//  `P  )88b  d88(  "8  888 .8P'   888          d88' `88b d88(  "8   888   `888  `888  `888P"Y88bP"Y88b  d88' `88b `888""8P 88     88
//   .oP"888  `"Y88b.   888888.    888          888   888 `"Y88b.    888    888   888   888   888   888  888ooo888  888     88     88
//  d8(  888  o.  )88b  888 `88b.  `88b    ooo  888   888 o.  )88b   888 .  888   888   888   888   888  888    .o  888     `8.   .8'
//  `Y888""8o 8""888P' o888o o888o  `Y8bood8P'  `Y8bod8P' 8""888P'   "888"  `V88V"V8P' o888o o888o o888o `Y8bod8P' d888b     `8. .8'
//                                                                                                                            `" "'
//
//

function askCostumer() {
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "       Please enter the ID of the product you would you like to buy?"
          .red
      },
      {
        name: "number",
        type: "input",
        message: "       How many units would you like to purchase?".magenta
      }
    ])
    .then(function(answer) {
      if (checkAvailable(answer.item, answer.number)) {
      }
    });
}

//            oooo                            oooo              .o.                              o8o  oooo             .o8       oooo              .o o.
//            `888                            `888             .888.                             `"'  `888            "888       `888             .8' `8.
//   .ooooo.   888 .oo.    .ooooo.   .ooooo.   888  oooo      .8"888.     oooo    ooo  .oooo.   oooo   888   .oooo.    888oooo.   888   .ooooo.  .8'   `8.
//  d88' `"Y8  888P"Y88b  d88' `88b d88' `"Y8  888 .8P'      .8' `888.     `88.  .8'  `P  )88b  `888   888  `P  )88b   d88' `88b  888  d88' `88b 88     88
//  888        888   888  888ooo888 888        888888.      .88ooo8888.     `88..8'    .oP"888   888   888   .oP"888   888   888  888  888ooo888 88     88
//  888   .o8  888   888  888    .o 888   .o8  888 `88b.   .8'     `888.     `888'    d8(  888   888   888  d8(  888   888   888  888  888    .o `8.   .8'
//  `Y8bod8P' o888o o888o `Y8bod8P' `Y8bod8P' o888o o888o o88o     o8888o     `8'     `Y888""8o o888o o888o `Y888""8o  `Y8bod8P' o888o `Y8bod8P'  `8. .8'
//                                                                                                                                                 `" "'
//
//

function checkAvailable(item, number) {
  connection.query(
    "SELECT * FROM bamazon_db.products WHERE item_id=?;",
    item,
    function(err, res) {
      if (err) throw err;

      if (parseInt(res[0].stock_quantity) < parseInt(number)) {
        console.log(
          "              Unfortunately we dont have the stock to fulfill your order."
            .red.bold
        );
      } else {
        connection.query(
          "UPDATE bamazon_db.products SET stock_quantity='?' WHERE item_id=?;",
          [parseInt(res[0].stock_quantity) - parseInt(number), item],
          function(err, res) {
            if (err) throw err;
          }
        );

        connection.query(
          "UPDATE bamazon_db.products SET product_sales='?' WHERE item_id=?;",
          [parseFloat(res[0].product_sales)+(Math.round(parseFloat(res[0].price) * number * 100) / 100), item],
          function(err, res) {
            if (err) throw err;
          }
        );

        console.log(
          "\n              Thanks for your order of ".yellow +
            number +
            " units of ".yellow +
            res[0].product_name +
            " with a total of ".yellow +
            "$" +
            Math.round(parseFloat(res[0].price) * number * 100) / 100
        );
        console.log("");
      }
      again();
    }
  );
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
      message: "\n       Would you like to keep shopping or exit?",
      choices: ["              Keep Shopping", "              EXIT"]
    })
    .then(function(answer) {
      if (answer.again == "              Keep Shopping") {
        main();
      }
      if (answer.again == "              EXIT") {
        console.clear();
        connection.end();
      }
    });
}
