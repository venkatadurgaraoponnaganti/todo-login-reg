import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ListTodoComponent from './components/ListTodoComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import TodoComponent from './components/TodoComponent'
import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import { isUserLoggedIn } from './services/AuthService'

function App() {

  function AuthenticatedRoute({ children }) {
    const isAuth = isUserLoggedIn()
    return isAuth ? children : <Navigate to="/login" />
  }

  return (
    <BrowserRouter>
      <HeaderComponent />

      <Routes>
        {/* / */}
        <Route path="/" element={<LoginComponent />} />

        {/* /login */}
        <Route path="/login" element={<LoginComponent />} />

        {/* /register */}
        <Route path="/register" element={<RegisterComponent />} />

        {/* /todos */}
        <Route
          path="/todos"
          element={
            <AuthenticatedRoute>
              <ListTodoComponent />
            </AuthenticatedRoute>
          }
        />

        {/* /add-todo */}
        <Route
          path="/add-todo"
          element={
            <AuthenticatedRoute>
              <TodoComponent />
            </AuthenticatedRoute>
          }
        />

        {/* /update-todo/1 */}
        <Route
          path="/update-todo/:id"
          element={
            <AuthenticatedRoute>
              <TodoComponent />
            </AuthenticatedRoute>
          }
        />
      </Routes>

      <FooterComponent />
    </BrowserRouter>
  )
}

export default App
