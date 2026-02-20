import React, { useEffect, useState } from 'react'
import { completeTodo, deleteTodo, getAllTodos, inCompleteTodo } from '../services/TodoService'
import { useNavigate } from 'react-router-dom'

const ListTodoComponent = () => {
  const [todos, setTodos] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  function getErrorMessage(error, fallbackMessage) {
    const data = error?.response?.data

    if (typeof data === 'string') return data
    if (data && typeof data.message === 'string') return data.message

    return fallbackMessage
  }

  function normalizeTodo(item, index) {
    if (!item || typeof item !== 'object') {
      return null
    }

    return {
      id: item.id ?? `todo-${index}`,
      title: typeof item.title === 'string' ? item.title : String(item.title ?? ''),
      description:
        typeof item.description === 'string'
          ? item.description
          : String(item.description ?? ''),
      completed: Boolean(item.completed)
    }
  }

  useEffect(() => {
    listTodos()
  }, [])

  function listTodos() {
    setErrorMessage('')

    getAllTodos()
      .then((response) => {
        const list = Array.isArray(response.data) ? response.data : []
        const normalizedTodos = list
          .map((todo, index) => normalizeTodo(todo, index))
          .filter(Boolean)

        setTodos(normalizedTodos)
      })
      .catch((error) => {
        setErrorMessage(getErrorMessage(error, 'Unable to load todos. Please login again.'))
        setTodos([])
        console.error(error)
      })
  }

  function addNewTodo() {
    navigate('/add-todo')
  }

  function updateTodo(id) {
    navigate(`/update-todo/${id}`)
  }

  function removeTodo(id) {
    deleteTodo(id)
      .then(() => {
        listTodos()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function markCompleteTodo(id) {
    completeTodo(id)
      .then(() => {
        listTodos()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function markInCompleteTodo(id) {
    inCompleteTodo(id)
      .then(() => {
        listTodos()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className='container'>
      <h2 className='text-center'>List of Todos</h2>
      <button className='btn btn-primary mb-2' onClick={addNewTodo}>Add Todo</button>
      {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
      <div>
        <table className='table table-bordered table-striped'>
          <thead>
            <tr>
              <th>Todo Title</th>
              <th>Todo Description</th>
              <th>Todo Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.completed ? 'YES' : 'NO'}</td>
                <td>
                  <button className='btn btn-info' onClick={() => updateTodo(todo.id)}>Update</button>
                  <button className='btn btn-danger' onClick={() => removeTodo(todo.id)} style={{ marginLeft: '10px' }}>Delete</button>
                  <button className='btn btn-success' onClick={() => markCompleteTodo(todo.id)} style={{ marginLeft: '10px' }}>Complete</button>
                  <button className='btn btn-info' onClick={() => markInCompleteTodo(todo.id)} style={{ marginLeft: '10px' }}>In Complete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListTodoComponent
