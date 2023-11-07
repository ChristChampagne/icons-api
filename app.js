const express = require('express');
const app = express();
const port = 3030;
data = require('./data.json');
creativity = require('./creativity.json')
var cors = require('cors');

function RandomNumber(arr){
    result = Math.floor(Math.random() * Object.keys(arr).length)
    return result == 0 ? RandomNumber(): result;
}
app.use(cors({
    origin: '*',
    allowedHeaders: 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
}));

app.get('/v1/icons/search/all', (req, res) => {
    res.send(data)
})

app.get('/v1/icons/random', (req, res) => {
    res.send(data[RandomNumber(data)]);
})

app.get('/v1/creativity/random',(req,res)=>{
    console.log(creativity[RandomNumber(creativity)]);
    res.send(creativity[RandomNumber(creativity)])
})

app.get('/v1/icons/search/:search', (req, res) => {
    var search = req.params.search;
    console.log('Tamaño de Array:' + Object.keys(data).length);
    for (i = 1; i <= Object.keys(data).length; i++) {
        if (data[i].name == search) {
            res.send(data[i]);
        }
    }
});

app.listen(port, () => {
    console.log("Server Ready http://localhost:" + port);
})
