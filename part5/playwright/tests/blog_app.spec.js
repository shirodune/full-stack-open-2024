const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await request.post('/api/users', {
      data: {
        name: 'Root',
        username: 'root',
        password: '123456'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    let locator = await page.getByText('username')
    await expect(locator).toBeVisible()
    locator = await page.getByText('password')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')

      /*
      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('Wrong credentials')
      */
      await expect(page.getByText('Wrong credentials')).toBeVisible()
      await expect(page.getByText('Matti Luukkainen logged-in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      createBlog(page, 'test', 'mluukkai', 'http://test.com')
      await expect(page.getByText('a new blog test by mluukkai')).toBeVisible()
      await expect(page.getByText('test mluukkai')).toBeVisible()
    })

    describe('When created a new blog', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'test', 'mluukkai', 'http://test.com')
      })

      test('the blog can be liked', async ({ page }) => {
        const blog = await page.getByText('test mluukkai').locator('..')
        const showButton = await blog.getByRole('button', { name: 'show' })

        await showButton.click()
        const likeButton = await blog.getByRole('button', { name: 'like' })
        const likeNumber = likeButton.locator('..')

        await expect(likeNumber.getByText('1')).not.toBeVisible()
        await likeButton.click()
        await expect(likeNumber.getByText('1')).toBeVisible()
      })

      test('the blog can be deleted', async ({ page }) => {
        const blog = await page.getByText('test mluukkai').locator('..')
        const showButton = await blog.getByRole('button', { name: 'show' })

        await showButton.click()
        const deleteButton = await blog.getByRole('button', { name: 'remove' })
        page.on('dialog', dialog => dialog.accept())
        await deleteButton.click()

        await expect(page.getByText('test mluukkai')).not.toBeVisible()
      })
      
      test('other user cannot see the delete button', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'root', '123456')

        const blog = await page.getByText('test mluukkai').locator('..')
        const showButton = await blog.getByRole('button', { name: 'show' })

        await showButton.click()
        await expect(blog.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })

      test(' the blogs are arranged in the order according to the likes', async ({ page }) => {
        const testblog = await page.getByText('test mluukkai').locator('..')
        await testblog.getByRole('button', { name: 'show' }).click()
        const testlikeButton = await testblog.getByRole('button', { name: 'like' })
        const testlikeNumber = testlikeButton.locator('..')
        await testlikeButton.click()
        await expect(testlikeNumber.getByText('1')).toBeVisible()
        
        await createBlog(page, 'test2', 'mluukkai', 'http://test.com')

        const test2blog = await page.getByText('test2 mluukkai').locator('..')
        await test2blog.getByRole('button', { name: 'show' }).click()
        const test2likeButton = await test2blog.getByRole('button', { name: 'like' })
        const test2likeNumber = test2likeButton.locator('..')
        await test2likeButton.click()
        await expect(test2likeNumber.getByText('1')).toBeVisible()
        await test2likeButton.click()
        await expect(test2likeNumber.getByText('2')).toBeVisible()
        
        await createBlog(page, 'test3', 'mluukkai', 'http://test.com')
        const test3blog = await page.getByText('test3 mluukkai').locator('..')
        await test3blog.getByRole('button', { name: 'show' }).click()

        const blogs = await page.locator('.blog').all()
        expect(blogs[0]).toContainText('test2 mluukkai')
        expect(blogs[1]).toContainText('test mluukkai')
        expect(blogs[2]).toContainText('test3 mluukkai')
      })
    })
  })
})
