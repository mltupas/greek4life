// Node.js + Express server backend for ElderCare
//
// Prerequisites - first run:
//   npm install
//
// which will look in package.json and install all dependencies
// (e.g., express)
//
// To start the server, run:
//   node server.js
//
// and open the frontend webpage at http://localhost:3000/index.html

const express = require('express');
const app = express();

// put all of your static files (e.g., HTML, CSS, JS, JPG) in the static_files/
// sub-directory, and the server will serve them from there. e.g.,:
//
// http://localhost:3000/petsapp.html
// http://localhost:3000/cat.jpg
//
// will send the file static_files/cat.jpg to the user's web browser
//
// Learn more: http://expressjs.com/en/starter/static-files.html
app.use(express.static('static_files'));


// simulates a database in memory, to make this example simple and
// self-contained (so that you don't need to set up a separate database).
// note that a real database will save its data to the hard drive so
// that they become persistent, but this fake database will be reset when
// this script restarts. however, as long as the script is running, this
// database can be modified at will.
const company_1 = {
  'Name': 'Company 1',
  'address': '123 Test St',
  'point of contact': 'Jane Doe',
  'phone': '123-456-7890',
  'email': 'cogs121project.sp19@gmail.com',
  'hours': '8:00-5:00 M-F',
  'website': 'www.google.com',
  'additional notes': 'greek4life'
}

const company_2 = {
  'Name': 'Company 2',
  'address': '123 Test St',
  'point of contact': 'Jane Doe',
  'phone': '123-456-7890',
  'email': 'cogs121project.sp19@gmail.com',
  'hours': '8:00-5:00 M-F',
  'website': 'www.google.com',
  'additional notes': 'greek4life'
}

const company_3 = {
  'name': 'Company 3',
  'address': '123 Test St',
  'point of contact': 'Jane Doe',
  'phone': '123-456-7890',
  'email': 'cogs121project.sp19@gmail.com',
  'hours': '8:00-5:00 M-F',
  'website': 'www.google.com',
  'additional notes': 'greek4life'
}

const company_4 = {
  'name': 'Company 4',
  'address': '123 Test St',
  'point of contact': 'Jane Doe',
  'phone': '123-456-7890',
  'email': 'cogs121project.sp19@gmail.com',
  'hours': '8:00-5:00 M-F',
  'website': 'www.google.com',
  'additional notes': 'greek4life'
}

const company_5 = {
  'name': 'Company 5',
  'address': '123 Test St',
  'point of contact': 'Jane Doe',
  'phone': '123-456-7890',
  'email': 'cogs121project.sp19@gmail.com',
  'hours': '8:00-5:00 M-F',
  'website': 'www.google.com',
  'additional notes': 'greek4life'
}

const company_6 = {
  'name': 'Company 6',
  'address': '123 Test St',
  'point of contact': 'Jane Doe',
  'phone': '123-456-7890',
  'email': 'cogs121project.sp19@gmail.com',
  'hours': '8:00-5:00 M-F',
  'website': 'www.google.com',
  'additional notes': 'greek4life'
}

const company_7 = {
  'name': 'Company 7',
  'address': '123 Test St',
  'point of contact': 'Jane Doe',
  'phone': '123-456-7890',
  'email': 'cogs121project.sp19@gmail.com',
  'hours': '8:00-5:00 M-F',
  'website': 'www.google.com',
  'additional notes': 'greek4life'
}

const company_8 = {
  'name': 'Company 8',
  'address': '123 Test St',
  'point of contact': 'Jane Doe',
  'phone': '123-456-7890',
  'email': 'cogs121project.sp19@gmail.com',
  'hours': '8:00-5:00 M-F',
  'website': 'www.google.com',
  'additional notes': 'greek4life'
}

const company_9 = {
  'name': 'Company 9',
  'address': '123 Test St',
  'point of contact': 'Jane Doe',
  'phone': '123-456-7890',
  'email': 'cogs121project.sp19@gmail.com',
  'hours': '8:00-5:00 M-F',
  'website': 'www.google.com',
  'additional notes': 'greek4life'
}

const company_10 = {
  'name': 'Company 10',
  'address': '123 Test St',
  'point of contact': 'Jane Doe',
  'phone': '123-456-7890',
  'email': 'cogs121project.sp19@gmail.com',
  'hours': '8:00-5:00 M-F',
  'website': 'www.google.com',
  'additional notes': 'greek4life'
}

const company_11 = {
  'name': 'Company 11',
  'address': '123 Test St',
  'point of contact': 'Jane Doe',
  'phone': '123-456-7890',
  'email': 'cogs121project.sp19@gmail.com',
  'hours': '8:00-5:00 M-F',
  'website': 'www.google.com',
  'additional notes': 'greek4life'
}

const company_12 = {
  'name': 'Company 12',
  'address': '123 Test St',
  'point of contact': 'Jane Doe',
  'phone': '123-456-7890',
  'email': 'cogs121project.sp19@gmail.com',
  'hours': '8:00-5:00 M-F',
  'website': 'www.google.com',
  'additional notes': 'greek4life'
}

const company_13 = {
  'name': 'Company 13',
  'address': '123 Test St',
  'point of contact': 'Jane Doe',
  'phone': '123-456-7890',
  'email': 'cogs121project.sp19@gmail.com',
  'hours': '8:00-5:00 M-F',
  'website': 'www.google.com',
  'additional notes': 'greek4life'
}

const company_14 = {
  'name': 'Company 14',
  'address': '123 Test St',
  'point of contact': 'Jane Doe',
  'phone': '123-456-7890',
  'email': 'cogs121project.sp19@gmail.com',
  'hours': '8:00-5:00 M-F',
  'website': 'www.google.com',
  'additional notes': 'greek4life'
}

const fakeDatabase = {
  'AAA Coverage': {list_of_agencies: [company_1, company_2]},
  'Information & Assistance': {list_of_agencies: [company_3, company_4]},
  'Elder Abuse Prevention': {list_of_agencies: [company_5, company_6]},
  'Legal Services': {list_of_agencies: [company_7, company_8]},
  'Long-term Care Ombudsman': {list_of_agencies: [company_9, company_10]},
  'Aging and Disability Resource Centers': {list_of_agencies: [company_11, company_12]},
  'Health Insurance Counseling': {list_of_agencies: [company_13, company_14]}
};

// To learn more about server routing:
// Express - Hello world: http://expressjs.com/en/starter/hello-world.html
// Express - basic routing: http://expressjs.com/en/starter/basic-routing.html
// Express - routing: https://expressjs.com/en/guide/routing.html


// GET a list of all usernames
//
// To test, open this URL in your browser:
//   http://localhost:3000/users
app.get('/users', (req, res) => {
  const allUsernames = Object.keys(fakeDatabase); // returns a list of object keys
  console.log('allUsernames is:', allUsernames);
  res.send(allUsernames);
});


// GET profile data for a user
//
// To test, open these URLs in your browser:
//   http://localhost:3000/users/Philip
//   http://localhost:3000/users/Carol
//   http://localhost:3000/users/invalidusername

// TODO: change userid to agencyid
app.get('/users/:userid', (req, res) => {
  const nameToLookup = req.params.userid; // matches ':userid' above
  const val = fakeDatabase[nameToLookup];
  console.log(nameToLookup, '->', val); // for debugging
  if (val) {
    res.send(val);
  } else {
    res.send({}); // failed, so return an empty object instead of undefined
  }
});

// start the server at URL: http://localhost:3000/
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});
