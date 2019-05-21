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
    // productsForSale()
    // lowInventory()
    inquirer
        .prompt([{
            /* Pass your questions in here */
            name: 'command',
            message: 'What would you like to do?',
            type: 'list',
            choices: menuItems
        }])
        .then(answers => {
            // Use user feedback for... whatever!!
            // console.log(answers)
            if (answers === menuItems[0]) {
                productsForSale()
            } else if (answers === menuItems[1]) {
                lowInventory()
            } else if (answers === menuItems[2]) {
                updateInventory()
            } else if (answers === menuItems[3]) {
                addNewProduct()
            }
        });
});

// ### Challenge #2: Manager View (Next Level)

// * Create a new Node application called `bamazonManager.js`. Running this application will:

//   * List a set of menu options:
let menuItems = ['View Products for Sale', 'View Low Inventory', 'Update Inventory', 'Add New Product']

//     * View Products for Sale
function productsForSale() {
    [
        connection.query('SELECT * FROM products', function (err, res) {
            if (err) throw err
            // console.log(res)
            let table = new Table({
                head: ['SKU', 'Product', 'Price', 'Department', 'Quantity']
            })
            for (var i = 0; i < res.length; i++) {
                // pushes items into choicesArray
                let inventoryItem = [
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
            connection.end()
        })
    ]
};


//     * View Low Inventory
function lowInventory() {
    [
        // From DB products WHERE stock is less than 5
        connection.query('SELECT * FROM products WHERE stock_quantity < 5', function (err, res) {
            if (err) throw err
            // npm cli table
            let table = new Table({
                head: ['SKU', 'Product', 'Price', 'Department', 'Quantity']
            })
            for (var i = 0; i < res.length; i++) {
                // pushes items into choicesArray
                let inventoryItem = [
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
            // log per documentation
            console.log(table.toString());
            // end connection
            connection.end()
        })
    ]
};
//     if statement quantity <5, run a loop

//     * Add to Inventory

//     * Add New Product

//   * If a manager selects `View Products for Sale`, the app should list every available item: the item SKUs, names, prices, and quantities.

//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
