const express = require('express');
const app = express()
const conn = require('./db');
const cors = require('cors')

conn.connection.on('connected', (err) => {
    if (err) {
        console.log('did not connected database')
    } else {
        console.log('database is connected')
    }
})

app.use(cors());
app.use(express.json())
app.use('/user', require('./routes/userRoutes'));
app.use('/group', require('./routes/createGroup'));
app.use('/Expance', require('./routes/expance'))


app.listen(5000, () => {
    console.log('server is listen')
})



