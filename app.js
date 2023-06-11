const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 8000;

app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'view')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    name= req.body.name
    phone= req.body.phone
    email= req.body.email
    Address = req.body.Address
    standard = req.body.standard
    let outputToWrite = `the name of the client is ${name}, phone number : , ${phone}, and his email id is : ${email}, residing at ${Address},  in class ${standard}.`
    fs.writeFileSync('output.txt', outputToWrite)
    const params = {'message': 'Your details has been submitted successfully'}
    res.status(200).render('contact.pug', params);
})

app.listen(port, ()=>{
    console.log('listening on port'  + port);
});
 