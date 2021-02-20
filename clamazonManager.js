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
	showMenu();
});

function showMenu() {
	inquirer.prompt([
		{
			type: "list",
			name: "do",
			message: "Select action to perform:",
			choices: [
				"View products for sale",
				"View low inventory",
				"Add to inventory",
				"Add new product"
			]
		}
	]).then(function(answers) {
		switch (answers.do) {
			case "View products for sale":
			return listItems();

			case "View low inventory":
			return viewLow();

			case "Add to inventory":
			return addInventory();

			case "Add new product":
			return addProducts();
		}
	});
}

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
	});
	
	connection.end();
}

function viewLow() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
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
	});
	
	connection.end();
}

function addInventory() {
	inquirer.prompt([
		{
			type: "input",
			name: "id",
			message: "Item ID:"
		},
		{
			type: "input",
			name: "quantity",
			message: "Quantity to add:"
		}
	]).then(function(answers) {
		updateStock(answers.id, answers.quantity);
	});
}

function updateStock(id, quantity) {
  connection.query(
		`UPDATE products SET stock_quantity = stock_quantity + ${quantity} WHERE item_id = ${id}`, function(err, res) {
		if (err) throw err;
		
		console.log(`\nAdded ${quantity} items to stock quantity.\n`);
  });
  
  connection.end();
}

function addProducts() {
	inquirer.prompt([
		{
			type: "input",
			name: "product_name",
			message: "Item name: "
		},
		{
			type: "input",
			name: "department_name",
			message: "Department:"
		},
		{
			type: "input",
			name: "price",
			message: "Price:"
		},
		{
			type: "input",
			name: "stock_quantity",
			message: "Stock quantity:"
		}
	]).then(function(answers) {
		addStock(answers.product_name, answers.department_name, answers.price, answers.stock_quantity);
	});
}

function addStock(product_name, department_name, price, stock_quantity) {
	connection.query(
		"INSERT INTO products SET ?",
    {
			product_name: product_name,
			department_name: department_name,
			price: price,
			stock_quantity: stock_quantity
    },
    function(err, res) {
			if (err) throw err;

      console.log(`\nAdded item: ${product_name}\n`);
    }
	);
	
	connection.end();
}