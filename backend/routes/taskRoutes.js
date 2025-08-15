import express from 'express';
import { createTask, getTasks, updateTask, deleteTask, getAllTasks } from '../controllers/taskController.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

router.use(protect);
router.post('/', createTask);
router.post('/getAllTasks', getAllTasks);
router.get('/:id', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;