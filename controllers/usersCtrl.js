import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from 'bcrypt';
import generateToken from "../utils/generateToken.js";



export const registerUserCtrl = asyncHandler(async(req, res) => {
    const {fullName, email, password}  = req.body;


    // checking if what u are submitting is already in the database.
    // findOne() is a mongoose method.
    const userExists = await User.findOne({email});
    if (userExists){
        throw new Error('User already exists');
    }


    // Hashing password.
    // salt is the strength of the password that was hashed.
    const salt = await bcrypt.genSalt(12);
    // Algorithm behind the hashing stuff
    const hashPassword = await bcrypt.hash(password, salt);


    const user = await User.create({
        fullName,
        email,
        password :hashPassword
    });

    res.status(201).json({
        status: 'success',
        message: 'User Registered Successfully',
        data: user
    });
});



export const loginUserCtrl = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  const userFound = await User.findOne({
    email,
  });

  if (userFound && await bcrypt.compare(password, userFound?.password)){

      res.json({
        status: "success",
        message: "User logged in Successfully",
        userFound,
        // It will generate the token based on the user ID.
        // it is hashing the ID of the user to generate the token
        token: generateToken(userFound?._id), 
      });
  } else{
    throw new Error('Invalid login credentials');
  }
});
