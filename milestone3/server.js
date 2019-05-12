const express = require('express');
const app = express();
const port = 3000;

//use special string called static_files to denote sub-dir
//if incoming web requests asks for any file present in static_files, fetch file
app.use(express.static('static_files'));

//const fakeDatabase = {
//    'La Jolla': {name: 'Gucci Mane', genre: 'Trap', song: 'Wake Up in the Sky', albumCover: 'guccimane.jpg'},
//    'Los Angeles': {name: 'Childish Gambino', genre: 'Trap', song: 'Feels Like Summer', albumCover: 'childishgambino.jpg'},
//    'Irvine': {name: 'Bryan Kearney', genre: 'Electronic', song: 'All Over Again', albumCover: 'bryankearney.jpg'},
//    'Riverside': {name: 'Da Tweekaz', genre: 'Electronic', song: 'Tequila', albumCover: 'datweekaz.jpg'},
//    'Fresno': {name: 'Keith Urban', genre: 'Country', song: 'Somebody Like You', albumCover: 'keithurban.jpg'},
//    'San Diego': {name: 'Billy Ray Cyrus', genre: 'Country', song: 'Achy Breaky Heart', albumCover: 'billyraycyrus.jpg'}
//};

//List of all items in database
//app.get('/locations', (req, res) => {
//    const allItems = Object.keys(fakeDatabase);
//    console.log('allItems is: ' + allItems);
//    res.send(allItems);
//});

//Get data on an item
//app.get('/location/:itemid', (req, res) => {
//    const itemToLookup = req.params.itemid; //matches itemid above
//    const val = fakeDatabase[itemToLookup];
//    console.log(itemToLookup, '->', val); //debugging
//    if (val) {
//        res.send(val);
//    } else {
//        res.send({}); //failed, returning empty object
//    }
//});

app.listen(port, () => {
    console.log('Server started at ' + port);
});
