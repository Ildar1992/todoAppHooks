import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './Task.css';
const Task = (props) => {
  const {
    id,
    task,
    completed,
    edit,
    date,
    deleteItem,
    onToggleCompleted,
    editTask,
    onSubmitEdit,
    changeTimerValue,
    timerProp,
  } = props;

  const [dataText, setDataText] = useState(null);
  const [value, setValue] = useState(task);
  const [timer, setTimer] = useState(timerProp);
  const [pause, setPause] = useState(true);

  const setStateDataText = () => {
    setDataText(formatDistanceToNow(date, { includeSeconds: true }));
  };

  const timerRun = () => {
    if (!pause) setTimer((timer) => timer - 1);
  };

  useEffect(() => {
    setStateDataText();
    const interval = setInterval(() => {
      setStateDataText();
      timerRun();
    }, 1000);
    return () => {
      clearInterval(interval);
      changeTimerValue(id, timer);
    };
  }, [pause, timer]);

  const setTaskValue = (event) => {
    setValue(event.target.value);
  };
  const timerSet = () => {
    if (timer < 0) return '00:00';
    return `${Math.floor(timer / 60)
      .toString()
      .padStart(2, '0')}:${Math.floor(timer % 60)
      .toString()
      .padStart(2, '0')}`;
  };

  const onPlay = () => {
    setPause(false);
  };

  const onPause = () => {
    setPause(true);
  };

  return edit ? (
    <li className="editing">
      <form onSubmit={onSubmitEdit}>
        <input className="edit" type="text" defaultValue={value} onChange={setTaskValue} autoFocus />
      </form>
    </li>
  ) : (
    <li className={completed ? 'completed' : ''}>
      <div className="view">
        <input id={id} className="toggle" type="checkbox" checked={completed} onChange={onToggleCompleted} />
        <label htmlFor={id}>
          <span className="title">{task}</span>
          <div className="description">
            <button className="icon icon-play" onClick={onPlay}></button>
            <button className="icon icon-pause" onClick={onPause}></button>
            <span className="timer">{timerSet()}</span>
          </div>
          <span className="created">{dataText}</span>
        </label>
        <button className="icon icon-edit" onClick={editTask}></button>
        <button className="icon icon-destroy" onClick={deleteItem}></button>
      </div>
    </li>
  );
};

Task.defaultProps = {
  id: 1,
  task: '',
  completed: false,
  edit: false,
  onToggleCompleted: () => {},
  onSubmitEdit: () => {},
  deleteItem: () => {},
  editTask: () => {},
  date: new Date(),
  timerProp: 0,
};
Task.propTypes = {
  id: PropTypes.number,
  task: PropTypes.string,
  completed: PropTypes.bool,
  onToggleCompleted: PropTypes.func,
  onSubmitEdit: PropTypes.func,
  deleteItem: PropTypes.func,
  editTask: PropTypes.func,
  edit: PropTypes.bool,
  date: PropTypes.object,
  timerProp: PropTypes.number,
};
export default Task;
