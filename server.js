const express = require('express');
const socket = require('socket.io');

const app = express();
const path = require('path');

const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, '/client/')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    
    socket.on('join', (userName) => {
        const user = { name: userName, id: socket.id };
        users.push(user);
        console.log('User ' + userName + ' with id ' + socket.id + ' logged in');
        console.log('Current users:', users);

        const message = `<i>${userName} has joined the conversation!`;
        const botMessage = { author: 'Chat Bot', content: message, style: 'italic' };
        socket.broadcast.emit('message', botMessage);

        console.log('New user:', user);
    });

    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', () => {
        const disconnectedUser = users.find((user) => user.id === socket.id);
        if (disconnectedUser) {
            const index = users.indexOf(disconnectedUser);
            users.splice(index, 1);
            console.log('User ' + disconnectedUser.name + ' with id ' + socket.id + ' disconnected');
            console.log('Current users:', users);

            const message = `<i>${disconnectedUser.name} has left the conversation... :(`;
            const botMessage = { author: 'Chat Bot', content: message, style: 'italic' };
            socket.broadcast.emit('message', botMessage);
        }
    });
});
  