const User = require('../models/usuarios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const findUsuarios = async (req, res) => {
    try {
        const usuarios = await User.find();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al obtener los usuarios'});
    }
}


const createUsuario = async (req, res) => {
    try {
        const {nombre, apellido, email, password, rol} = req.body;

        const hasedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({nombre, apellido, email, password: hasedPassword, rol});
        await newUser.save();

        res.status(201).json({message: 'Usuario creado con éxito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al crear el usuario'});
    }
}


const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email });
        if (!user) throw new Error('Usuario no encontrado');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error('Contraseña incorrecta');

        const token = jwt.sign ({
            id: user._id,
            email: user.email,
            rol: user.rol
        }, JWT_SECRET, {expiresIn: '1y'});

        res.status(200).json({
            token,
            _id:user._id,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            rol: user.rol
        });
        

     } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al iniciar sesión'});
    }
}


module.exports = {
    createUsuario,
    findUsuarios,
    login
};