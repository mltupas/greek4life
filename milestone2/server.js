const express = require('express');
const app = express();
const port = 3000;

//use special string called static_files to denote sub-dir
//if incoming web requests asks for any file present in static_files, fetch file
app.use(express.static('static_files'));

const fakeDatabase = {
    'San Diego': {name: 'Gucci Mane', genre: 'trap'},
};

//List of all items in database
app.get('/items', (req, res) => {
    const allItems = Object.keys(fakeDatabase);
    console.log('allItems is: ' + allItems);
    res.send(allItems);
});

//Get data on an item
app.get('/items/:itemid', (req, res) => {
    const itemToLookup = req.params.itemid; //matches itemid above
    const val = fakeDatabase[itemToLookup];
    console.log(itemToLookup, '->', val); //debugging
    if (val) {
        res.send(val);
    } else {
        res.send({}); //failed, returning empty object
    }
});

app.listen(port, () => {
    console.log('Server started at ' + port);
});