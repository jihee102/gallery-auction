const express = require("express");
const router = express.Router();
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');

let paintings = require("../data/paintings");

const jwt = require("jsonwebtoken");
const isTokenValid = require("../utils/token");
let users = require("../data/userdata");
let bids = require("../data/bids");


router.get('/', (req, res) => {
    res.send(paintings);
});

router.get("/search", (req, res)=>{
    // const {size, name, creationDate, value}= req.query;
    const object = req.query;
    let resultPaintings = [];
    let searchedKeys =[];

    Object.keys(object).forEach(key =>{
        searchedKeys.push(key);
    })

    if(searchedKeys.length > 1){
        let temPaintings= [...paintings];
        for (let i = 0; i <searchedKeys.length ; i++) {
            temPaintings = temPaintings.filter(paint =>{
                return (paint[searchedKeys[i]].toLowerCase() === object[searchedKeys[i]].toLowerCase())
            })
        }
        resultPaintings = [...temPaintings];

    }else if( searchedKeys.length ===1 ){
        paintings.map(paint =>{
            if(paint[searchedKeys[0]].toLowerCase() === object[searchedKeys[0]].toLowerCase()){
                resultPaintings.push(paint);
            }
        })
    }
    if(resultPaintings.length > 0){
        res.send(resultPaintings);
    }else{
        res.status(StatusCodes.NOT_FOUND).send({message: 'No paint with the searched condition'})
    }

})

router.post("/", (req, res) => {
    const newPaint = req.body;
    const newPaintWithID = {"id": `${paintings.length + 1}`, ...newPaint};

    paintings.push(newPaintWithID);

    res.status(StatusCodes.CREATED).send(newPaintWithID);
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    if (id) {
        const paint = paintings.find(paint => paint.id == id);
        if (paint) {
            res.send(paint);
        } else {
            res.status(StatusCodes.NOT_FOUND)
                .send(`Paint (id ${id}) is not found`);
        }
    }
})

router.get("/:id/update", (req, res) => {
    res.send("This is the edit page");
})

router.put("/:id/update", (req, res) => {
    const id = req.params.id;
    if (id) {
        let index;
        const paint = paintings.find((paint, i) => {
            index = i;
            return paint.id == id
        });
        if (paint) {
            const updatedPaint = {...paint, ...req.body};
            paintings[index] = updatedPaint;
            res.send(updatedPaint);
        } else {
            res.status(StatusCodes.NOT_FOUND)
                .send(`Paint (id ${id}) is not found`);
        }
    }
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    if (id) {
        const paint = paintings.find(paint => paint.id == id);
        if (paint) {
            paintings = paintings.filter(paint => paint.id !== id);
            res.send("The paint is deleted.");
        } else {
            res.status(StatusCodes.NOT_FOUND)
                .send(`Paint (id ${id}) is not found`);

        }
    }
})

router.get("/:id/bid", (req, res)=>{
    const id = req.params.id;
    const paint = paintings.find(paint => paint.id == id);

    if(paint){
        const paintBidsList = bids.filter(bid => bid.paintId === id);
        const sortedBidsList = paintBidsList.sort((a,b)=>{ return  b.bidPrice - a.bidPrice});
        res.send(sortedBidsList);
    }else{
        res.status(StatusCodes.NOT_FOUND)
            .send(`Paint (id ${id}) is not found`);
    }

});


router.post("/:id/bid", (req, res)=>{
    const id = req.params.id;
    const {amount} = req.body;
    let bearerHeader = req.headers["authorization"];
    if(bearerHeader){
        const token = bearerHeader.split(' ')[1];

        // check if the token is valid
        const tokenPayload = isTokenValid(token);
        if(tokenPayload){
            const user = users.find(element => element.id === tokenPayload.id);
            const paint = paintings.find(paint => paint.id == id);

            if(user){
                const newBid = {id : `${bids.length+1}`, username: user.username, paintId: paint.id, bidTime: Date.now(), bidPrice:amount };
                bids.push(newBid);
                res.send({message: "New bid is added"})
            }
        }

    }


})

module.exports = router;