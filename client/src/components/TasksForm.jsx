import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TasksForm() {

  const [task, setTask] = useState({
    title: '',
    description: ''
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {'Content-Type': 'application/json'}
    })

    const data = await res.json()
    console.log(data)
    setLoading(false)
    navigate('/')
  }

  const handlChange = (e) => {
    setTask({...task, [e.target.name]: e.target.value})
  }
  
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item sx={3}>
        <Card sx={{ mt: 5 }} style={{backgroundColor: '#1e272e', padding: '1rem'}}>
          <Typography variant="5" textAlign='center' color='white'>Create Task</Typography>
          <CardContent>
            <form action="" onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Write your title"
                sx={{ display: "block", margin: ".5rem 0" }}
                inputProps={{style: {color: 'white'}}}
                InputLabelProps={{style: {color: 'white'}}}
                name="title"
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
                onChange={handlChange}
              />
              <Button variant="contained" color="primary" type='submit' disabled={!task.title || !task.description}>
                {
                  loading 
                    ? <CircularProgress color="inherit" size={24}/> 
                    : 'Create'
                }
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
