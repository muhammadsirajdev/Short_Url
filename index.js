const express = require('express');
const mongoose = require('mongoose');

const urlRoutes = require('./routes/url');
//const { handlegenerateShortUrl, handleRedirect } = require('./controllers/url');
const connectDB=require('./connect');

connectDB('mongodb://localhost:27017/shorturl').then(
    () => {
        console.log('Connected to MongoDB');
    }
).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
}
)
const app = express();
app.use(express.json());

const port = 3000;

// POST route for creating short URLs
app.use('/url', urlRoutes);

// GET route for redirecting
app.use('/:shortId', urlRoutes);

// Mount all URL routes
app.use("/", urlRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    }
);
