let express = require("express");
let server = express.Router();
let pictures = require("./picturesList");
let auctions = require("./settings");

server.get('/', (req, res, next) => {
    res.render('auctions', {auctions: auctions});
    next();
});

server.get('/auction/:id', (req, res, next) => {
    const id = req.params.id;
    let cur_auction;
    for (auction of auctions) {
        if (auction.id == id) {
            cur_auction = auction;
            break;
        }
    }
    res.render('auction_card', {auction: cur_auction});
});

server.post('/delete_auction/:id', (req, res, next) => {
    //delete auction -> update storage -> goto '/'
    const id = req.body.auction_id;


    for (let i = 0; i < auctions.length; ++i) {
        if (auctions[i].id == id) {
            let index = i;
            auctions.splice(index, 1);
            break;
        }
    }

    const fs = require('fs');
    fs.writeFile('auctionsList.json', JSON.stringify(auctions), (err) => {
        if (err) throw err;
        else {
            console.log('file was saved');
        }
    });

    res.redirect('/');

});

server.post('/add_auction', (req, res, next) => {
    let newId = Number(auctions[auctions.length - 1].id) + 1;
    let body = req.body;

    auctions.push({
        id: newId.toString(),
        date: body.date,
        time: body.time,
        timeout: body.timeout,
        pause: body.pause,
        interval: body.interval,
        pictures: [],
        users: []
    });
    const fs = require('fs');
    fs.writeFile('auctionsList.json', JSON.stringify(auctions), (err) => {
        if (err) throw err;
        else {
            console.log('file was saved');
        }
    });

    res.redirect('/');

});

server.post('/edit_auction/:id', (req, res, next) => {
    //edit auction -> update storage -> goto '/'
    const id = req.params.id;
    let body = req.body;
    let cur_auction;

    for (auction of auctions) {
        if (auction.id == id) {
            auction.date = body.date;
            auction.time = body.time;
            auction.timeout = body.timeout;
            auction.pause = body.pause;
            auction.interval = body.interval;
            cur_auction = auction;
            break;
        }
    }

    const fs = require('fs');
    fs.writeFile('auctionsList.json', JSON.stringify(auctions), (err) => {
    if (err) throw err;
    else {
        console.log('file was saved');
    }
    });

    res.redirect('/auction/' + id);

});

server.get('/users/:id', (req, res, next) => {
    const id = req.params.id;
    let cur_auction;

    for (let auction of auctions) {
        if (auction.id == id) {
            cur_auction = auction;
            break;
        }
    }

    res.render('users', {auction: cur_auction});
});

server.post('/add_user/:id', (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    let cur_auction;
    let user_id;
    for (let auction of auctions) {
        if (auction.id == id) {
            cur_auction = auction;
            if (auction.users.length == 0) {
                user_id = 1;
            }
            else if (auction.users.length > 0) {
                user_id = Number(auction.users[auction.users.length-1].id) + 1;
            }

            auction.users.push({
                id: user_id.toString(),
                fio: body.fio,
                money: body.money
            });
            break;
        }
    }
    const fs = require('fs');
    fs.writeFile('auctionsList.json', JSON.stringify(auctions), (err) => {
        if (err) throw err;
        else {
            console.log('file was saved');
        }
    });

    res.render('users', {auction: cur_auction});

});

server.post('/delete_user/:id', (req, res, next) => {
    const id = req.params.id;
    const user_id = req.body.user_id;

    let index;
    for (let auction of auctions) {
        if (auction.id == id) {
            for (let i = 0; i < auction.users.length; ++i) {
                if (auction.users[i].id == user_id) {
                    index = i;
                    auction.users.splice(index, 1);
                    break;
                }
            }
            break;
        }
    }

    const fs = require('fs');
    fs.writeFile('auctionsList.json', JSON.stringify(auctions), (err) => {
    if (err) throw err;
    else {
        console.log('file was saved');
    }
    });

    res.redirect('/users/' + auction.id);

});

server.get('/pictures', (req, res, next) => {
    //show pictures list
    res.render('pictures', {pictures: pictures});
});


server.post('/delete_picture/:id', (req, res, next) => {
    //delete picture -> update storage -> goto '/picture'
    let id = req.params.id;
    let body = req.body;
    let cur_picture;
    let index_in_auction;

    for (let auction of auctions) {
        if (auction.id == body.id) {
            for (let i = 0; i < auction.pictures.length; ++i) {
                if (auction.pictures[i].id == id) {
                    index_in_auction = i;
                    auction.pictures.splice(index, 1);
                    break;
                }
            }
        }
    }


    for (let picture of pictures) {
        if (picture.id == id) {
            picture.is_free="true",
            picture.auction_id="";
            break;
        }
    }


    const fs = require("fs");
    fs.writeFile('picturesList.json', JSON.stringify(pictures), (err) => {
    if (err) throw err;
    else {
        console.log('file was saved');
    }
    });
    fs.writeFile('auctionsList.json', JSON.stringify(auctions), (err) => {
    if (err) throw err;
    else {
        console.log('file was saved');
    }
    });

    res.redirect('/picture/' + req.params.id);
});


server.post('/add_picture/:id', (req, res, next) => {
    //add picture -> update storage -> goto '/picture'
    let id = req.params.id;
    let body = req.body;
    let cur_picture;

    for (let auction of auctions) {
        if (auction.id == body.auction_id){
            console.log(auction);
            for (let picture of pictures) {
                if (picture.id == id) {
                    console.log(picture);
                    picture.is_free = "false";
                    picture.auction_id = body.auction_id;
                    cur_picture = picture;
                    auction.pictures.push(cur_picture);
                    break;
                }
            }
            break;
        }
    }
    const fs = require("fs");
    fs.writeFile('picturesList.json', JSON.stringify(pictures), (err) => {
    if (err) throw err;
    else {
        console.log('file was saved');
    }
    });
    fs.writeFile('auctionsList.json', JSON.stringify(auctions), (err) => {
    if (err) throw err;
    else {
        console.log('file was saved');
    }
    });

    res.redirect('/picture/' + req.params.id);
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
    res.render('picture_card', {picture: cur_picture, auctions: auctions});
});

server.post('/edit_picture/:id', (req, res, next) => {
    console.log("entered function");
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
            console.log(cur_picture);
            break;
        }
    }
    console.log(cur_picture);

    const fs = require("fs");
    fs.writeFile('picturesList.json', JSON.stringify(pictures), (err) => {
        if (err) throw err;
        else {
            console.log('file was saved');
        }
    });
    res.redirect('/picture/' + req.params.id);
});

module.exports=server;