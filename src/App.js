import React from 'react'
import { compose } from 'recompose'

const withConditionalRenderings = compose(
  withLoadingIndicator,
  withTodosNull,
  withTodosEmpty
)

function App(props) {
  return (
    <TodoListWithConditionalRendering
      todos={props.todos}
      isLoadingTodos={props.isLoadingTodos} />
  )
}

const withTodosNull = (Component) => (props) =>
  !props.todos
    ? null
    : <Component { ...props } />

const withTodosEmpty = (Component) => (props) =>
  !props.todos.length
    ? <div><p>You have no Todos.</p></div>
    : <Component { ...props } />

const withLoadingIndicator = (Component) => ({ isLoadingTodos, ...others }) =>
  props.isLoadingTodos
    ? <div><p>Loading todos...</p></div>
    : <Component { ...others } />

const TodoListWithConditionalRendering = withConditionalRenderings(TodoList)

function TodoList({ todos }) {
  return (
    <div>
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </div>
  )
}

export default App
