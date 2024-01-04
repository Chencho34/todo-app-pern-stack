import { Button, ButtonGroup, Card, CardContent, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const isEmtpy = tasks.length === 0

  const navigate = useNavigate()
  const loadTasks = () => {
    fetch('http://localhost:3000/tasks')
    .then((res) => res.json())
    .then((data) => setTasks(data))
  }

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/tasks/${id}`, { 
        method: "DELETE",
      })
      console.log(res)
      setTasks(tasks.filter((task) => task.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])


  return (
    <Container>
      <h1 style={{margin: '2rem 0'}}>Tasks</h1>
      {
        isEmtpy ? (
          <h1>Sin tareas</h1>
        ) : (
          tasks.map(({id, title, description}) => (
            <Card key={id} style={{marginBottom: '.7rem', backgroundColor: '#1e272e'}}>
              <CardContent style={{color: '#c0d1df', display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
                <div>
                  <Typography>{title}</Typography>
                  <Typography>{description}</Typography>
                </div>
                <ButtonGroup>
                  <Button variant='contained' color='secondary' onClick={() => handleDelete(id)}>Delete</Button>
                  <Button variant='contained' color='primary' onClick={() => navigate(`/tasks/${id}/edit`)}>Edit</Button>
                </ButtonGroup>
              </CardContent>
            </Card>
          ))
        )
      }
    </Container>
  )
}
