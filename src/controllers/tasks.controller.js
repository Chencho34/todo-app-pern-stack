const pool = require('../db')

const getAllTasks = async (req, res, next) => {
  try {
    const allTasks = await pool.query('SELECT * FROM task')
    // console.log(allTasks.rows)
    res.json(allTasks.rows)
  } catch (error) {
    next(error)
  }
}

const getTasks = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM task WHERE id = $1', [id])
    // console.log(result.rows)
    
    if (result.rows.length === 0) return  res.status(404).json({message: 'tarea no encontrada'})
  
    res.json(result.rows[0])
  } catch (error) {
    next(error)
  }
}

const createTasks = async (req, res, next) => {
  try {
    const { title, description } = req.body
    const result = await pool.query('INSERT INTO task (title, description) VALUES($1, $2) RETURNING *', [title, description])
    res.json(result.rows[0])     
  } catch (error) {
    next(error)
  }
}

const deleteTasks = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM task WHERE id = $1 RETURNING *', [id])
    // console.log(result.rows)
    
    if (result.rows.length === 0) return  res.status(404).json({message: 'tarea no encontrada'})
    res.sendStatus(204)  
  } catch (error) {
    next(error)
  }
}

const updateTasks = async (req, res, next) => {
  try {
    const {id} = req.params
    const {title, description} = req.body

    const result = await pool.query("UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *", [title, description, id])
  
    if (result.rows.length === 0) return res.status(404).json({message: 'Task not found'})
  
    return res.json(result.rows[0])
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllTasks,
  getTasks,
  createTasks,
  deleteTasks,
  updateTasks
}
