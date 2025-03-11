/*const connection = require('./connection');

const getAll = async () => {
  const [tasks] = await connection.execute('SELECT * FROM tasks');
  return tasks;
};

const createTask = async (task) => {
  const { title } = task;
  const dateUTC = new Date(Date.now()).toUTCString();

  const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)';

  const [createdTask] = await connection.execute(query, [title, 'pendente', dateUTC]);
  return {insertId: createdTask.insertId};
};

const deleteTask = async (id) => {
  const [removedTask] = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
  return removedTask;
};

const updateTask = async (id, task) => {
  const { title, status } = task;
  
  const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';

  const [updatedTask] = await connection.execute(query, [title, status, id]);
  return updatedTask;
};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
};*/

const Parse = require('parse/node');

// Buscar todas as tarefas
const getAll = async () => {
  const Task = Parse.Object.extend("Tasks");
  const query = new Parse.Query(Task);
  const results = await query.find();
  
  return results.map(task => ({
    id: task.id,
    title: task.get("title"),
    status: task.get("status"),
    created_at: task.get("created_at"),
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

