import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  try {
    const task = await Task.create({
      userId: req.user,
      title,
      description,
      dueDate,
      status,
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Create error' });
  }
};

export const getTasks = async (req, res) => {
  const { status, dueDate, page = 1, limit = 5 } = req.query;
  const filter = { userId: req.user };
  if (status) filter.status = status;
  if (dueDate) filter.dueDate = dueDate;

  try {
    const tasks = await Task.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Get error' });
  }
};

export const getAllTasks = async (req,res) =>{
  try{
    const tasks = await Task.find();
    if(tasks){
      res.status(200).json({message:"Tasks found"}, tasks)
    }
    if(!tasks){
      res.status(204).json({message:"no tasks found"}, {})
    }
  }
  catch(error){
          res.status(500).json({message:"server error"}, {})

    console.log(error)
  }
}
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.user });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Deleted' });
  }
};
