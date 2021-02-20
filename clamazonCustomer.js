import inquirer from "inquirer";
import mysql from "mysql2";
import Table from "cli-table";
import dotenv  from "dotenv";

dotenv.config();

// connect to mysql server
var connection = mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
});

connection.connect(function(err) {
  if (err) throw err;
  listItems();
});

function setupTable() {
  var table = new Table({
    head: ["ID","SALE ITEM", "PRICE", "QUANTITY", "DEPARTMENT"],
    colWidths: [4, 60, 11, 10, 20]
  });
  
  return table;
}

function listItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    // grab already-set-up table
    var table = setupTable();

    // fill table with DB items
    for (let r of res) {
      table.push(
        [
          r.item_id,
          r.product_name,
          `$${r.price}`,
          r.stock_quantity,
          r.department_name
        ]
      );
    }
    console.log(table.toString());

    doBuy();
  });
}

function doBuy() {
  inquirer.prompt([

    {
      type: "input",
      name: "id",
      message: "Item ID:",
      validate: function(val) {
        return (!isNaN(val) && val.length > 0 && val.length < 4);
      }
    },
    {
      type: "input",
      name: "quantity",
      message: "Order quantity:",
      validate: function(val) {
        return (!isNaN(val) && val > 0);
      }
    }
  ]).then(function(answers) {
    getCost(answers.id, answers.quantity);
  });
}

function getCost(id, quantity) {
  connection.query(`SELECT * FROM products WHERE item_id = ${id}`, function(err, res) {
    if (err) throw err;
  
    var stock_quantity = res[0].stock_quantity;
    var price = res[0].price;
    if (stock_quantity >= quantity) {
      var cost = price * quantity;
      console.log(`\n$${cost} charged to your account. Your items are on the way.\n`);
      updateStock(id, quantity);
    } else {
      console.log("\nWe don't have enough of those in stock! Please try again.\n");
    }
  });
}

function updateStock(id, quantity) {
  connection.query(`UPDATE products SET stock_quantity = stock_quantity - ${quantity} WHERE item_id = ${id}`, function(err, res) {
    if (err) throw err;
  });
  
  connection.end();
}

