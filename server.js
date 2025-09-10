const express = require('express');
const app = express();
const PORT = 3000;

let cart = [];

app.use(express.static('public'));
app.use(express.json());

app.post('/add-to-cart', (req, res) => {
  const { product } = req.body;
  if (product) {
    cart.push({ name: product, price: 10000 });
    res.json({ message: `«${product}» به سبد خرید اضافه شد.` });
  } else {
    res.status(400).json({ message: 'محصول نامعتبر است.' });
  }
});

app.post('/checkout', (req, res) => {
  if (cart.length === 0) {
    return res.json({ message: 'سبد خرید خالی است.' });
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cart = []; // سبد را بعد از پرداخت خالی می‌کنیم
  res.json({ message: `پرداخت موفق. مبلغ کل: ${total} تومان` });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
