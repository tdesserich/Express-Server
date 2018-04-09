/********************
 * POST - /createuser
*********************/
function userSignUp(){
    let userName = document.getElementById('userSignUp').value; //grab value of the user/password data from createuser input field in the index.html file
    let userPass = document.getElementById('passSignUp').value;
    console.log(userName, userPass);

    let newUserData = {user : { username: userName, password: userPass}}; //variables used to store signup info from the DOM are passed into values of the username and password properties; package up in user object
    fetch('http://localhost:3000/api/user/createuser', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserData) //In request object in fetch() call, pass in newUserData variable to be sent off in body of our request to server.
    })
    .then(response => response.json())
    .then(function (response) {
        console.log(response.sessionToken);
        let token = response.sessionToken; //We get the sessionToken from the response and store it in a token variable
        localStorage.setItem('SessionToken', token);  //In our localStorage, we call the setItem function and store the token in localStorage. This will keep our token safely stored in our local window
    });
}

/********************
 * POST - /signin
*********************/
function userSignIn(){
    let userName = document.getElementById('userSignin').value; 
    let userPass = document.getElementById('passSignin').value;
    console.log(userName, userPass);

    let userData = {user : { username: userName, password: userPass}};
    fetch('http://localhost:3000/api/user/signin', { //<---signin route used
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData) //In the request object in our fetch() call, we pass in the newUserData variable to be sent off in the body of our request to the server
    })
    .then(response => response.json())
    .then(function (response) {
        console.log(response.sessionToken);
        let token = response.sessionToken; //We get the sessionToken from the response and store it in a token variable.
        localStorage.setItem('SessionToken', token); //In our localStorage, we call the setItem function and store the token in localStorage. This will keep our token safely stored in our local window.
    });
}

function getSessionToken(){
    var data = localStorage.getItem('SessionToken');
    console.log(data);
    return data;
}


/****************************
 * HELPER FUNCTION FOR TOKEN
*****************************/
function getSessionToken(){
    var data = localStorage.getItem('SessionToken');
    console.log(data);
    return data;
}