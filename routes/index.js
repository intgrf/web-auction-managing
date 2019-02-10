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
/*
const express = require('express');
const router = express.Router();
const auctions = require('../auctionsList');
const pictures = require('../picturesList');
//main page with list of upcoming auctions
router.get('/', (req, res, next) => {
    res.render('auctions', {auctions: auctions});
    next();
});


router.post('/delete_auction', (req, res, next) => {
    //delete auction -> update storage -> goto '/'
});

router.post('/add_auction', (req, res, next) => {
    //add auction -> update storage -> goto '/'
});

router.get('/pictures', (req, res, next) => {
    //show pictures list
    res.render('pictures', {pictures: pictures});
});

router.post('/add_picture', (req, res, next) => {
    //add picture -> update storage -> goto '/pictures'
});

router.get('/picture/:id', (req, res, next) => {
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

router.post('/pictures/:id', (req, res, next) => {
    //update some info
});

module.exports = router;
*/