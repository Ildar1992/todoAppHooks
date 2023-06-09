import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';
import './TaskList.css';

const TaskList = ({ todoData, deleteItem, onToggleCompleted, editTask, onSubmitEdit }) => {
  return (
    <ul className="todo-list">
      {todoData.map((el) => {
        return (
          <Task
            id={el.id}
            key={el.id}
            task={el.task}
            completed={el.completed}
            edit={el.edit}
            date={el.date}
            deleteItem={() => deleteItem(el.id)}
            onToggleCompleted={() => onToggleCompleted(el.id)}
            editTask={() => editTask(el.id)}
            onSubmitEdit={(event) => onSubmitEdit(event, el.id)}
            timerProp={el.timer}
          />
        );
      })}
    </ul>
  );
};
TaskList.defaultProps = {
  todoData: [],
  deleteItem: () => {},
  onToggleCompleted: () => {},
  editTask: () => {},
  onSubmitEdit: () => {},
  changeTimerValue: () => {},
};

TaskList.propTypes = {
  todoData: PropTypes.arrayOf(PropTypes.object),
  deleteItem: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  editTask: PropTypes.func,
  onSubmitEdit: PropTypes.func,
  changeTimerValue: PropTypes.func,
};
export default TaskList;
