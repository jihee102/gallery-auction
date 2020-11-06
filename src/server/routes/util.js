let paintings = require("../data/paintings");
let bids = require("../data/bids");
const jwt = require("jsonwebtoken");
let users = require("../data/userdata");

const findPaint=(object)=>{
    let resultPaintings = [];
    let searchedKeys =[];

    Object.keys(object).forEach(key =>{
        searchedKeys.push(key);
    });

    // when the searching keyword is more than 1
    if(searchedKeys.length > 1){
        let temPaintings= [...paintings];
        for (let i = 0; i <searchedKeys.length ; i++) {
            temPaintings = temPaintings.filter(paint =>(paint[searchedKeys[i]].toLowerCase().includes(object[searchedKeys[i]].toLowerCase()))
            );
        }
        resultPaintings = [...temPaintings];

        // when the searching keyword is 1
    }else if( searchedKeys.length ===1 ){
        paintings.map(paint =>{
            if(paint[searchedKeys[0]].toLowerCase().includes(object[searchedKeys[0]].toLowerCase())){
                resultPaintings.push(paint);
            }
        })
    }
    return resultPaintings;
}


function isBest(bid) {
    const paintID = bid.paintId;
    const paintBids = bids.filter(bid => bid.paintId === paintID);

    paintBids.sort((a, b) => {
        return b.bidPrice - a.bidPrice;
    });

    return paintBids[0].id === bid.id;

}

const isAuth = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
        res.status(401).send({ message: 'Token is not supplied' });
    } else {

        const tokenPayload = isTokenValid(bearerHeader);

        if(tokenPayload){
            req.user = tokenPayload;
            next();
        }else{
            res.status(401).send({ message: 'Invalid Token' });
        }
    }
};

const isTokenValid =   (token) =>{
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
module.exports = {findPaint, isBest, isAuth};