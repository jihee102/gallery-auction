const jwt = require("jsonwebtoken");
let users = require("../data/userdata");

module.exports  =  (token) =>{
    const tokenPayload = jwt.decode(token);
    const user = users.find(element => element.username === tokenPayload.username);
    if(user){
        // check if the token given by the user is actually valid.
        try{
            return jwt.verify(token, user.email);
        }catch (e) {
            return false;
        }
    }else {
        return false;
    }
}