import React, { useState, useEffect } from 'react';
import './TaskDetailModal.css';
import { 
    FaTimes, FaPaperclip, FaComment, FaTrash, FaPlus, FaUserCircle, FaFileAlt 
} from 'react-icons/fa';

const TaskDetailModal = ({ task, onClose, onSave, onDelete }) => {
  const [editedTask, setEditedTask] = useState(task);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    setEditedTask(task); // Update local state if task prop changes
  }, [task]);

  if (!task) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubtaskChange = (index, field, value) => {
    const updatedSubtasks = [...(editedTask.subtasks || [])];
    updatedSubtasks[index] = { ...updatedSubtasks[index], [field]: value };
    setEditedTask(prev => ({ ...prev, subtasks: updatedSubtasks }));
  };

  const addSubtask = () => {
    const newSubtask = { id: Date.now(), title: '', completed: false };
    setEditedTask(prev => ({ ...prev, subtasks: [...(prev.subtasks || []), newSubtask] }));
  };

  const deleteSubtask = (index) => {
    const updatedSubtasks = (editedTask.subtasks || []).filter((_, i) => i !== index);
    setEditedTask(prev => ({ ...prev, subtasks: updatedSubtasks }));
  };

  const addComment = () => {
    if (newComment.trim() === '') return;
    const comment = {
      id: Date.now(),
      author: 'Current User', // Replace with actual user data
      avatar: 'https://via.placeholder.com/30',
      text: newComment,
      timestamp: new Date().toISOString(),
    };
    setEditedTask(prev => ({ ...prev, comments: [...(prev.comments || []), comment] }));
    setNewComment('');
  };

  // Mock file upload handler
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const newAttachment = {
            id: Date.now(),
            name: file.name,
            url: URL.createObjectURL(file), // Temporary URL for preview
            type: file.type,
            size: file.size,
        };
        setEditedTask(prev => ({ ...prev, attachments: [...(prev.attachments || []), newAttachment] }));
    }
  };

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass">
        <div className="modal-header">
          <input 
            type="text" 
            name="title" 
            value={editedTask.title || ''} 
            onChange={handleChange} 
            className="modal-title-input"
            placeholder="Task Title"
            style={{fontSize: '1.8em', background: 'transparent', border: 'none', color: 'var(--neon-accent-color)', fontWeight: 'bold', width: 'calc(100% - 40px)'}}
          />
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal"><FaTimes /></button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea 
              id="description" 
              name="description" 
              value={editedTask.description || ''} 
              onChange={handleChange}
              placeholder="Add a detailed description..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select id="status" name="status" value={editedTask.status || 'To Do'} onChange={handleChange}>
                <option value="Backlog">Backlog</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="QA">QA / Review</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select id="priority" name="priority" value={editedTask.priority || 'Medium'} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input 
                type="date" 
                id="dueDate" 
                name="dueDate" 
                value={editedTask.dueDate ? new Date(editedTask.dueDate).toISOString().split('T')[0] : ''} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="assignee">Assignee</label>
              {/* This would typically be a dropdown of users */}
              <input 
                type="text" 
                id="assignee" 
                name="assigneeName" // Assuming assignee is an object {name: '', avatar: ''}
                value={editedTask.assignee?.name || ''} 
                onChange={(e) => setEditedTask(prev => ({...prev, assignee: {...prev.assignee, name: e.target.value}}))}
                placeholder="Assign to..."
              />
            </div>
          </div>

          {/* Sub-tasks Section */}
          <div className="modal-section">
            <h4>Sub-tasks <button onClick={addSubtask} className="inline-add-btn"><FaPlus /></button></h4>
            {editedTask.subtasks && editedTask.subtasks.length > 0 ? (
              <ul className="subtask-list">
                {editedTask.subtasks.map((sub, index) => (
                  <li key={sub.id || index} className="subtask-item">
                    <input 
                      type="checkbox" 
                      checked={sub.completed}
                      onChange={(e) => handleSubtaskChange(index, 'completed', e.target.checked)}
                    />
                    <input 
                      type="text" 
                      value={sub.title}
                      onChange={(e) => handleSubtaskChange(index, 'title', e.target.value)}
                      placeholder="Sub-task description"
                      className={`subtask-title-input ${sub.completed ? 'completed' : ''}`}
                    />
                    <button onClick={() => deleteSubtask(index)} className="delete-item-btn" aria-label="Delete sub-task"><FaTrash /></button>
                  </li>
                ))}
              </ul>
            ) : <p>No sub-tasks yet.</p>}
          </div>

          {/* Attachments Section */}
          <div className="modal-section">
            <h4>Attachments <label htmlFor="file-upload" className="inline-add-btn file-upload-label"><FaPaperclip /> Add</label></h4>
            <input type="file" id="file-upload" onChange={handleFileUpload} style={{display: 'none'}} />
            {editedTask.attachments && editedTask.attachments.length > 0 ? (
              <ul className="attachment-list">
                {editedTask.attachments.map(att => (
                  <li key={att.id} className="attachment-item">
                    <FaFileAlt className="icon" /> 
                    <a href={att.url} target="_blank" rel="noopener noreferrer">{att.name}</a> 
                    ({(att.size / 1024).toFixed(1)} KB)
                    {/* Add a delete button for attachments if needed */}
                  </li>
                ))}
              </ul>
            ) : <p>No attachments yet.</p>}
          </div>

          {/* Comments Section */}
          <div className="modal-section">
            <h4>Comments</h4>
            <div className="comment-list">
              {(editedTask.comments || []).map(comment => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-header">
                    <span className="comment-author">
                        {comment.avatar ? <img src={comment.avatar} alt="avatar" style={{width: '24px', height: '24px', borderRadius: '50%', marginRight: '8px'}}/> : <FaUserCircle style={{marginRight: '8px'}}/>}
                        {comment.author}
                    </span>
                    <span className="comment-timestamp">{new Date(comment.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="comment-body">{comment.text}</p>
                </div>
              ))}
            </div>
            <div className="add-comment-form">
              <textarea 
                value={newComment} 
                onChange={(e) => setNewComment(e.target.value)} 
                placeholder="Add a comment..."
              />
              <button onClick={addComment} className="primary small">Post Comment</button>
            </div>
          </div>

        </div>

        <div className="modal-actions">
          <button onClick={handleDelete} className="button delete-btn"><FaTrash /> Delete Task</button>
          <div>
            <button onClick={onClose} className="button secondary">Cancel</button>
            <button onClick={handleSave} className="button primary">Save Changes</button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .modal-title-input {
            font-size: 1.8em; 
            background: transparent; 
            border: none; 
            color: var(--neon-accent-color); 
            font-weight: bold; 
            width: calc(100% - 40px);
            padding: 5px 0;
        }
        .modal-title-input:focus {
            outline: none;
            border-bottom: 1px solid var(--neon-accent-color);
        }
        .inline-add-btn {
            background: none; border: none; color: var(--neon-accent-color); cursor: pointer; margin-left: 10px; font-size: 0.9em;
        }
        .inline-add-btn:hover { text-decoration: underline; }
        .file-upload-label { display: inline-flex; align-items: center; cursor: pointer; }
        .file-upload-label .icon { margin-right: 5px; }
        .subtask-title-input {
            flex-grow: 1;
            background: transparent;
            border: none;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            color: #e0e0e0;
            padding: 5px;
            margin: 0 10px;
        }
        .subtask-title-input.completed {
            text-decoration: line-through;
            color: #888;
        }
        .subtask-title-input:focus {
            outline: none;
            border-bottom-color: var(--neon-accent-color);
        }
        .delete-item-btn {
            background: none; border: none; color: #888; cursor: pointer; font-size: 0.9em;
        }
        .delete-item-btn:hover { color: #FF4747; }
      `}</style>
    </div>
  );
};

export default TaskDetailModal;
