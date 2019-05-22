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

// ### Challenge #2: Manager View (Next Level)

// * Create a new Node application called `bamazonManager.js`. Running this application will:

//   * List a set of menu options:
let dataBase = ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err
    // run the start function after the connection is made to display products
    // productsForSale()
    // lowInventory()
    inquirer
        .prompt([{
            /* Pass your questions in here */
            name: 'userInput',
            message: 'What would you like to do?',
            type: 'list',
            choices: dataBase
        }])
        .then(answers => {
            // Use user feedback for... whatever!!
            // console.log(answers)
            // <name> or .userInput is what works for pulling answer complete if statement
            if (answers.userInput === dataBase[0]) {
                productsForSale()
            } else if (answers.userInput === dataBase[1]) {
                lowInventory()
            } else if (answers.userInput === dataBase[2]) {
                updateInventory()
            } else if (answers.userInput === dataBase[3]) {
                addNewProduct()
            }
        });
});

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
//     * Add to Inventory
function updateInventory() {
    // function connection asks (What is in here, a callback is a function passed as an argument)
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err
        // console.log(res)
        inquirer
            .prompt([
                {
                    name: 'choice',
                    type: 'rawlist',
                    choices: function () {
                        // create an empty array
                        var choiceArray = []
                        for (var i = 0; i < res.length; i++) {
                            // pushes items into choicesArray
                            choiceArray.push(res[i].product_name)
                        }
                        return choiceArray
                    },
                    message: 'What is the SKU of the product?',
                    // this validate function will ensure that the user can only input a number
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true
                        }
                        return false
                    }
                },
                {
                    name: 'units',
                    type: 'input',
                    message: 'How many units will be added?',
                    // this validate function will ensure that the user can only input a number
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true
                        }
                        return false
                    }
                }
            ])
            // asynchronous takes a while
            .then(function (answer) {
                console.log(answer)
                // get the information of the chosen item
                var chosenItem
                for (var i = 0; i < res.length; i++) {
                    // console log below code to understand what objects are looping through, res [i] picks one at a time
                    // console.log("/////////////////////////////////////////")
                    // console.log(res[i])
                    if (res[i].product_name === answer.choice) {
                        chosenItem = res[i]
                    }
                }
                // console.log(chosenItem.stock_quantity)
                // console.log(parseInt(answer.units))
                var addedStock = chosenItem.stock_quantity + parseInt(answer.units)
                // console.log(addedStock)
                connection.query(

                    // 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
                    //    * This means updating the SQL database to reflect the remaining quantity.
                    'UPDATE products Set ? WHERE ?',
                    // 1 object per question mark
                    [
                        {
                            // column name for this instance it is the key : variable
                            stock_quantity: addedStock
                        },
                        {
                            product_name: chosenItem.product_name
                        }
                    ]
                )
                //    * Once the update goes through, show the customer the total cost of their purchase.
                //   var totalPrice = parseInt(answer.units) * chosenItem.price
                //   console.log(`Your total is ${totalPrice}`)
                console.log('Thanks for adding!')

                // method that comes with mySQL, method is a function that belongs to a object. 
                // end connection so user is not left hanging
                connection.end()
            })
    }
    )
};
//     * Add New Product
function addNewProduct() {
    // prompt question for new product
    inquirer
        .prompt([
            {
                name: 'sku',
                type: 'input',
                message: 'Enter a SKU:',
                // this validate function will ensure that the user can only input a number
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true
                    }
                    return false
                }
            },
            {
                name: 'product',
                type: 'input',
                message: 'What is the product name?'
            },
            {
                name: 'department',
                type: 'input',
                message: 'Enter a department for this product.'
            },
            {
                name: 'price',
                type: 'input',
                message: 'What is the cost?',
                // this validate function will ensure that the user can only input a number
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true
                    }
                    return false
                }
            },
            {
                name: 'quantity',
                type: 'input',
                message: 'Enter the quantity for this product.',
                // this validate function will ensure that the user can only input a number
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true
                    }
                    return false
                }
            }
        ])
        .then(answers => {
            // prompt works fine
            // console.log(answers.sku, answers.product, answers.department, answers.price,answers.quantity)
            connection.query(
                // my error was not including function(err, results) { if (err) throw err;} in the function.
                // personally got confused bc of the complexity of the
                `INSERT INTO products (sku, product_name, department_name, price, stock_quantity)
                VALUES (${answers.sku}, '${answers.product}', '${answers.department}', ${answers.price}, ${answers.quantity});`, function(err, results) {
                    if (err) throw err;

                    connection.end()
                }

                    //    log 
                    // console.log()
                    
            ) 
        });
    // then insert into db
};

//   * If a manager selects `View Products for Sale`, the app should list every available item: the item SKUs, names, prices, and quantities.

//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
