const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let products = [
  {
    id: 1,
    name: 'hammer'
  },
  {
    id: 2,
    name: 'cookie'
  }
];

let currentId = 2;

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/products', function(req, res) {
  res.send({products: products});
});

app.post('/products', function(req, res) {
  const productName = req.body.name;
  currentId++;
  products.push({
    id: currentId,
    name: productName,
  });
  res.send('Successfully created product.');
});

app.put('/products/:id', function(req, res) {
  const id = req.params.id;
  const newName = req.body.newName;
  let found = false;
  products.forEach(function(product, index) {
    if (!found && product.id === Number(id)) {
      product.name = newName;
    }
  });
  res.send('Successfully updated product.');

});

app.listen(PORT, function() {
  console.log('Server listening on ', PORT);
});
