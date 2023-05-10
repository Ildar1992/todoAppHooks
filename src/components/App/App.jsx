import React, { useState } from 'react';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

import './App.css';

function counter() {
  let maxId = 1;
  return () => maxId++;
}

const maxId = counter();
const App = () => {
  const [filter, setFilter] = useState('All');
  const [todoData, setTodoData] = useState([]);

  const editTask = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, edit: !oldItem.edit };
    setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);
  };

  const onSubmitEdit = (event, id) => {
    event.preventDefault();
    const index = todoData.findIndex((data) => data.id === id);
    const oldData = todoData[index];
    const newData = {
      ...oldData,
      edit: !oldData.edit,
      task: event.target[0].value,
    };
    setTodoData([...todoData.slice(0, index), newData, ...todoData.slice(index + 1)]);
  };

  const deleteItem = (id) => {
    const index = todoData.findIndex((el) => el.id === id);
    setTodoData([...todoData.slice(0, index), ...todoData.slice(index + 1)]);
  };

  const addItem = (text, time) => {
    if (time <= 0) {
      alert('Вы не указали время');
      return;
    }
    const newItem = {
      id: maxId(),
      task: text,
      completed: false,
      edit: false,
      date: new Date(),
      timer: time,
    };
    setTodoData([...todoData, newItem]);
  };

  const onToggleCompleted = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, completed: !oldItem.completed };
    setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);
  };

  const filterTask = () => {
    if (filter === 'All') return todoData;
    return todoData.filter((item) => (filter === 'Completed' ? item.completed : !item.completed));
  };

  const onFilterChange = (filter) => {
    setFilter(filter);
  };

  const clearCompleted = () => {
    setTodoData(todoData.filter((item) => !item.completed));
  };

  const completedCount = todoData.filter((el) => !el.completed).length;

  return (
    <section className="todoapp">
      <NewTaskForm addItem={addItem} />
      <section className="main">
        <TaskList
          todoData={filterTask()}
          deleteItem={deleteItem}
          onToggleCompleted={onToggleCompleted}
          editTask={editTask}
          onSubmitEdit={onSubmitEdit}
        />

        <Footer completedCount={completedCount} onFilterChange={onFilterChange} clearCompleted={clearCompleted} />
      </section>
    </section>
  );
};

export default App;
