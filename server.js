const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        const messageObject = {
            username: socket.username,
            message: msg,
            timestamp: new Date().toLocaleTimeString()
        };
        io.emit('chat message', messageObject);
    });

    socket.on('set username', (username) => {
        socket.username = username;
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 5010;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});