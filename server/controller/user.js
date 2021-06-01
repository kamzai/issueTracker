import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import userDetail from '../models/user.js'

export const fetchUsers = async (req, res) => {
    try {
        
        const userList = await userDetail.find();
        res.status(201).json(userList);
        
    } catch (error) {
        res.status(404).json(error)
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {id, address, country, city, postalCode, aboutMe} = req.body
        const updatedUser = await userDetail.findOneAndUpdate({_id : id}, {$set : {address : address, country : country, city : city, postalCode: postalCode, aboutMe: aboutMe}})

        const token = jwt.sign({email: updatedUser.email, id: updatedUser._id, role: updatedUser.role, address : updatedUser.address, country : updatedUser.country, city : updatedUser.city, postalCode: updatedUser.postalCode, aboutMe: updatedUser.aboutMe }, process.env.SECRET_KEY, {expiresIn: '1h'})

        res.status(201).json({result: updatedUser, token});
        
    } catch (error) {
        res.status(404).json(error)
    }
}

export const signIn = async (req, res) => {
    try {
        
        const {email, password} = req.body
        const existingUser = await userDetail.findOne({email})

        if(!existingUser) res.status(404).json('User Not Found')

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) res.status(404).json('Wrong Password')

        const token = jwt.sign({email: existingUser.email, id: existingUser._id, role: existingUser.role}, process.env.SECRET_KEY, {expiresIn: '1h'})
        
        res.status(200).json({result: existingUser, token})


    } catch (error) {
        res.status(404).json(error)
    }
}


export const signUp = async (req, res) => {
    try {
        const {firstName, lastName, email, role, password, confirmPassword, userName} = req.body;
        
        const existingUser = await userDetail.findOne({email});

        if(existingUser) res.status(400).json('User Already Registered');

        if(password !== confirmPassword) res.status(400).json('Password Do Not Match');

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = {
            FName: firstName,
            LName: lastName,
            userName: userName,
            email: email,
            password: hashedPassword,
            role: role,
        }
        
        const result = await userDetail.create(newUser);

        const token = jwt.sign({email: result.email, role: result.role, id: result._id}, process.env.SECRET_KEY, {expiresIn: '1h'});

        res.status(200).json({result, token});

    } catch (error) {
        res.status(404).json(error)
    }
}