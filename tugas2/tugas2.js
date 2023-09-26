import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;
const secretKey = 'fauzul';

app.use(bodyParser.json());

const users = [
  { id: 1, username: 'fauzulahmad', password: 'fauzul07' },
];

function authenticationToken(req, res, next) {
  const token = req.header('Authorization');
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) return res.sendStatus(401);

  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) return res.sendStatus(401);

    const accessToken = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '30m' });
    const refreshToken = jwt.sign({ id: user.id, username: user.username }, secretKey);

    res.json({ accessToken, refreshToken });
  });
});

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken == null) return res.sendStatus(401);

  jwt.verify(refreshToken, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '30m' });
    res.json({ accessToken });
  });
});

app.get('/protect', authenticationToken, (req, res) => {
  res.json({ message: 'Ini adalah data yang aman.' });
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
