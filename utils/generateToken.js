import jwt from "jsonwebtoken";


// it is hashing the ID of the user to generate the token
const generateToken = (id) => {
    // jwt works in milliseconds.
    return jwt.sign({id}, process.env.JWT_KEY, {expiresIn:'5d'});
}

export default generateToken;