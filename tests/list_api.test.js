const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'asdasd',
    url: 'adasdas',
  },
  {
    title: 'dasdasca',
    url: 'asdasda',
  },
]


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('check that id field is used', async () => {
  const response = await api.get('/api/blogs')
  const contents = JSON.parse(response.text)[0]

  assert(contents.hasOwnProperty('id'))
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: '1231',
    url: 'asda',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  const titles = blogsAtEnd.map((n) => n.title)
  assert(titles.includes('async/await simplifies making async calls'))
})

test('if the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: '1231',
    url: '/3234',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('verify that if the title or url properties are missing from the request data, the backend responds to the request with the status code 400', async () => {
  const newBlog = {
    author: '1231',
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

test(' functionality for deleting a single blog post resource', async () => {
  const newBlog = {
    title: '1231',
    url: 'dasda',
  }

  const res = await api.post('/api/blogs').send(newBlog).expect(201)
  await api.delete(`/api/blogs/${res.body.id}`).expect(200)
  const result = await api.get(`/api/blogs/${res.body.id}`)
  assert.strictEqual(result.body, null)
})

test('functionality for updating the information of an individual blog post.', async () => {
  const newBlog = {
    title: '1231',
    url: 'dasda',
  }

  const moddedBlog = {
    title: 'Kalevipoeg',
    url: 'maasikas'
  }

  const res = await api.post('/api/blogs').send(newBlog).expect(201)
  await api.put(`/api/blogs/${res.body.id}`).send(moddedBlog).expect(200)
  const responseBlog = await api.get(`/api/blogs/${res.body.id}`).expect(200)
  assert.strictEqual(responseBlog.body.title, 'Kalevipoeg')
})

after(async () => {
  await mongoose.connection.close()
})

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})
