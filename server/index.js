const express = require('express');
const path = require('path');

const app = express();


const publicPath = path.join(__dirname, '..', 'client');
app.use(express.static(publicPath, { index: 'index.html' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});