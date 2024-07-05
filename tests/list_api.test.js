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
    title: 'amet nisi at',
    url: 'https://imaginary-hydraulics.info',
  },
  {
    title: 'aliquam ipsam sint',
    url: 'http://overcooked-gambling.com',
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
    title: 'ut qui sed',
    author: 'Naomi Harris',
    url: 'https://forked-alpenglow.biz',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  const titles = blogsAtEnd.map((n) => n.title)
  assert(titles.includes('ut qui sed'))
})

test('if the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = {
    title: 'provident ratione reprehenderit',
    author: 'Mr. Andrea Champlin',
    url: 'http://brave-prizefight.name',
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
    author: 'Damon Carter',
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

test(' functionality for deleting a single blog post resource', async () => {
  const newBlog = {
    title: 'voluptas et aut',
    url: 'https://high-level-dancer.name',
  }

  const res = await api.post('/api/blogs').send(newBlog).expect(201)
  await api.delete(`/api/blogs/${res.body.id}`).expect(200)
  const result = await api.get(`/api/blogs/${res.body.id}`)
  assert.strictEqual(result.body, null)
})

test('functionality for updating the information of an individual blog post.', async () => {
  const newBlog = {
    title: 'aut quis vel',
    url: 'https://definite-feng.com',
  }

  const moddedBlog = {
    title: 'enim omnis officia',
    url: 'https://outlandish-trustee.org'
  }

  const res = await api.post('/api/blogs').send(newBlog).expect(201)
  await api.put(`/api/blogs/${res.body.id}`).send(moddedBlog).expect(200)
  const responseBlog = await api.get(`/api/blogs/${res.body.id}`).expect(200)
  assert.strictEqual(responseBlog.body.title, 'enim omnis officia')
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
