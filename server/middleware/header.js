module.exports = function(req, res, next){ //allows us to export module to be used in another file; 
                         // req refers to the request from the client, specifically focusing on any headers present on the request object. 
                         // res refers to the response and will be used to present which types of headers are allowed by the server.  
    // call res.header so server will respond with what kind of headers are allowed by the server  
                         // use the specific access-control-allow-origin header to tell the server the specific origin locations allowed to communicate with server. The * is known as a wild-card. means everything is allowed
    res.header('access-control-allow-origin', '*');
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE'); //HTTP methods server will allow to be used
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); //headers types the server will accept from client

    next(); //sends the request along to its next destination
   };