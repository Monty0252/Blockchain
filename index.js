// Handling GET request
var express = require('express');
var app = express();
app.use(express.static('app'));
app.get('/', (req, res) => {
    res.render('index.html')
})
 
// Port Number
const PORT = process.env.PORT ||8080;
 
// Server Setup
app.listen(PORT,console.log(
  `Server started on port ${PORT}`));