const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_hepler')
const logger = require('../utils/logger')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/Blog')

describe('when there are some blogs saved initially', () => {
  beforeEach( async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })  

  test('the unique identifier property of the blog is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    assert("id" in blogs[0])
  })

  describe('addition of a new blog', () => {
    test('succeeds with valid data ', async () => {
      const newBlog = {
        title: 'test',
        author: 'abc',
        url: 'https',
        likes: 4
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogs = await helper.blogsInDb()
      assert.strictEqual(blogs.length, helper.initialBlogs.length + 1)
    })    

    test('succeeds with missing like', async () => {
      const newBlog = {
        title: 'test',
        author: 'abc',
        url: 'https'  
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const blogs = await helper.blogsInDb()
      const savedBlog = blogs.find(blog => blog.title === 'test')
      assert.strictEqual(savedBlog.likes, 0)
    })
    
    test('fails with status code 400 if title invalid', async () => {
      const newBlog = {
        author: 'abc',
        url:'https'
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
      
      const blogs = await helper.blogsInDb()
      assert.strictEqual(blogs.length, helper.initialBlogs.length)
    })
    
    test('fails with status code 400 if url invalid', async () => {
      const newBlog = {
        title: 'test',
        author: 'abc'
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
      
      const blogs = await helper.blogsInDb()
      assert.strictEqual(blogs.length, helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
      
      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(b => b.title)
      assert(!titles.includes(blogToDelete.title))
    })
  })

  describe('updation of a blog', () => {
    test('succeeds if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = {
        title: 'test',
        author: blogsAtStart[0].author,
        url: blogsAtStart[0].url,
        likes: blogsAtStart[0].likes
      }

      await api
        .put(`/api/blogs/${blogsAtStart[0].id}`)
        .send(blogToUpdate)
      
      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

      const titles = blogsAtEnd.map(b => b.title)
      assert(titles.includes(blogToUpdate.title))
    })
  })
})


after(async () => {
  await mongoose.connection.close()
})