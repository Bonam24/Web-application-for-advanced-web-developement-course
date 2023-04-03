const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;
const jsonParser = bodyParser.json();
const fileName = 'bona1.json';

// Load data from file
let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);

app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));


app.get('/', (request, response) => {
    response.render('home');
});

// This is a RESTful GET web service(This is used to send the data to the webpage)
app.get('/bona1', (request, response) => {
    data.sort((a, b) => (a.name > b.name) ? 1 : -1 );
    response.send(data);
});

// This is a RESTful POST web service(This is usesd to add data to the jsonfile)
app.post('/bona1', jsonParser, (request, response) => {
    data.push(request.body);
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    response.end();
});

//Trying to delete data from the JSON file
app.delete('/bona1', jsonParser, (request,response) =>{
    data.pop(data);
})

app.listen(port);
console.log('server listening on port 3000');
/*
var total =0;
console.log('server listening on port 3000');
var count = Object.keys(data).length;
console.log(count);
const itemdelete = 663748
const index = data.findIndex(data => data.id ===itemdelete);
console.log(index);
data.splice(index,1);

data.forEach(element => {
    console.log(parseInt(element.id));
    total = total + parseInt(element.id);
});
console.log("The total is " + total);

*/
