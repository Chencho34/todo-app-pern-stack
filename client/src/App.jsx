import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Tasks from './components/Tasks'
import TasksForm from './components/TasksForm'
import NotFound from './components/NotFound'
import './App.css'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index path='/' element={<Tasks />} />
        <Route path='/tasksform' element={<TasksForm />} />
        <Route path='/tasks/:id/edit' element={<TasksForm />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}
