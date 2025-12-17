// TaskForm/index.jsx - Updated with enhanced styling support
import { useState, useEffect } from 'react';
import './index.scss';

const TaskForm = ({ onSubmit, onCancel, initialTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    category: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialTask) {
      setFormData(initialTask);
    }
  }, [initialTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        category: ''
      });
    }
  };

  return (
    <div className="task-form-overlay" onClick={onCancel}>
      <div className="task-form" onClick={(e) => e.stopPropagation()}>
        <div className="task-form__header">
          <h2>{initialTask ? 'Edit Task' : 'Create New Task'}</h2>
          <button className="task-form__close" onClick={onCancel} type="button">×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="task-form__group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="task-form__error">{errors.title}</span>}
          </div>

          <div className="task-form__group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add more details about this task..."
              rows="4"
            />
          </div>

          <div className="task-form__row">
            <div className="task-form__group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">🟢 Low Priority</option>
                <option value="medium">🟡 Medium Priority</option>
                <option value="high">🔴 High Priority</option>
              </select>
            </div>

            <div className="task-form__group">
              <label htmlFor="dueDate">Due Date *</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className={errors.dueDate ? 'error' : ''}
              />
              {errors.dueDate && <span className="task-form__error">{errors.dueDate}</span>}
            </div>
          </div>

          <div className="task-form__group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Work, Personal, Shopping"
            />
          </div>

          <div className="task-form__actions">
            <button type="button" className="task-form__btn task-form__btn--cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="task-form__btn task-form__btn--submit">
              {initialTask ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;