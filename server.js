const express = require('express');


const app = express();
const PORT = process.env.PORT || 3001;


app.get('/helloworld', (req, res) => {
    res.send("Hello World")
});


app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
  });
