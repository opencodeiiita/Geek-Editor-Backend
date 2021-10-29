# Geek Editor Backend

This repo is the backend of the geek editor project. It provides various APIs to the client.

## Tech Stack

- [NodeJs](https://nodejs.org/en/about/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/introduction)
- [Cloudinary](https://cloudinary.com/)

# Getting Started

## Set up in Your local system

1. You must have git, nodejs and mongoDB installed in your local system.
2. Run MongoDB on PORT 27017.
3. Make sure python is installed in your computer.
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
   pip install -r requirements.txt
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
| codes    | [ ObjectId ]     | false    |
| year     | Date      | false    |
| followers    | [ObjectId ]     | false    |
| following    | [ObjectId ]     | false    |

### Code Schema

| Field  | Data Type | Required |
| ------ | --------- | -------- |
| userID | ObjectId     | true     |
| code   | string    | true     |
| language | string    | true     |
| languageCode | string    | true     |

## APIs

| Routes | parameters | body | Description |
| -------- | -------- | -------- | -------- |
| `GET` user/profile/ | username | | Retrieves the data of the logged in user |
| `POST` user/register/ | | email, username, password, fname, lname | Registers a user by taking name, email, username and password as input |
| `POST` user/login/ | | email, password | Take the email and password as input and returns the token if the credentials are valid |
| `POST` user/update/ | id | | Verify and update the data of the user |
| `DELETE` user/profile/ | id | | Verify and delete the data of the user |
| `GET` user/profile/ | id | | Get user by given id |
| `PUT` user/follow/ | id | | Follow the user with the given id |
| `POST` user/forgotpassword/ | | username | For changing the user password |
| `GET` user/verifyEmail/ | username, hashid | | For verifying the email of user by taking username and hashid as input |
| `GET` user/reset/ | hashid | | Get the password reset page where we enter the password |
| `POST` user/reset/ | hashid | password | For changing the user password by taking hashid as input |
| `POST` user/sendmail/ | | link,username,message| Sending mail by controller |
| `POST` user/codes | id | | Take the user Id and returns all the codes associated with the user |
| `GET` user/languages | id | | Take the user Id and returns all the languages associated with the user |
| `GET` codeapi/ | codeId | | Getting the code by taking codeId as input |
| `POST` codeapi/submitCode | | userId, code, language, languageCode | Adding a code by taking userId as input |

### Get Method

- Home Page `("/")`
- Get Profile `("/getprofile")` Fetches the profile of a user.

### Post Method

- Register `("/register")` : Registers the user and adds the data to mongoDB.
- Login `("/login")` : logins the user after verifying username and password.

## Access Tokens
For each login, a user session is created using an access token. The access token is a JWT (JSON Web Token) with a expiration time of 2 hours. For each request to a protected route, the client-side sends an access token to verify the user identity.
## Refresh Tokens
The access tokens send to the client has an expiration of 2 hours. That means any request made by the client 2 hours after the login, will fail and user will need to re-verify his/her identity by loging in again. To prevent this we use a refresh token which is used when the access token expires.
- Refresh Token `("/refresh-token")` : Refresh the session of user by verifying the refresh token send by client and generating new sets of access and refresh tokens, and thus preventing user to loging again

> Note: The refresh token is also bounded by an expiration time of 10 days. This is comparatively very large with respect to the expiration time of the access token. If both the access and refresh tokens are expired, the user must login again.  

## Generation of Salt and Hash

A salt is generated using crypto library already present in nodejs. A Hash is generated using pbkdf2 function and passing `password`, `salt`, `10000`(iterations), `64`(no. of Characters) and `"sha521"`(a hashing function) as parameters.
This salt and hash is stored in user database as passwords

> More About [sha512](https://medium.com/@zaid960928/cryptography-explaining-sha-512-ad896365a0c1)
> More about [pbkdf2](https://www.geeksforgeeks.org/node-js-crypto-pbkdf2-method/)

## Verify Password

Salt, hash, and password are passed as parameters in `verifypassword()`. A hash is generated using password and salt and is matched with the hash already present in the database. If they are same, user is authenticated.

## Authentication
When a user is logged in or registered a 256 byte token is sent to access any methods in the api the token has to be sent in the x-access-headers while sending the request

## Claim an Issue
Comment on the issue. In case of no activity on the issue even after 2 days, the issue will be reassigned. If you have difficulty approaching the issue, feel free to ask on our slack channel.

## Communication
If you have any queries or suggestions, please use the discord channel of **Geek Editor FrontEnd**.

## Guidelines
Please help us follow the best practice to make it easy for the reviewer as well as the contributor. We want to focus on the code quality more than on managing pull request ethics.
1. People before code: If any of the following rules are violated, the pull-requests must not be rejected. This is to create an easy and joyful onboarding process for new programmers and first-time contributors.
2. Single commit per pull request and name the commit as something meaningful, example: Adding <-your-name-> in students/mentors section.
3. Reference the issue numbers in the commit message if it resolves an open issue. Follow the pattern Fixes #
4. Make a note to add relevent Screen Shots when you make a PR.
5. Pull Request older than 3 days with no response from the contributor shall be marked closed.
6. Do not make PR which is not related to any issues. 
7. You can create an issue but you can only solve that particular issue if we approve it.
8. Avoid duplicate PRs, if need be comment on the older PR with the PR number of the follow-up (new PR) and close the obsolete PR yourself.
9. Be polite: Be polite to other community members.
10. PR template should be strictly followed, else the points won’t be reflected on the leaderboard.

*happy coding.*
