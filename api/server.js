require('dotenv').config();
const app = require('./app');

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`The app is listening at http://localhost:${port}`);
});