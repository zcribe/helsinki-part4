const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const User = require('../models/user')

const initialUsers = [
  {
    username: 'Cheyanne.Schumm',
    password: '1IPhglvka7rLMqQ7',
    name:'Benny Daniel'
  },
  {
    username: 'Rocky.Jones',
    password: 'FmYOB991GTS7BzX',
    name:'Alicia Von'
  }
]

test('ensure no username user cant be created', async () => {

  const faultyUser = {
    username: '',
    password: '123124'
  }
  
  await api
    .post('/api/users')
    .send(faultyUser)
    .expect(400)
})

test('passwordless user cant be created', async () => {

  const faultyUser = {
    username: '1221312',
    password: ''
  }
  
  await api
    .post('/api/users')
    .send(faultyUser)
    .expect(400)
})

test('invalid short usernames cant be created', async () => {

  const faultyUser = {
    username: '12',
    password: '123124'
  }

  await api
    .post('/api/users')
    .send(faultyUser)
    .expect(400)
})


test('invalid add user operation returns a suitable status code and error message', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})

beforeEach(async () => {
  await User.deleteMany({})
  let newUser = new User(initialUsers[0])
  await newUser.save()
  newUser = new User(initialUsers[1])
  await newUser.save()
})
