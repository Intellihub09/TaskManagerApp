import React, { useState, useEffect } from 'react';
import './NotesSection.css';
import { FaPlus, FaTrash } from 'react-icons/fa';

const NotesSection = () => {
  const [notes, setNotes] = useState([]);

  // Load notes from local storage on component mount
  useEffect(() => {
    const storedNotes = localStorage.getItem('taskManagerNotes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  // Save notes to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('taskManagerNotes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'New Note',
      content: '',
      timestamp: new Date().toISOString(),
      color: '#2a2a3e', // Default note color, slightly different from page bg
    };
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const updateNoteField = (id, field, value) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, [field]: value, timestamp: new Date().toISOString() } : note
    ));
  };

  return (
    <div className="notes-section-container glass">
      <div className="notes-header">
        {/* <h2>My Notes</h2> */}
        <button onClick={addNote} className="add-note-btn primary">
          <FaPlus /> Add Note
        </button>
      </div>
      <div className="notes-grid">
        {notes.map(note => (
          <div key={note.id} className="note-card glass glass-hover" style={{ backgroundColor: note.color }}>
            <div className="note-card-header">
              <input 
                type="text" 
                value={note.title}
                onChange={(e) => updateNoteField(note.id, 'title', e.target.value)}
                placeholder="Note Title"
              />
              <button onClick={() => deleteNote(note.id)} className="delete-note-btn" aria-label="Delete Note">
                <FaTrash />
              </button>
            </div>
            <textarea
              value={note.content}
              onChange={(e) => updateNoteField(note.id, 'content', e.target.value)}
              placeholder="Type your note here..."
            />
            <div className="note-card-footer">
              <span className="timestamp">
                {new Date(note.timestamp).toLocaleDateString()} {new Date(note.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </span>
              <div className="color-picker">
                <input 
                  type="color" 
                  value={note.color}
                  onChange={(e) => updateNoteField(note.id, 'color', e.target.value)}
                  title="Change note color"
                />
              </div>
            </div>
          </div>
        ))}
        {notes.length === 0 && (
            <div className="placeholder-container text-center" style={{gridColumn: '1 / -1'}}>
                <p>No notes yet. Click "Add Note" to create one!</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default NotesSection;
