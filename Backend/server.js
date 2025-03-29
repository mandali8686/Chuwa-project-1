const express = require('express');
const userRouter = require('./Routes/Users');
const productRouter = require('./Routes/Products');
const orderRouter = require('./Routes/Orders');
const auth = require('./Routes/auth')

const app = express();
const port = 3000;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', auth);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
