const express = require("express");
const {isBest, isAuth} = require("./util.js");
const router = express.Router();
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const isTokenValid = require("../utils/token");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

let users = require("../data/userdata");
let paintings = require("../data/paintings");
let bids = require("../data/bids");

router.get("/", isAuth,(req, res) => {
    const tokenPayload = req.user;
    if (tokenPayload.admin) {
        res.send(users);
    }else{
        res.status(400).send({"message": "Authentication required"})
    }
})


router.post("/sign-up", (req, res) => {
    const {password, username, email} = req.body;
    let isExisted = false;
    users.forEach(user => {
        if (email === user.email) {
            isExisted = true;
        }
    })
    if (isExisted) {
        res.status(409).send("The email has been used. please try with another email.")
    } else {
        const newUser = {
            id: `${users.length + 1}`,
            email,
            username,
            password: bcrypt.hashSync(password, saltRounds)
        }
        users.push(newUser);
        res.status(201).send(req.body);
    }
});



router.post("/log-in", (req, res) => {
    const {password, username} = req.body;
    const user = users.find(element => element.username === username);
    const token = user && bcrypt.compareSync(password, user.password) ? jwt.sign({
        username: user.username,
        id: user.id,
        admin: user.admin
    }, user.email) : false;
    if (token) {
        res.send({"token": token});
    } else {
        res.status(404).send("the user doesnt exist")
    }
});

router.get("/mybids",isAuth, (req, res) => {
    const tokenPayload = req.user;
    const user = users.find(element => element.username === tokenPayload.username);
    if (user) {
        let userBidList = bids.filter(bid => bid.username === user.username);
        userBidList = userBidList.map(bid => {
            const paintName = paintings.find(paint => paint.id == bid.paintId).name;
            return {...bid, isBest: isBest(bid), paintName: paintName}
        });
        res.send(userBidList);
    } else {
        res.status(404).send("the user doesnt exist")
    }
})

router.delete("/mybids/:id",isAuth, (req, res) => {
    const bidId = req.params.id;
    let paintExisting = false;
    paintings.forEach(paint => {
        if(paint.id === bidId){
            paintExisting = true;
        }
    });
    const tokenPayload = req.user;
    if(paintExisting){
        bids = bids.filter(bid => bid.id !== bidId);
        res.send(bids);
    }else{
        res.status(404).send({"message": "Paint is not existed."})
    }

})

router.get("/admin/bids", isAuth, (req, res) => {
    const tokenPayload = req.user;
    if (tokenPayload.admin) {
        res.send(bids);
    }else{
        res.status(400).send({"message": "Authentication required"})
    }

})




module.exports = router;