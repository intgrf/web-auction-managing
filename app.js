/*
    TODO:
        шаблоны разметки
        стили страниц
        обработка запросов и переходов по страницам
        https
        gul

    Нужны страницы:
        + перечень аукционов
        страница для каждого аукциона с возможностью редактирования
        + перечень картин
        страница для каждой страницы с возможностью редактирования
        страница с перечнем участников аукциона
*/

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const fs = require('fs');

const https = require('https');
const privateKey = fs.readFileSync('./sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('./sslcert/server.crt', 'utf8');

const credentials = {key: privateKey, cert: certificate};
const server = express();

const routes = require("./routes");
let auctions = require("./settings");
let pictures = require("./picturesList");


server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.static(__dirname + '/public'));

server.set("view engine", "pug");
server.set("views", './views');
server.use("/", routes);
/*
server.get('/', (req, res, next) => {
    res.render('auctions', {auctions: auctions});
    next();
});

server.get('/auction/:id', (req, res, next) => {
    
});

server.post('/delete_auction', (req, res, next) => {
    //delete auction -> update storage -> goto '/'
});

server.post('/add_auction', (req, res, next) => {
    //add auction -> update storage -> goto '/'
});

server.get('/pictures', (req, res, next) => {
    //show pictures list
    res.render('pictures', {pictures: pictures});
});

server.post('/add_picture', (req, res, next) => {
    //add picture -> update storage -> goto '/pictures'
});


server.get('/picture/:id', (req, res, next) => {
    //show picture card
    let id = req.params.id;
    let cur_picture;
    for (let picture of pictures) {
    	if (picture.id == id) {
    		cur_picture = picture;
    		break;
    	}
    }
    res.render('picture_card', {picture: cur_picture});
});

server.post('/edit_picture/:id', (req, res, next) => {
    //update some info
    let id = req.params.id;
    let body = req.body;
    let cur_picture;
    for(let picture of pictures) {
        if(picture.id == id) {
            picture.name = body.name;
            picture.author = body.author;
            picture.info = body.info;
            picture.start_price = body.start_price;
            picture.min_increment = body.min_increment;
            picture.max_increment = body.max_increment;
            cur_picture = picture;
            break;
        }
    }
    fs.writeFile('picturesList.json', JSON.stringify(pictures), (err) => {
        if (err) throw err;
        else {
            console.log('file was saved');
        }
    });
    res.redirect('/picture/' + id);
});*/

const httpsServer = https.createServer(credentials, server);
//server.listen(3000);
httpsServer.listen(8443, (err) => {
	if (err) throw err;
	else console.log('running at 8443');
});

