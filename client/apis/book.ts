import request from 'superagent'
import { Book } from '../../models/book.ts'

const bookURL = '/api/v1/books'

export async function getBooksApi(): Promise<Book[]> {
  try {
    const res = await request.get(bookURL)
    return res.body
  } catch (error) {
    throw console.error('Error obtaining book.', error)
  }
}

export async function getSingleBookApi(id: number): Promise<Book> {
  try {
    const res = await request.get(`${bookURL}/${id}`)
    return res.body
  } catch (error) {
    console.error(
      `Error obtaining book of forbidden knowledge with id ${id}:`,
      error
    )
    throw new Error(
      `Failed to obtain book of forbidden knowledge with id ${id}`
    )
  }
}