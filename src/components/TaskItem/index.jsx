// TaskItem/index.jsx
import './index.scss';

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const getPriorityClass = (priority) => {
    return `task-item--${priority}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const isOverdue = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today && !task.completed;
  };

  return (
    <div className={`task-item ${task.completed ? 'task-item--completed' : ''} ${getPriorityClass(task.priority)}`}>
      <div className="task-item__checkbox-wrapper">
        <input
          type="checkbox"
          id={`task-${task.id}`}
          checked={task.completed}
          onChange={() => onToggle(task._id)}
          className="task-item__checkbox"
        />
        
      </div>

      <div className="task-item__content">
        <div className="task-item__header">
          <h3 className="task-item__title">{task.title}</h3>
          <div className="task-item__badges">
            {task.category && (
              <span className="task-item__badge task-item__badge--category">
                {task.category}
              </span>
            )}
            <span className={`task-item__badge task-item__badge--priority task-item__badge--${task.priority}`}>
              {task.priority}
            </span>
          </div>
        </div>

        {task.description && (
          <p className="task-item__description">{task.description}</p>
        )}

        <div className="task-item__footer">
          <div className="task-item__date">
            <svg className="task-item__date-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5.33333 1.33334V3.33334M10.6667 1.33334V3.33334M2.66667 5.33334H13.3333M3.33333 2.66667H12.6667C13.403 2.66667 14 3.26363 14 4V13.3333C14 14.0697 13.403 14.6667 12.6667 14.6667H3.33333C2.59695 14.6667 2 14.0697 2 13.3333V4C2 3.26363 2.59695 2.66667 3.33333 2.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className={isOverdue() ? 'task-item__date--overdue' : ''}>
              {formatDate(task.dueDate)}
              {isOverdue() && ' (Overdue)'}
            </span>
          </div>

          <div className="task-item__actions">
            <button
              className="task-item__action task-item__action--edit"
              onClick={() => onEdit(task)}
              title="Edit task"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11.3333 2.00001C11.5084 1.82491 11.7163 1.68602 11.9451 1.59126C12.1738 1.49651 12.4191 1.44775 12.6667 1.44775C12.9142 1.44775 13.1595 1.49651 13.3883 1.59126C13.617 1.68602 13.8249 1.82491 14 2.00001C14.1751 2.17511 14.314 2.383 14.4087 2.61178C14.5035 2.84055 14.5522 3.08588 14.5522 3.33334C14.5522 3.58081 14.5035 3.82614 14.4087 4.05491C14.314 4.28368 14.1751 4.49158 14 4.66668L5 13.6667L1.33333 14.6667L2.33333 11L11.3333 2.00001Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className="task-item__action task-item__action--delete"
              onClick={() => onDelete(task._id)}
              title="Delete task"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4H3.33333M3.33333 4H14M3.33333 4V13.3333C3.33333 13.687 3.47381 14.0261 3.72386 14.2761C3.97391 14.5262 4.31304 14.6667 4.66667 14.6667H11.3333C11.687 14.6667 12.0261 14.5262 12.2761 14.2761C12.5262 14.0261 12.6667 13.687 12.6667 13.3333V4H3.33333ZM5.33333 4V2.66667C5.33333 2.31304 5.47381 1.97391 5.72386 1.72386C5.97391 1.47381 6.31304 1.33333 6.66667 1.33333H9.33333C9.68696 1.33333 10.0261 1.47381 10.2761 1.72386C10.5262 1.97391 10.6667 2.31304 10.6667 2.66667V4M6.66667 7.33333V11.3333M9.33333 7.33333V11.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;