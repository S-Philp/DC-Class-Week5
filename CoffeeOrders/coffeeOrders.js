let emailAddressTextBox = document.getElementById("emailAddressTextBox")
let coffeeNameTextBox = document.getElementById("coffeeNameTextBox")
let placeOrderButton = document.getElementById("placeOrderButton")
let emailAddressTextBoxSearch = document.getElementById("emailAddressTextBoxSearch")
let findOrderButton = document.getElementById("findOrderButton")
let ordersUL = document.getElementById("ordersUL")
let yourOrderUL = document.getElementById("yourOrderUL")


function loadAllOrders() {
    let request = new XMLHttpRequest() 
    request.open('GET','https://dc-coffeerun.herokuapp.com/api/coffeeorders')

    request.onload = function() {
        let orders = JSON.parse(this.responseText)
        ordersList = Object.values(orders)
        let result = ordersList.map(function(order) {
            return ` 
            <li>Email Address: ${order.emailAddress}</li>
            <li>Order: ${order.coffee}</li>
            <hr>
            `
        })
        

        let output = `<h3>Current Orders:</h3>${result.join("")}`
        ordersUL.insertAdjacentHTML('beforeend', output)

    }

    request.send() 

}

placeOrderButton.addEventListener('click',() => {

    let email = emailAddressTextBox.value 
    let coffeeName = coffeeNameTextBox.value 

    let requestObject = {
        emailAddress: email, 
        coffee: coffeeName,

    }

    console.log(requestObject)
    console.log(JSON.stringify(requestObject))

    let request = new XMLHttpRequest() 

    request.onload = function() {
       let result = JSON.parse(this.responseText)
       if(result.success) {
           // load all the orders 
           loadAllOrders() 
       }
    }

    request.open('POST', 'https://dc-coffeerun.herokuapp.com/api/coffeeorders/')
    request.setRequestHeader('Content-Type','application/json')

    request.send(JSON.stringify(requestObject))

})

findOrderButton.addEventListener('click', function() {
    
    let request = new XMLHttpRequest()
    request.open('GET', `https://dc-coffeerun.herokuapp.com/api/coffeeorders/${emailAddressTextBoxSearch.value}`)

    request.onload = function() {
        let order = JSON.parse(this.responseText)
        yourOrderUL.innerHTML = `
        <h3>Your Order:</h3>
            <li>Email Address: ${order.emailAddress}</li>
            </li>Order: ${order.coffee}</li>
        `

    }

    request.send()

})


loadAllOrders()

