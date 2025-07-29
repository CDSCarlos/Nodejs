const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const usersRoutes = require('./src/routes/users');
app.use('/users', usersRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
