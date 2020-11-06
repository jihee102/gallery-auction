const express = require("express");
const {findPaint, isAuth} = require("./util.js");

const router = express.Router();
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');

let paintings = require("../data/paintings");

const isTokenValid = require("../utils/token");
let users = require("../data/userdata");
let bids = require("../data/bids");


router.get('/', (req, res) => {
    res.send(paintings);
});

router.get("/paint", (req, res)=>{
    // const {size, name, creationDate, value}= req.query;
    const object = req.query;
    const resultPaints =findPaint(object);

    if(resultPaints.length > 0){
        res.send(resultPaints);
    }else{
        res.status(404)
            .send(`Paint is not found`);
    }

})

router.post("/", (req, res) => {
    const newPaint = req.body;
    const newPaintWithID = {"id": `${paintings.length + 1}`, ...newPaint};

    paintings.push(newPaintWithID);

    res.status(201).send(newPaintWithID);
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    if (id) {
        const paint = paintings.find(paint => paint.id == id);
        if (paint) {
            res.send(paint);
        } else {
            res.status(404)
                .send(`Paint (id ${id}) is not found`);
        }
    }
})


router.put("/:id/update",isAuth, (req, res) => {
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
            res.status(404)
                .send(`Paint (id ${id}) is not found`);
        }
    }
});

router.delete("/:id", isAuth,(req, res) => {
    const id = req.params.id;
    if (id) {
        const paint = paintings.find(paint => paint.id == id);
        if (paint) {
            paintings = paintings.filter(paint => paint.id !== id);
            res.send("The paint is deleted.");
        } else {
            res.status(404)
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
        res.status(404)
            .send(`Paint (id ${id}) is not found`);
    }

});


router.post("/:id/bid",isAuth, (req, res)=>{
    const id = req.params.id;
    const {amount} = req.body;
    const tokenPayload = req.user;
    const paint = paintings.find(paint => paint.id == id);
    const day = new Date();
    const time = day.getMonth()+"/"+day.getDate()+" "+day.getHours()+":"+day.getMinutes();
    const newBid = {id : `${bids.length+1}`, username: tokenPayload.username, paintId: paint.id, bidTime: time, bidPrice:amount };
    bids.push(newBid);
    res.status(201).send(newBid)

})

module.exports = router;