const connectToMongo = require('./DbConnectivity/Db');
const express = require('express');
const cors = require('cors')
const app = express();
connectToMongo();

app.use(cors())
const port = 5000;
app.use(express.json()); // middleware for use of json

//Available  Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});