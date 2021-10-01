# Geek Editor Backend

This repo is the backend of the geek editor project. It provides various APIs to the client.

## Tech Stack

- [NodeJs](https://nodejs.org/en/about/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Passport](http://www.passportjs.org/)
- [Cloudinary](https://cloudinary.com/)

# Getting Started

## Set up in Your local system

1. You must have git, nodejs and mongoDB installed in your local system.
2. Run MongoDB on PORT 27017.
   ```sh
   mongod
   ```
3. Fork this repo and then clone the forked repo.
   ```sh
   git clone 'YOUR REPO LINK'
   ```
4. install dependencies and run the server
   ```sh
   npm install
   node app.js
   ```
   This will make the server run at `http://localhost:8000/`

## Database Schema

### User Schema

| Field    | Data Type | Required |
| -------- | --------- | -------- |
| fname    | String    | true     |
| lname    | String    | true     |
| username | String    | true     |
| email    | String    | true     |
| hash     | String    | true     |
| salt     | String    | true     |
| Codes    | Array     | false    |

### Code Schema

| Field  | Data Type | Required |
| ------ | --------- | -------- |
| userID | string    | true     |
| code   | string    | true     |

## APIs

### Get Method

- Home Page `("/")`
- Get Profile `("/getprofile")` Fetches the profile of a user.

### Post Method

- Register `("/register")` : Registers the user and adds the data to mongoDB.
- Login `("/login")` : logins the user after verifying username and password.

## Generation of Salt and Hash

A salt is generated using crypto library already present in nodejs. A Hash is generated using pbkdf2 function and passing `password`, `salt`, `10000`(iterations), `64`(no. of Characters) and `"sha521"`(a hashing function) as parameters.
This salt and hash is stored in user database as passwords

> More About [sha512](https://medium.com/@zaid960928/cryptography-explaining-sha-512-ad896365a0c1)
> More about [pbkdf2](https://www.geeksforgeeks.org/node-js-crypto-pbkdf2-method/)

## Verify Password

Salt, hash, and password are passed as parameters in `verifypassword()`. A hash is generated using password and salt and is matched with the hash already present in the database. If they are same, user is authenticated.
