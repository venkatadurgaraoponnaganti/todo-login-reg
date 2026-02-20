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
        {/* /api */}
        <Route path="/" element={<LoginComponent />} />

        {/* /api/login */}
        <Route path="/login" element={<LoginComponent />} />

        {/* /api/register */}
        <Route path="/register" element={<RegisterComponent />} />

        {/* /api/todos */}
        <Route
          path="/todos"
          element={
            <AuthenticatedRoute>
              <ListTodoComponent />
            </AuthenticatedRoute>
          }
        />

        {/* /api/add-todo */}
        <Route
          path="/add-todo"
          element={
            <AuthenticatedRoute>
              <TodoComponent />
            </AuthenticatedRoute>
          }
        />

        {/* /api/update-todo/1 */}
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
