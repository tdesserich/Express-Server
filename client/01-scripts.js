function fetchHelloDataFromAPI() {
    fetch('http://localhost:3000/test/helloclient', { //test endpoint with fixed value to verify server works
        method: 'GET', 
        headers: new Headers({ //Send our headers to the server with the Headers() constructor object
          'Content-Type': 'application/json'
        })
    })
        .then(function (response) {
            console.log("Fetch response:", response)
            return response.text(); //value received is a string, not a JSON object, so .text() is used instead of .json()
        })
        .then(function (text) {
            console.log(text);
        });
   }

   /******************************
 * 2 POST long hand: /one 
 *****************************/
function postToOne(){
    var url = 'http://localhost:3000/test/one';

    fetch(url, {
      method: 'POST',  //fetching the url, route handles a post request so our method type is post - two must match
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(
        function(response){  //promise that returns response as plain text 
            return response.text()
        })
    .catch(
        function(error){   //handle an error if one comes back
            console.error('Error:', error)
        })
    .then(
        function(response){   //print the plain text response to the console. This section is where we can do some DOM set up.
            console.log('Success:', response);
        })
}

/***************************************
 * 3 POST /one : Arrow Function
*************************************/
function postToOneArrow(){
    var url = 'http://localhost:3000/test/one';

    fetch(url, {  //reaching out to an endpoint with a POST request. We add the appropriate headers
      method: 'POST', 
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.text()) //are asking for a plain text response
    .catch(error => console.error('Error:', error)) //handle an error, if there is one
    .then(response => console.log('Success:', response)); //print the data to the console
}

/********* */

function postData() {
    //set up an object, just like we would have in Postman. We have a preset string as the value of the item property.
    let content = { testdata: { item: 'This was saved!' } };

    //target some specific ids in the DOM, these elements will hold the value of response that comes back after post is stored  
    let testDataAfterFetch = document.getElementById('test-data');
    let createdAtAfterFetch = document.getElementById('created-at');

    fetch('http://localhost:3000/test/seven', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)  //pass in pre-defined object into fetch call within body property - note method prop is now post instead of get
    })
    .then(response => response.json())
    .then(function (text) {
        console.log(text);
        //4
        testDataAfterFetch.innerHTML = text.testdata.testdata; 
        createdAtAfterFetch.innerHTML = text.testdata.createdAt;
    });
}