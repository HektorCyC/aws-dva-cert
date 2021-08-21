import express from 'express';
import path from 'path';
import axios from 'axios';

// Env variables
const port = process.env.SERVER_PORT;
const apiBase = process.env.API_BASE;

const app = express();

app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const documents = await getDocuments();
    res.render('index', {
        documents: documents
    });
});

app.listen(port, () => {
    console.log('Document server started on port: ', port);
});

const getDocuments = async () => {
    const { data: results } = await axios.get(`${apiBase}getDocuments`)
    return results;
}