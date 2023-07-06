import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const quote = {
    content: String,
    author: String
}
// create a schema for the database model of quotes using Mongoose module and export it as Qoute
const Quote = mongoose.model('Quote', quote);

const BASE_URL = 'https://api.quotable.io/random';

app.get('/', async (req, res) => {
    const response = await axios.get(BASE_URL);
    // console.log(response);
     res.json(response.data);
});

app.post('/saveQoute', (req, res) => {
    const newQoute = new Quote({
        content: req.body.content,
        author: req.body.author
    });
    newQoute.save();
});

app.get('/favorite', async (req, res) => {
    const foundQoute = await Quote.find({});
    res.send(foundQoute);
});

app.listen(process.env.PORT||5000, async () => {
    console.log('Server started at port 5000');
    await mongoose.connect("mongodb://127.0.0.1:27017/qouteDB",{ useNewUrlParser: true });
    console.log('Database connected!!');
});
