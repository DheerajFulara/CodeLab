require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');

const authRoutes = require('./routes/register');
const sessionRoutes = require('./routes/sessionRoutes');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`✅ User joined room: ${room}`);
    socket.to(room).emit('userJoined', socket.id);
  });

  socket.on('codeChange', ({ room, code }) => {
    socket.to(room).emit('codeUpdate', code);
  });

  socket.on('chatMessage', ({ room, message }) => {
    socket.to(room).emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on PORT ${PORT}`);
});
