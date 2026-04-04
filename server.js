const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { currentPage: 'home' });
});

app.get('/about', (req, res) => {
  res.render('about', { currentPage: 'about' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { currentPage: 'contact' });
});

app.get('/terms', (req, res) => {
  res.render('terms', { currentPage: 'terms' });
});

app.get('/privacy', (req, res) => {
  res.redirect('/terms');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
