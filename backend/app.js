const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('products', (req,res) => {
    const products = [
        {
        id: 1, 
        name: 'Prashant',
    },
    {
        id: 2, 
        name: 'Prashant',
    }]
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(products));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})