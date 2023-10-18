import { Button, ButtonGroup, Card, CardContent, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'


export default function Tasks() {
  const [tasks, setTasks] = useState([])
  console.log(tasks)
  
  const loadTasks = () => {
    fetch('http://localhost:3000/tasks')
    .then((res) => res.json())
    .then((data) => setTasks(data))
  }

  useEffect(() => {
    loadTasks()
  }, [])


  return (
    <Container>
      <h1>Tasks</h1>
      {
        tasks.map(({title, description}) => (
          <Card key={tasks.id} style={{marginBottom: '.7rem', backgroundColor: '#1e272e'}}>
            <CardContent style={{color: '#c0d1df', display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
              <div>
                <Typography>{title}</Typography>
                <Typography>{description}</Typography>
              </div>
              <ButtonGroup>
                <Button variant='contained' color='secondary'>Delete</Button>
                <Button variant='contained' color='primary'>Edit</Button>
              </ButtonGroup>
            </CardContent>
          </Card>
        ))
      }
    </Container>
  )
}
