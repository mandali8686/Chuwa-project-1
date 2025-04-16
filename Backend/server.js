const express = require('express');
const userRouter = require('./Routes/Users');
const productRouter = require('./Routes/Products');
const orderRouter = require('./Routes/Orders');
const cartRouter = require('./Routes/Carts')
const auth = require('./Routes/auth');

const cors = require('cors');

const app = express();
const port = 5400;


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', auth);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/carts', cartRouter)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
