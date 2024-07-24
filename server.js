require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path=require('path');


// rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json());


// static files
app.use(express.static(path.join(__dirname,'./client/build')));
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

// routes
app.use('/api/v1/portfolio', require('./routes/portfolioRoute'));

// port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
