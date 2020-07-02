const express = require('express');
const app = express();
const port = 3000;
const admin = require('firebase-admin')
const serviceAccount = require("./keys/test-app-api-key.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World'));

app.post('/register', (req, res) => {
    admin.auth().createUser({
        displayName: req.body.username,
        email: req.body.email,
        emailVerified: false,
        password: req.body.password,
        disabled: false
    })
        .then(userRecord => {
            console.log(`Successfully created new user: ${userRecord.uid}`);
            res.json(userRecord)
        })
        .catch(error => {
            console.log(`Error creating new user ${error}`)
            res.status(400)
            res.json(error)
        })
});

app.post('/login', (req, res) => {
    admin.auth().get
})
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
