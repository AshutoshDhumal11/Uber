const http = require('http');
const app = require('./app');

const express = require('express');
// const path = require('path');

const { initializeSocket } = require('./socket')
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

initializeSocket(server);


// // ----------- Deployment ----------

// const __dirname1 = path.resolve();

// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname1, "../Frontend/dist")));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname1, "../Frontend", "dist", "index.html"))
//     })
// } else {
//     app.get('/', (req, res) => {
//         res.send('API is running successfully.')
//     })
// }

// // ----------- Deployment ----------

server.listen(PORT, () => {
    console.log(`Server is running on port no ${PORT}`);
})