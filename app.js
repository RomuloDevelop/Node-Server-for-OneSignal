const express = require('express');
const morgan = require('morgan');
const clientRouter = require('./api/Routes/client.routes');

const app = express();

//Settings
app.set('port', process.env.PORT || 4001);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Routes
app.use('/api/client', clientRouter);

//Main
app.get('/',(req, res)=>{
  res.render('prueba', { title: 'Hey', message: 'Hello there!' })
}).listen(app.get('port'),()=>{
  console.log(`server running on port ${app.get('port')}`);
});