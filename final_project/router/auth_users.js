const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const { username, password } = req.body;

    // Check if username & password provided

    if (!username || !password) {

        return res.status(400).json({ message: "Username and password required" });

    }

    // Check if user exists

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {

        return res.status(401).json({ message: "Invalid credentials" });

    }

    // Generate JWT token

    const accessToken = jwt.sign({ username: user.username }, "fingerprint_customer", { expiresIn: '1h' });

    // Save token in session

    req.session.authorization = {

        accessToken

    };

    return res.status(200).json({ message: "User logged in successfully", token: accessToken });
});
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;

    const review = req.query.review;

    const username = req.user.username;

    if (!review) {

        return res.status(400).json({ message: "Review cannot be empty" });

    }

    // Add or update review

    if (books[isbn]) {

        books[isbn].reviews[username] = review;

        return res.status(200).json({ message: "Review added/updated successfully" });

    } else {

        return res.status(404).json({ message: "Book not found" });
    });
  return res.status(300).json({message: "Yet to be implemented"});
});
regd_users.delete("/auth/review/:isbn", (req, res) => {

    const isbn = req.params.isbn;

    const username = req.user.username;

    // Check if book exists

    if (!books[isbn]) {

        return res.status(404).json({ message: "Book not found" });

    }

    // Check if review exists for this user

    if (books[isbn].reviews[username]) {

        delete books[isbn].reviews[username];

        return res.status(200).json({ message: "Review deleted successfully" });

    } else {

        return res.status(404).json({ message: "No review found for this user" });
    });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
