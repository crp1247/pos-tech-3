require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

const User = require('./models/User');

const cors = require('cors');

app.use(cors()); // Permite requisições de qualquer origem


app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).json({msg:'Bem vindo a nossa API'})
})

//register user 

    app.post('/auth/register', async (req, res) => {
        const {name, email, password, confirmPassword} = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(422).json({msg: 'Preencha todos os campos'});
        }if (password !== confirmPassword) {
            return res.status(422).json({msg: 'Senhas não conferem'});
        }
        const userExists = await User.findOne({email: email });
        if (userExists) {
            return res.status(422).json({msg: 'por favor, insira um email diferente'});
        }
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        
        const user = new User({
            name,
            email,
            password:passwordHash,
        });
      try {
       
        await user.save();
        res.status(201).json({msg: 'Usuário registrado com sucesso'});

      }catch (error) {
            console.log(error)
          res.status(500).json({msg: 'Erro ao salvar o usuário',

          });
      }
    })
    app.post('/auth/login', async (req, res) => {
        const {email, password} = req.body;
        if (!email) {
            return res.status(422).json({msg: 'o email é obrigatório'});
        }    if (!password) {
            return res.status(422).json({msg: 'a senha é obrigatória'});
        }
         const user = await User.findOne({email: email });
        if (!user) {
            return res.status(404).json({msg: 'usuario não encontrado'});
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(422).json({msg: 'senha incorreta'});
        }
        try{
            const secret = process.env.secret;
            const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
        )
        res.status(200).json({msg: 'autenticacao realizada com sucesso', token});
        }catch (error) {
            console.log(error)
            res.status(500).json({msg: 'aconteceu um erro no servidor, tente novamente mais tarde'});
        }
    });
    const dbUser = process.env.DB_USER;
    const dbPassWord = process.env.DB_PASS;



mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPassWord}@cluster0.aozal.mongodb.net/fiap`)
    .then(() => {
        app.listen(3001);
        console.log('Conectado ao banco de dados');
    })
    .catch((err) => console.log(err));
