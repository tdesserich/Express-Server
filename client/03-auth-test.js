function fetchAllFromAuthRoute() {
    const fetch_url = `http://localhost:3000/authtest/getall`
    const accessToken = localStorage.getItem('SessionToken') //Since we stored our token in localStorage, we can access it by using the getItem method to get it back from localStorage and put it in a variable

    const response = fetch(fetch_url, {
        method: 'GET', //get is default but this shows where we use put, delete, etc
        headers: {
            'Content-Type': 'application/json', //The Content-Type header tells the server what kind of data is being sent in our PreFlight request, if any
            'Authorization': accessToken //provides some sort of encrypted data allowing access to the server, in this case our token
        }
    })
        .then(response => {
            return response.json();
        })
        .then(data => {

            console.log(data)
        })
}

/***************************************
 * FETCH/POST to Auth/Create
*************************************/
function postToAuthRouteCreate() {
    const fetch_url = `http://localhost:3000/authtest/create` 
    const accessToken = localStorage.getItem('SessionToken') 

    let authTestDataInput = document.getElementById('authTestData').value; //using an input field in the DOM so we'll grab whatever string user enters in that field

    let authInputData = { authtestdata: { item: authTestDataInput } }; //package that value up into an object - object is similar in syntax to what we did with Postman when posting data

    const response = fetch(fetch_url, {
        method: 'POST', //specify POST instead of GET (GET is default)
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        body: JSON.stringify(authInputData)  //package the object as JSON and add to body of request
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
        })
}

/***************************************
 * GET ITEM BY USER
*************************************/
function getOneByUser() {
    let postIdNumber = document.getElementById("getNumber").value; //We get the postIdNumber provided in the getNumber field. Because we are making an authenticated request, this id has to exist in the database, as well as match the user.id from the database for the user that you are using currently logged in as.

    const fetch_url = `http://localhost:3000/authtest/${postIdNumber}` //pass the postIdNumber into the url with a template literal
    const accessToken = localStorage.getItem('SessionToken')

    const response = fetch(fetch_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
        .then(response => {
            return response.json();
        })
        .then(function (response) {
            console.log(response); 
            var myItem = document.getElementById('getItemValue'); //target an element called getItemValue. It's a label tag
            myItem.innerHTML = response.authtestdata; //set the value of the label to the value of response.authtestdata. This means that the data will be populated in the label when the DOM loads
        })
}

/***************************************
 * PUT to authtest/update/:id
*************************************/
function updateItem() {
    let postIdNumber = document.getElementById("updateNumber").value; 
    let authTestDataInput = document.getElementById('updateValue').value; //get the value of the input provided from the user for both the updateNumber and updateValue fields and assign each to a variable

    const fetch_url = `http://localhost:3000/authtest/update/${postIdNumber}` //pass in the input from the user to the url with a template literal
    const accessToken = localStorage.getItem('SessionToken')

    let authInputData = { authtestdata: { item: authTestDataInput } }; // create an object that packages up our request. We capture the value of authTestDataInput and store it in the variable authInputData variable
    const response = fetch(fetch_url, {
        method: 'PUT', //use PUT because doing an update method
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        body: JSON.stringify(authInputData) //use stringify to convert to JSON
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data) //print response to fetch
            var myItem = document.getElementById('newItemValue') 
            myItem.innerHTML = data.authtestdata; 
            fetchAllFromAuthRoute(); //function at very top
        })
}

function showCurrentData(e) { //e is default variable for an Event Listener, represent input field updateNumber which was passed as a parameter using this on the HTML page
    const fetch_url = `http://localhost:3000/authtest/${e.value}` //We pass the value of the input field supplied by the user directly into the URL with a template literal. Because e is already defined as the input field, we don't need to use a function to get another reference to it
    const accessToken = localStorage.getItem('SessionToken')

    fetch(fetch_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
        .then(response => {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            var myItem = document.getElementById('updateValue'); //We call the DOM element we want to modify and set it to a variable to be accessed later
            if (!response) return; //If no item in the database matches the id we've supplied, the response comes back undefined
            else myItem.value = response.authtestdata; //We could use innerHTML to set the value, but that method doesn't work with <input> elements. Instead, we use value to insert our data into the field
        })
}

/***************************************
 * DELETE an item
*************************************/
function deleteItem() {
    let postIdNumber = document.getElementById("deleteNumber").value;

    const fetch_url = `http://localhost:3000/authtest/delete/${postIdNumber}` //get the id submitted and pass into url
    const accessToken = localStorage.getItem('SessionToken')

    const response = fetch(fetch_url, {
        method: 'DELETE', //use delete method
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
        .then(response => { //print the response to the console and also run the fetchAllFromAuthRoute function again, which will print all remaining items for our user to the console
            console.log(response); 
            fetchAllFromAuthRoute()
        })
}

function deleteItemById(paramNum) { //id of the <li> is passed into this function as a parameter, which is then added to the url 
    const fetch_url = `http://localhost:3000/authtest/delete/${paramNum}`
    const accessToken = localStorage.getItem('SessionToken')

    const response = fetch(fetch_url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
        .then(response => {
            console.log(response);//Print the response to the console to verify the delete worked
            fetchAllFromAuthRoute();//Run the getall function again to print the remaining items in the database to the console
        })
}

/***************************************
 * DELETE with an event
*************************************/
function fetchFromOneDisplayData() {
    const url = 'http://localhost:3000/authtest/getall';
    const accessToken = localStorage.getItem('SessionToken')

    fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': accessToken
        })
    }).then(
        function (response) {
            return response.json()
        })
        .catch(
            function (error) {
                console.error('Error:', error)
            })
        .then(
            function (response) {
                let text = '';
                var myList = document.querySelector('ul#fourteen'); //different way of making a reference to a DOM element. We're aiming for a <ul> element with an id of fourteen (the # signals the program to look for an id rather than a class
                while (myList.firstChild) { //same way we cleared out the <section> elements in the NYT and YouTube API mini-apps
                    myList.removeChild(myList.firstChild)
                }

                console.log(response);
                for (r of response) { //use a for of loop to iterate through the values of each key: value object pair.
                    var listItem = document.createElement('li'); //we're working with a <ul> element, each loop will create a different <li>
                    var textData = r.id + ' ' + r.authtestdata; //create a string with the id and authtestdata properties, then put that string into the <li> element
                    listItem.innerHTML = textData;
                    listItem.setAttribute('id', r.id); //add the id property of each object as an id for each <li>. This will allow us to call them individually later.
                    myList.appendChild(listItem); //The <li> child element is added to the end of the <ul> parent element.
                    myList.addEventListener('click', removeItem);  //add our custom listener to run whenever an <li> is clicked
                }
            })
}

function removeItem(e) {
    console.log(e); //Print e to the console to check which item we're clicking on
    var target = e.target; //target is a nested object within e. This places that object inside its own variable
    if (target.tagName !== 'LI') return; //If the item we're clicking on isn't an <li> element, the empty return statement exits the conditional
    else target.parentNode.removeChild(target); //We remove the <li> child from the <ul> parent

    let x = target.getAttribute("id") //Earlier we set an id for the <li>. Now we get it back so we can pass it to the DELETE request
    deleteItemById(x); //DELETE request 
    console.log("The id number for this item is " + x);
}