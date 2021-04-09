require('dotenv').config();
const rjwt = require('restify-jwt-community');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const restify = require('restify');

const app = restify.createServer();

const MongoClient = require("mongodb").MongoClient;

const client = new MongoClient(process.env.MONGODB_URI, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  });


(async () => {

  try {
    await client.connect();
    console.log("connected to MongoDB client")
  } catch(err) {
    console.log(err)
  }

  const usersCollection = client.db(process.env.DB_NAME).collection("users");

  app.use(restify.plugins.bodyParser());

  app.post('/signup', async (req, res) => {
    let {username, password} = req.body
    let errorMessage = null;
    const errorCode = 400;

    if (username && password) {

      if(password.length < 4) {
        errorMessage = "Le mot de passe doit contenir au moins 4 caractères"
      } 

      if (username.length < 2 || username.length > 20) {
        errorMessage = "Votre identifiant doit contenir entre 2 et 20 caractères"
      }  

      if (!(/^[a-z]+$/.test(username))) {
        errorMessage = "Votre identifiant ne doit contenir que des lettres minuscules non accentuées"
      }

      const dbUsers = await usersCollection.find({username}).toArray();
      for (const dbUser of dbUsers) {
        if (dbUser.username == username) {
          errorMessage = "Cet identifiant est déjà associé à un compte"
        }
      }
      
      if (!errorMessage) {
        password = bcrypt.hashSync(password, 10); //hash le mot de passe avec l'algorithme bcrypt
        const user = {
          username: username,
          password: password
        }
        try {
          await usersCollection.insertOne(user)
          token = jwt.sign(user, process.env.JWT_KEY, {
            expiresIn: '24h'
          });
          res.json({error: errorMessage, token: token})
        } catch(err) {
          errorMessage = "Une erreur est survenue lors de la création de votre compte. Veuillez réessayer."
          res.json({error: errorMessage})
        }
      } else { //if error message
        res.json(errorCode, {error: errorMessage})
      }
    } else { //if no username or no password entered
      errorMessage = "Veuillez renseigner un nom d'utilisateur et un mot de passe."
      res.json(errorCode, {error: errorMessage})
    }
  })


  app.post('/signin', (req, res) => {
    const {username, password} = req.body
   
    usersCollection.findOne({username}, (err, user) => {
      if (err) {
        res.send({error: err})
      } else {
        if (bcrypt.compareSync(password, user.password)) { //compare le mot de passe dans le body avec le mot de passe hash de l'user stocké en BDD 
      //     if (token) {
            
      //     } else {
      //       token = jwt.sign(user, process.env.JWT_KEY, {
      //         expiresIn: '30s'
      //       });
      //     }
      //  let { iat, exp  } = jwt.decode(token);
      //  res.json({ iat, exp, token, user: user });
          res.json({user: user})
        } else {
          res.send("Mauvais mot de passe")
        }
    }
    });
  })

  app.listen(process.env.PORT, function() {
    console.log(`App listening on PORT ${process.env.PORT}`);
  });
  
})();
