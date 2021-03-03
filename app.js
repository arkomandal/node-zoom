const express = require('express');
const app = express();
const port = 3000;
const zoom_controller = require('./controllers/zoom.controller');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.post('/authenticate', zoom_controller.user_info);
app.post('/meeting', zoom_controller.create_meeting);

app.listen(port, () => console.log("app is listening on port", port));