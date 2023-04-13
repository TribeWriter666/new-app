const express = require("express");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

// Dummy users data
const users = [
  {
    id: 1,
    username: "user1",
    password: "$2b$10$Sd6OixR1JYtjI7fUDL0tue5fV9X.CyGc7Pt1jEw1Q7VbavCVZuODC", // 'password1' encrypted
  },
];

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = users.find((user) => user.username === username);
    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);
  })
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, username, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: "User registered successfully" });
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "your_jwt_secret",
      {
        expiresIn: "1h",
      }
    );

    res.json({ message: "User logged in", token });
  })(req, res, next);
});

app.get("/check-username-availability/:username", (req, res) => {
  const { username } = req.params;
  const available = !users.some((user) => user.username === username);
  res.json({ available });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
