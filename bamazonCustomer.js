var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('easy-table')
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "jalen",
    password: "hello",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("============================================================\n")
        console.log("Welcome to Bamazon. What would you like to purchase today?");
        console.log("\n============================================================\n")
        showTable();
    }
})

function showTable() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) {
            console.log(err);
        }
        // console.log(res); 
        var table = new Table;

        res.forEach(function (product) {
            table.cell("Product ID", product.item_id);
            table.cell("Product Name", product.product_name);
            table.cell("Deparment", product.department_name);
            table.cell("Price", product.price);
            table.cell("Stock", product.stock_quantity);
            table.newRow();
        })
        console.log(table.toString())
        purchase();
    })
}

function purchase() {
    inquirer
        .prompt([
            {
                type: "confirm",
                message: "Would you like to buy something today?",
                name: "confirm",
                default: false,
            }
        ]).then(function (res) {
            if (res.confirm) {
                whatToBuy();
            }else{
                console.log("============================================================\n");
                console.log("Thanks for shopping with us.");
                console.log("\n============================================================\n");
                process.exit(); 
            }
        })
}


function whatToBuy() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the ID of the product you would like to purchase.",
                name: "productID",
            }
        ]).then(function (confirm) {
            itemCheck(parseFloat(confirm.productID));
        })
}



function itemCheck(id) {
    console.log(id);
    connection.query("SELECT * FROM products WHERE item_id=" + "'" + id + "'", function (err, res) {
        if (err) {
            throw (err);
        }
        if (res.length === 0) {
            console.log("Sorry, but that item id doesn't exist.");
            purchase();
        }
        else {
            console.log("============================================================\n")
            console.log("The Product You Wanted To Purchase");
            console.log("\n============================================================\n")
            var table = new Table;

            res.forEach(function (product) {
                table.cell("Product ID", product.item_id);
                table.cell("Product Name", product.product_name);
                table.cell("Deparment", product.department_name);
                table.cell("Price", product.price);
                table.cell("Stock", product.stock_quantity);
                table.newRow();
            })
            console.log("\n" + table.toString())
            checkout(res[0]);
        }


    })

}

function checkout(item) {

    inquirer
        .prompt([
            {
                type: "input",
                message: "How many would you like to purchase?",
                name: "saleNumber"
            }
        ]).then(function (result) {
            var quantity = result.saleNumber;
            var newAmount = item.stock_quantity - quantity;

            if (newAmount > 0) {
                connection.query("UPDATE products SET stock_quantity =" + newAmount + " WHERE item_id =" + item.item_id, function (err, res) {
                    console.log("============================================================\n")
                    console.log("Thank You For Your Purchase!\n");
                    console.log(`Your total was : $${item.price*quantity}`)
                    console.log("\n============================================================\n")
                    inquirer
                    .prompt([
                        {
                            type:"confirm",
                            message:"Would you like to buy anything else today?",
                            name:"buyMore", 
                            default:true,
                        }
                    ]).then(function(res){
                        if (res.buyMore){
                            whatToBuy();
                        }else{
                            console.log("============================================================\n")
                            console.log("Thanks for shopping with us.")
                            console.log("\n============================================================\n")
                            process.exit(); 
                        }
                    })
                })
            } else{
                console.log("============================================================\n")
                console.log("You can't buy that many (not enough stock)")
                console.log("\n============================================================\n")
                checkout(item);
            }

        })
}