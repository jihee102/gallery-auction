const express = require("express");
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

router.get("/", (req, res) => {
    res.send(users);
})

router.get("/sign-up", (req, res) => {
    res.send("This is the user sign-up page.")
});

router.post("/sign-up", (req, res) => {
    const {password, username, email} = req.body;
    let isExisted = false;
    users.forEach(user => {
        if (email === user.email) {
            isExisted = true;
            console.log("check")
        }
        console.log(isExisted)
    })
    if (isExisted) {
        res.send("The email has been used. please try with another email.")
    } else {
        const newUser = {
            id: `${users.length + 1}`,
            email,
            username,
            password: bcrypt.hashSync(password, saltRounds)
        }
        users.push(newUser);
        res.status(StatusCodes.CREATED).send(req.body);
    }
})
router.get("/log-in", (req, res) => {
    res.send("this log in page")
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
            res.status(StatusCodes.BAD_REQUEST).send({"message": "the user doesnt exist"})
        }

});


router.get("/mybids", (req, res) => {
    const bearerHeader = req.headers["authorization"];
    console.log(req.headers["authorization"]);
    if (bearerHeader) {
        // check if the token is valid
        const tokenPayload = isTokenValid(bearerHeader);
        console.log(tokenPayload);
        if (tokenPayload) {
            const user = users.find(element => element.username === tokenPayload.username);
            if (user) {
                let userBidList = bids.filter(bid => bid.username === user.username);

                userBidList = userBidList.map(bid => {
                    const paintName = paintings.find(paint => paint.id == bid.paintId).name;
                    return {...bid, isBest: isBest(bid), paintName: paintName}
                });
                res.send(userBidList);
            } else {
                res.status(StatusCodes.NOT_FOUND).send("the user doesnt exist")
            }

        }

    }
    res.status(StatusCodes.BAD_REQUEST).send({"message": "Authentication required"})
})

router.delete("/mybids/:id", (req, res) => {
    const bidId = req.params.id;
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
        // check if the token is valid
        const tokenPayload = isTokenValid(bearerHeader);
        if (tokenPayload) {
            bids = bids.filter(bid => bid.id !== bidId);
            res.send(bids);
        }

    }
    res.status(StatusCodes.BAD_REQUEST).send({"message": "Authentication required"})
})

router.get("/admin/bids", (req, res) => {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
        const token = bearerHeader.split(' ')[1];
        // check if the token is valid
        const tokenPayload = isTokenValid(token);
        if (tokenPayload.admin) {
            res.send(bids);
        }

    }
    res.status(StatusCodes.BAD_REQUEST).send({"message": "Authentication required"})
})

function isBest(bid) {
    const paintID = bid.paintId;
    const paintBids = bids.filter(bid => bid.paintId === paintID);

    paintBids.sort((a, b) => {
        return b.bidPrice - a.bidPrice;
    });

    return paintBids[0].id === bid.id;

}


module.exports = router;