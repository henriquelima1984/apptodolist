const Parse = require('parse/node');

//Buscar todas as tarefas
const getAll = async () => {
  const Task = Parse.Object.extend("Tasks");
  const query = new Parse.Query(Task);
  const results = await query.find();
  
  return results.map(task => ({
    id: task.id,
    title: task.get("title"),
    status: task.get("status"),
    created_at: task.get("createdAt"),
  }));
};

// Criar uma nova tarefa
const createTask = async (task) => {
  const { title } = task;
  const Task = Parse.Object.extend("Tasks");
  const newTask = new Task();
  
  newTask.set("title", title);
  newTask.set("status", "pendente");
  
  const savedTask = await newTask.save();
  return { insertId: savedTask.id };
};

// Deletar uma tarefa pelo ID
const deleteTask = async (id) => {
  const Task = Parse.Object.extend("Tasks");
  const query = new Parse.Query(Task);
  const task = await query.get(id);

  if (task) {
    await task.destroy();
  }
};

// Atualizar uma tarefa pelo ID
const updateTask = async (id, task) => {
  const { title, status } = task;

  const Task = Parse.Object.extend("Tasks");
  const query = new Parse.Query(Task);
  const existingTask = await query.get(id);

  if (existingTask) {
    existingTask.set("title", title);
    existingTask.set("status", status);
    await existingTask.save();
  }
};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
};

