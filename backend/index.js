const connecttoMongo=require('./Db');
var cors = require('cors')
connecttoMongo();
const express = require('express')
const fileUpload=require('express-fileupload');
const port=5000;
const app = express();
app.use(fileUpload({
  useTempFiles:true
}))
app.use(cors())
app.use(express.json());

app.use('/api/auth',require('./Routes/auth'));
app.use('/api/auth/login',require('./Routes/auth'));
app.use('/api/auth/getuser',require('./Routes/auth'));
app.use('/api/note',require('./Routes/note'));
app.use('/api/note/fetchdata',require('./Routes/note'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})