import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TasksFilter.css';

const TasksFilter = ({ onFilterChange }) => {
  const [filter, setFilter] = useState('All');

  const buttons = [
    { name: 'All', task: 'All' },
    { name: 'Active', task: 'Active' },
    { name: 'Completed', task: 'Completed' },
  ];

  return (
    <ul className="filters">
      {buttons.map(({ name, task }) => (
        <li key={name}>
          <button
            type="button"
            className={filter === name ? 'selected' : ''}
            onClick={() => {
              onFilterChange(name);
              setFilter(name);
            }}
          >
            {task}
          </button>
        </li>
      ))}
    </ul>
  );
};

TasksFilter.defaultProps = {
  onFilterChange: () => {},
};
TasksFilter.propTypes = {
  onFilterChange: PropTypes.func,
};
export default TasksFilter;
