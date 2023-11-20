//AddCheese.tsx Component

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addCheeseApi } from '../apiClient'
import { Cheese } from '../../models/cheese'

export default function AddCheese() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    comment: '',
    rating_out_of_a_possible_10_Goldblums: '',
  })

  const queryClient = useQueryClient()

  const addCheeseMutation = useMutation({
    mutationFn: addCheeseApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['cheese'])
    },
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      await addCheeseMutation.mutate(formData)
    } catch (error: any) {
      console.log(error.message)
    }
  }
  const handleInputChange = async (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <form action="/" onSubmit={handleSubmit} method="POST">
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <label htmlFor="description">Description: </label>
        <input
          id="description"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />

        <label htmlFor="comment">Comment: </label>
        <input
          id="comment"
          type="text"
          name="comment"
          value={formData.comment}
          onChange={handleInputChange}
        />

        <label htmlFor="rating_out_of_a_possible_10_Goldblums">
          Rating out of a possible 10 Goldblums:{' '}
        </label>
        <input
          id="rating_out_of_a_possible_10_Goldblums"
          type="text"
          name="rating_out_of_a_possible_10_Goldblums"
          value={formData.rating_out_of_a_possible_10_Goldblums}
          onChange={handleInputChange}
        />
        <button type="submit" className="add">
          Add
        </button>
      </form>
    </>
  )
}