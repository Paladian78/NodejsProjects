const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages')
const {userJoin,getCurrentUser,userLeave,getRoomUsers} = require('./utils/users')

const admin = 'Chat-App'
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', socket => {

    socket.on('joinRoom', ({username,room}) =>{
        const user = userJoin(socket.id,username,room)

        socket.join(user.room);

        // Welcome message
        socket.emit('message', formatMessage(admin,`Welcome to chat app ${username}!`));

        // Broadcast when a user enters the chat
        socket.broadcast.to(user.room).emit('message', formatMessage(admin,`${username} entered the chat`));

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room:user.room,
            users:getRoomUsers(user.room)
        });
    })

    // User texts in the app
    socket.on('chatMessage', (msg)=>{
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg));
    })

    // Run when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
    
        if(user){
            io.to(user.room).emit('message', formatMessage(admin,`${user.username} left the chat`));
            
            // Send room info and users list
            io.to(user.room).emit('roomUsers', {
                room:user.room,
                users:getRoomUsers(user.room)
            });

        }
    })
}); 


const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));