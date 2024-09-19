import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext'
import Auth from './pages/auth'
import Layout from './components/common/layout'
import QuizSetList from './pages/quizSetList'
import QuizQuestion from './pages/quizQuestion'
import AuthCallback from './pages/authCallback'
import ProtectedRoute from './components/common/protectedRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/quiz-sets" element={
              <ProtectedRoute>
                <QuizSetList />
              </ProtectedRoute>
            } />
            <Route path="/quiz-question/:quizSetId" element={
              <ProtectedRoute>
                <QuizQuestion />
              </ProtectedRoute>
            } />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  )
}

export default App
