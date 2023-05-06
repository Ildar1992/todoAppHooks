import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const NewTaskForm = ({ addItem }) => {
  const [task, setTask] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onSubmitForm = (e) => {
    e.preventDefault();
    const timerSec = parseInt(min || 0) * 60 + parseInt(sec || 0) * 1;
    if (!task.trim().length) return;
    if (task.length !== 0) {
      addItem(task, timerSec);
      setTask('');
      setMin('');
      setSec('');
    }
  };

  const onLabelChange = (e) => {
    setTask(e.target.value);
  };

  const clamp = (value, min, max) => {
    if (value > max) return max;
    if (value < min) return min;
    return value;
  };

  const onChangeInputMin = (e) => {
    let value = e.target.value;
    if (value != '') e.target.value = clamp(+value, 0, 1440) || 0;
    setMin(e.target.value);
  };

  const onChangeInputSec = (e) => {
    let value = e.target.value;
    if (value != '') e.target.value = clamp(+value, 0, 60) || 0;
    setSec(e.target.value);
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={onSubmitForm} className="new-todo-form">
        <input className="new-todo" type="text" onChange={onLabelChange} value={task} placeholder="Task" autoFocus />
        <input
          className="new-todo-form__timer"
          type="number"
          placeholder="Min"
          onChange={onChangeInputMin}
          value={min}
          pattern="[0-9]{\,\2}"
        />
        <input
          className="new-todo-form__timer"
          type="number"
          placeholder="Sec"
          onChange={onChangeInputSec}
          value={sec}
        />
        <input type="submit" style={{ display: 'none' }} />
      </form>
    </header>
  );
};

NewTaskForm.defaultProps = {
  addItem: () => {},
};
NewTaskForm.propTypes = {
  addItem: PropTypes.func,
};
export default NewTaskForm;
