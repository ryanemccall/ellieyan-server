const jwt = require("jsonwebtoken");
const { User } = require("../models");

const Auth = async(req, res, next) => {
    //preflight
    if(req.method == "OPTIONS") {
        //if save it will continue
        next();
    } else if (
        req.headers.authorization &&
        req.headers.authorization.includes("Bearer")
    ) {
        const { authorization } = req.headers;
        console.log("authorization -->", authorization); //checking to confirm headers include auth/bearer

        const payload = authorization ?
        jwt.verify(authorization.includes("Bearer") ?
        authorization.split(" ")[1] :
        authorization,
        process.env.JWT_SECRET):
        undefined;

        console.log("payload -->", payload); //checking payload for secret or undefined
        if (payload) {
            let foundUser = await User.findOne({
                where: { id: payload.id }
            });
            console.log("foundUser -->", foundUser); //checking if user has been found
            if (foundUser) {
                console.log("request -->", req); //checking what the user wants to do
                req.user = foundUser;
                next();
            } else {
                res.status(400).send({message: "Not Authorized"})
            } 
        } else {
            res.status(401).send({
                message: "Invalid Token"
            })
        } 
    } else {
        res.status(403).send({ message: "Forbidden"});
    }
};

module.exports = Auth;