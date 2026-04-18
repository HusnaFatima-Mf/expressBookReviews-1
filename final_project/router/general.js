const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body;

    // Check if username & password are provided

    if (!username || !password) {

        return res.status(400).json({ message: "Username and password required" });

    }

    // Check if user already exists

    let userExists = users.find(user => user.username === username);

    if (userExists) {

        return res.status(409).json({ message: "User already exists" });

    }

    // Add new user

    users.push({ username, password });

    return res.status(200).json({ message: "User registered successfully" });
});
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
const axios = require('axios');
public_users.get('/',function (req, res) {
  //Write your code here
 try {

        const response = await axios.get('http://localhost:5000/');

        return res.status(200).json(response.data);

    } catch (error) {

        return res.status(500).json({ message: "Error fetching books" });

    }

}); 
 return res.status(200).json(JSON.stringify(books));
});
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

    try {

        const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);

        return res.status(200).json(response.data);

    } catch (error) {

        return res.status(404).json({ message: "Book not found" });

    }

});
  const isbn = req.params.isbn;

    const book = books[isbn];

    if (book) {

        return res.status(200).json(JSON.stringify(book));

    } else {

        return res.status(404).json({ message: "Book not found" });

    }

});
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
    const author = req.params.author;

    let result = [];

    for (let key in books) {

        if (books[key].author === author) {

            result.push(books[key]);

        }

    }

    if (result.length > 0) {

        return res.status(200).json(JSON.stringify(result));

    } else {

        return res.status(404).json({ message: "No books found for this author" });
    }
});
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;

    let result = [];

    for (let key in books) {

        if (books[key].title === title) {

            result.push(books[key]);

        }

    }

    if (result.length > 0) {

        return res.status(200).json(JSON.stringify(result));

    } else {

        return res.status(404).json({ message: "No books found with this title" });

    }

}); 
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
    const isbn = req.params.isbn;

    const book = books[isbn];

    if (book) {

        return res.status(200).json(JSON.stringify(book.reviews));

    } else {

        return res.status(404).json({ message: "Book not found" });

    }

});
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
