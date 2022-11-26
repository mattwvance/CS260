const express = require('express');
const bodyParser = require("body-parser");
const fetch = require('node-fetch');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('./passport');
const user = require('./routes/user');
const options = {method: 'GET', headers: {accept: 'application/json'}};
const app = express();
const PORT = 3001;
// connect to the database
const clientPromise = mongoose.connect('mongodb://localhost:27017/user-database', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(m => {
    m.connection.getClient();
    console.log('Connected to Mongo in server.js');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static('public'));

app.use(session({
    secret: 'fraggle-rock',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/user-database',
        clientPromise: clientPromise,
        dbName: 'user-database',
        stringify: false,
        autoRemove: 'interval',
        autoRemoveInterval: 1
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/user/', user);

var userGames = [];

const dealSchema = new mongoose.Schema({
    username: { type: String, unique: true }, // Connected to the user database
    games: [{
        internalName: String, //"DEUSEXHUMANREVOLUTIONDIRECTORSCUT",
        title: String, //"Deus Ex: Human Revolution - Director's Cut",
        metacriticLink: String, //"/game/pc/deus-ex-human-revolution---directors-cut",
        dealID: String, //"HhzMJAgQYGZ%2B%2BFPpBG%2BRFcuUQZJO3KXvlnyYYGwGUfU%3D",
        storeID: String, //"1",
        gameID: String, //"102249",
        salePrice: String, //"2.99",
        normalPrice: String, //"19.99",
        isOnSale: String, //"1",
        savings: String, //"85.042521",
        metacriticScore: String, //"91",
        steamRatingText: String, //"Very Positive",
        steamRatingPercent: String, //"92",
        steamRatingCount: String, //"17993",
        steamAppID: String, //"238010",
        releaseDate: Number, //1382400000,
        lastChange: Number, //1621536418,
        dealRating: Number, //"9.6",
        thumb: String // "https://cdn.cloudflare.steamstatic.com/steam/apps/238010/capsule_sm_120.jpg?t=1619788192"
    }]
});

dealSchema.set('toJSON', {
  virtuals: true
});

const Deal = mongoose.model('Deal', dealSchema);

// MongoDB queries

app.post('/game/', async(req, res) => {
    const userReq = req.user.username;
    const game = JSON.parse(req.body.game);
    try {
        const deal = await Deal.findOne({username: userReq});
        if (deal !== null) { 
            userGames = deal?.games;
            if (!userGames.find(g => g.dealID === game.dealID)) {
                userGames.push(game);
            }
        } else {
            userGames = [game];
        }
        try {
            if (deal) {
                deal.overwrite({ username: userReq, games: userGames });
                await deal.save();
            } else {
                const dbModel = new Deal({
                    username: userReq,
                    games: userGames
                });
                await dbModel.save();
            }
        } catch (error) {
            console.log('error saving game', error);
        }
    } catch(err) {
        console.log(err);
    }
});

app.get('/game/', async(req, res) => {
    try {
        const userReq = req.user.username;
        const deal = await Deal.findOne({username: userReq});
        userGames = deal.games;
        res.status(200).send(deal.games);
    } catch(error) {
        console.log('error getting games ', error);
    }
});

app.delete('/game/', async(req, res) => {
    const game = req.body.game;
    const userReq = req.user.username;
    try {
        const deal = await Deal.findOne({username:userReq});
        userGames = deal.games;
        userGames = userGames.filter(g => g.dealID !== game.dealID);
        deal.overwrite({username: userReq, games: userGames});
        deal.save();
        res.status(200).send(userGames);
    } catch(error) {
        console.log('error deleting games ', error);
    }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));