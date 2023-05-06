import React, { useState } from 'react';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

import './App.css';

const App = () => {
  const [filter, setFilter] = useState('All');
  const [todoData, setTodoData] = useState([]);

  const editTask = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, edit: !oldItem.edit };
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return newArray;
    });
  };

  const deleteItem = (id) => {
    setTodoData((todoData) => {
      const newArray = todoData.filter((item) => item.id !== id);
      return newArray;
    });
  };

  let maxId = 1;

  const addItem = (text, time) => {
    const newItem = {
      id: maxId++,
      task: text,
      completed: false,
      edit: false,
      date: new Date(),
      timer: time,
    };
    setTodoData((todoData) => {
      const newData = [...todoData, newItem];
      return newData;
    });
  };

  const onToggleCompleted = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return newArray;
    });
  };

  const filterTask = () => {
    if (filter === 'All') return todoData;
    return todoData.filter((item) => (filter === 'Completed' ? item.completed : !item.completed));
  };

  const onFilterChange = (filter) => {
    setFilter(filter);
  };

  const clearCompleted = () => {
    setTodoData((todoData) => {
      const newData = todoData.filter((item) => !item.completed);
      return newData;
    });
  };
  const onSubmitEdit = (event, id) => {
    event.preventDefault();
    setTodoData((todoData) => {
      const index = todoData.findIndex((data) => data.id === id);
      const oldData = todoData[index];
      const newData = {
        ...oldData,
        edit: !oldData.edit,
        task: event.target[0].value,
      };
      const newArray = [...todoData.slice(0, index), newData, ...todoData.slice(index + 1)];
      return newArray;
    });
  };

  const changeTimerValue = (id, value) => {
    setTodoData((todoData) => {
      const index = todoData.findIndex((el) => {
        return el.id === id;
      });
      const oldItem = todoData[index];
      if (typeof oldItem === 'undefined') return;
      const newItem = { ...oldItem, timer: value };
      const newArray = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];
      return newArray;
    });
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
          changeTimerValue={changeTimerValue}
        />

        <Footer completedCount={completedCount} onFilterChange={onFilterChange} clearCompleted={clearCompleted} />
      </section>
    </section>
  );
};

export default App;
