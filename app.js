const express = require('express');
const app = express();
app.listen(8000, () => console.log('listening at 8000'));
app.use(express.static('public'));
app.use(express.json());

app.post('/', (request, response) => {
    console.log('I got a request!');
    console.log(request.body);
    const data = request.body;
    response.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lon
    });
});