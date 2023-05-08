const client = require('./lib/mongo.js');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const database = 'sponsormatch';
const database_name = client.db(database)

const jwt = require('jsonwebtoken')
const jwt_expiration = 86400000
const jwtsalt = 'privatekey'

const salt = '$2b$10$Imnq7Q2r0RS7DqaKV0rpPe'

const bodyParser = require('body-parser');

const { ObjectId } = require('mongodb');

app.use(bodyParser.json())
app.use(cookieParser())

async function AUTH(req, res, coll) {
	try {
		if (coll == 'signup') {
			app.post('/api/auth/signup', async (req, res) => {
				console.log(req.body)
				const result = await database_name.collection(coll).find({ email: req.body.email }, { email: 1 }).toArray()
				if (result.length > 0) {
					res.status(406).json({ message: 'User already exists' })
				} else {
					req.body.password = await bcrypt.hash(req.body.password, salt).replace(`${salt}.`, '')
					await database_name.collection(coll).insertOne(req.body)
					res.status(201).json({ message: 'User created' })
				}
			})
		} else {
			app.post('/api/auth/signin', async (req, res) => {
				const result = await database_name.collection(coll).find({ email: req.body.email }, { _id: 1, email: 1, password: 1 }).toArray()
				console.log(result)
				if (result.length == 0) {
					res.status(406).json({ message: 'User is not registered' })
				} else {
					const isPasswordMatched = await bcrypt.compare(req.body.password, result[0].password.replace(`${salt}.`, ''))
					if (!isPasswordMatched) {
						res.status(406).json({ message: 'Wrong password' })
					} else {
						const userId = result[0]._id.toString().replace('New ObjectId("', '').replace('")', '')
						console.log(userId)
						const token = jwt.sign({ id: userId }, jwtsalt, { expiresIn: jwt_expiration })
						await database_name.collection(coll).updateOne({ _id: ObjectId(userId) }, { $set: { jwt: token } })
						res.status(200).setHeader('Authorization', `Bearer ${token}`).json({ message: 'User authenticated' })
					}
				}
			})
		}
	} catch (err) {
		res.status(500).json({ error: "Error authenticating user" });
	}
}
