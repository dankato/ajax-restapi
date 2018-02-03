const express = require('express');
const app = express();

const products = [
  {
    id: 1,
    name: 'hammer'
  },
  {
    id: 2,
    name: 'cookie'
  }
];

const currentId = 2;

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.get('/products', function(req, res) {
  res.send({products: products});
});
app.listen(PORT, function() {
  console.log('Server listening on ', PORT);
});
