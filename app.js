const express = require('express');
const app = express();
const cors = require('cors');
const { connect } = require('./lib/mongo.js');
const cookieParser = require('cookie-parser');

// Import routes
const authRoutes = require('./routes/api/auth.js');
const userRoutes = require('./routes/api/users.js');
const blogRoutes = require('./routes/api/blogs.js');
const commentRoutes = require('./routes/api/comments.js');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/public', express.static('public'));
app.use('/assets', express.static('assets'));

// app.get('/api/user', (req, res) => {
//   const token = req.cookies['token'];
//   console.log('Token:', token);
// });
const port = 8080;
app.listen(port, () => {
  console.log('Server started on port', port);
});

connect();

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);

