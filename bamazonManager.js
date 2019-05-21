const Table = require('cli-table')
var mysql = require('mysql');
var inquirer = require('inquirer');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'nodeUser',

    // Your password
    password: '',
    database: 'bamazon_DB'
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err
    // run the start function after the connection is made to display products
    displayItem()
});

function displayItem() {
    [
        connection.query('SELECT * FROM products', function (err, res) {
            if (err) throw err
            // console.log(res)
            let table = new Table({
                head: ['SKU', 'Product', 'Price', 'Department', 'Quantity']
            })
            for (var i = 0; i < res.length; i++) {
                // pushes items into choicesArray
                let inventoryItem =[
                   sku = res[i].sku,
                   productname = res[i].product_name,
                   price = res[i].price,
                   departmentname = res[i].department_name,
                   stockquantity = res[i].stock_quantity
                ]
                    table.push([`${sku}`,
                    `${productname}`,
                    `${price}`,
                    `${departmentname}`,
                    `${stockquantity}`]);
                }
                console.log(table.toString());
        })
    ]
};