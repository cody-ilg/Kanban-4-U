import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTask } from '../apis/api'
import { FormEvent, useState } from 'react'
import { NewTask } from '../../models/tasks'

export function NewTaskForm({ onAddTask }, props: NewTask) {
  const queryClient = useQueryClient()

  const [taskState, setTaskState] = useState({
    id: '',
    title: '',
    details: '',
    isStretch: false,
    colour: '',
  })

  // Add task mutation
  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: (newTask) => {
      console.log('New task added:', newTask)
      queryClient.invalidateQueries(['tasks'])
      onAddTask({ ...taskState, id: newTask.id }) // Pass the updated task state to the parent component
    },
  })

  // Task form functions for individual fields

  function handleTitleChange(e: any) {
    const stateObj = {
      ...taskState,
      title: e.target.value,
    }
    setTaskState(stateObj)
  }

  function handleDetailsChange(e: any) {
    const stateObj = {
      ...taskState,
      details: e.target.value,
    }
    setTaskState(stateObj)
  }

  function handleColourChange(e: any) {
    const stateObj = {
      ...taskState,
      colour: e.target.value,
    }
    setTaskState(stateObj)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addTaskMutation.mutate(taskState)
  }

  return (
    <form action="/" onSubmit={handleSubmit} method="post" >
      <label htmlFor="title">Title: </label>
      <input
        type="text"
        id="title"
        value={taskState.title}
        onChange={handleTitleChange}
        required={true}
        placeholder="Your task title"
      />
      <label htmlFor="details">Task: </label>
      <input
        type="text"
        id="details"
        value={taskState.details}
        onChange={handleDetailsChange}
        required={true}
      />
      <label htmlFor="colour">Colour: </label>
      <input
        type="text"
        id="colour"
        value={taskState.colour}
        onChange={handleColourChange}
      />
      <button className="add" type="submit">
        Add
      </button>
    </form>
  )
}

// export function NewTaskForm() {
//   const queryClient = useQueryClient()

//   const [taskState, setTaskState] = useState({
//     title: '',
//     details: '',
//     isStretch: false,
//     colour: '',
//   })

//   //Add task mutation
//   const addTaskMutation = useMutation({
//     mutationFn: addTask,
//     onSuccess: () => {
//       console.log('New task added')
//       queryClient.invalidateQueries(['tasks'])
//     },
//   })

//   //Task form functions for induvidual fields

//   function handleTitleChange(e: any) {
//     const stateObj = {
//       ...taskState,
//       title: e.target.value,
//     }
//     setTaskState(stateObj)
//   }

//   function handleDetailsChange(e: any) {
//     const stateObj = {
//       ...taskState,
//       details: e.target.value,
//     }
//     setTaskState(stateObj)
//   }

//   // function handleisStretchChange(e: any) {
//   //   const stateObj = {
//   //     ...taskState,
//   //     isStretch: e.target.value,
//   //   }
//   //   setTaskState(stateObj)
//   // }

//   function handleColourChange(e: any) {
//     const stateObj = {
//       ...taskState,
//       colour: e.target.value,
//     }
//     setTaskState(stateObj)
//   }

//   function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault()
//     console.log(event)

//     addTaskMutation.mutate(taskState)
//   }

//   return (
//     <form action="/" onSubmit={handleSubmit} method="post">
//       <label htmlFor="title">Title: </label>
//       <input
//         type="text"
//         id="title"
//         value={taskState.title}
//         onChange={handleTitleChange}
//       />
//       <label htmlFor="details">task: </label>
//       <input
//         type="text"
//         id="details"
//         value={taskState.details}
//         onChange={handleDetailsChange}
//       />
//       <label htmlFor="colour">colour: </label>
//       <input
//         type="text"
//         id="colour"
//         value={taskState.colour}
//         onChange={handleColourChange}
//       />
//       <button className="add"> Add</button>
//     </form>
//   )
// }
