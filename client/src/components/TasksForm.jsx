import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TasksForm() {

  const [task, setTask] = useState({ title: '', description: '' })
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const navigate = useNavigate()
  const params = useParams()


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if(editing) {
      await fetch(`http://localhost:3000/tasks/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(task),
        headers: {'Content-Type': 'application/json'}
      })
    } else {
      const res = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {'Content-Type': 'application/json'}
      })

      const data = await res.json()
      console.log(data)
    }
    setLoading(false)
    navigate('/')
  }

  const handlChange = (e) => setTask({...task, [e.target.name]: e.target.value})
  
  const loadTask = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`)
    .then((response) => response.json())
    .then((data) => {
      setTask({title: data.title, description: data.description})
    })
    setEditing(true)
  }

  useEffect(() => {
    if (params.id) {
      loadTask(params.id)
    }
  }, [params.id])
  
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item sx={3}>
        <Card sx={{ mt: 5 }} style={{backgroundColor: '#1e272e', padding: '1rem'}}>
          <Typography variant="5" textAlign='center' color='white'>
            { editing ? "Edit Task" : "Add task" }
          </Typography>
          <CardContent>
            <form action="" onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Write your title"
                sx={{ display: "block", margin: ".5rem 0" }}
                inputProps={{style: {color: 'white'}}}
                InputLabelProps={{style: {color: 'white'}}}
                name="title"
                value={task.title}
                onChange={handlChange}
              />
              <TextField
                variant="filled"
                label="Write your description"
                multiline
                rows={4}
                inputProps={{style: {color: 'white'}}}
                InputLabelProps={{style: {color: 'white'}}}
                sx={{ display: "block", margin: ".5rem 0" }}
                name="description"
                value= {task.description}
                onChange={handlChange}
              />
              <Button variant="contained" color="primary" type='submit' disabled={!task.title || !task.description}>
                {
                  loading 
                    ? <CircularProgress color="inherit" size={24}/> 
                    : 'Save'
                }
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
