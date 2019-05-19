var mysql = require('mysql')
var inquirer = require('inquirer')

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
})

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err
  // run the start function after the connection is made to display products
  start()
})

function start() {
  // This connection.query will select all products from the db 
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
          //    * The first should ask them the SKU of the product they would like to buy.
          message: 'What is the SKU of the product that you would like to buy?',
          // this validate function will ensure that the user can only input a number
          validate: function (value) {
            if (isNaN(value) === false) {
              return true
            }
            return false
          }
        },
        {
          //    * The second message should ask how many units of the product they would like to buy.
          name: 'units',
          type: 'input',
          message: 'How many units would you like to buy?'
        }
      ])
  }
  )
}

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.

// - - -

// * If this activity took you between 8-10 hours, then you've put enough time into this assignment. Feel free to stop here -- unless you want to take on the next challenge.
