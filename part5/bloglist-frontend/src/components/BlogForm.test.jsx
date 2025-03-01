import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'

test('<BlogForm />', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('write a title')
  const authorInput = screen.getByPlaceholderText('write a author')
  const urlInput = screen.getByPlaceholderText('write a url')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'testing a form')
  await user.type(authorInput, 'root')
  await user.type(urlInput, 'http://test.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form')
  expect(createBlog.mock.calls[0][0].author).toBe('root')
  expect(createBlog.mock.calls[0][0].url).toBe('http://test.com')
})