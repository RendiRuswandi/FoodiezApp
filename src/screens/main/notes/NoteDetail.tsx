import { useState, useEffect } from 'react';
import { ArrowLeft, Trash2, Save } from 'lucide-react-native';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import type { Note } from '../../../types';

interface NoteDetailProps {
  note: Note | null;
  onSave: (note: Note) => void;
  onDelete: (noteId: string) => void;
  onBack: () => void;
}

export default function NoteDetail({ note, onSave, onDelete, onBack }: NoteDetailProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('Recipe');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTag(note.tag);
    } else {
      setTitle('');
      setContent('');
      setTag('Recipe');
    }
  }, [note]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in all fields');
      return;
    }

    onSave({
      id: note?.id || '',
      title,
      content,
      tag,
      createdAt: note?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  const handleDelete = () => {
    if (note) {
      onDelete(note.id);
      setShowDeleteConfirm(false);
    }
  };

  const tags = ['Recipe', 'Shopping', 'Idea', 'Other'];

  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = content.length;

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-6 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={onBack}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-primary" />
        </button>
        <h2 className="text-primary">
          {note ? 'Edit Note' : 'New Note'}
        </h2>
        <Button
          onClick={handleSave}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {/* Tag Selection */}
          <div>
            <label className="text-primary mb-2 block">
              Tag
            </label>
            <div className="grid grid-cols-2 gap-3">
              {tags.map((tagOption) => (
                <button
                  key={tagOption}
                  onClick={() => setTag(tagOption)}
                  className={`px-4 py-3 rounded-xl transition-all ${
                    tag === tagOption
                      ? 'bg-primary text-primary-foreground shadow-md scale-105'
                      : 'bg-card text-muted-foreground border border-border hover:bg-muted'
                  }`}
                >
                  {tagOption === 'Recipe' && '📖'}
                  {tagOption === 'Shopping' && '🛒'}
                  {tagOption === 'Idea' && '💡'}
                  {tagOption === 'Other' && '📝'}
                  {' '}{tagOption}
                </button>
              ))}
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label className="text-primary mb-2 block">
              Title
            </label>
            <Input
              type="text"
              placeholder="Enter note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-card border-border focus:border-primary h-14"
            />
          </div>

          {/* Content Textarea */}
          <div>
            <label className="text-primary mb-2 block">
              Content
            </label>
            <Textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-card border-border focus:border-primary min-h-[300px] resize-none"
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                {wordCount} words • {charCount} characters
              </p>
              {note && (
                <p className="text-xs text-muted-foreground">
                  Last edited: {new Date(note.updatedAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              )}
            </div>
          </div>

          {/* Quick Templates */}
          {!note && tag === 'Recipe' && (
            <div>
              <label className="text-primary mb-2 block">
                Quick Recipe Template
              </label>
              <button
                onClick={() => {
                  setTitle('New Recipe');
                  setContent('Ingredients:\n- \n- \n- \n\nInstructions:\n1. \n2. \n3. \n\nNotes:\n');
                }}
                className="w-full p-4 bg-card border border-border rounded-xl hover:bg-muted transition-colors text-left"
              >
                <div className="text-primary mb-1">Use Recipe Template</div>
                <div className="text-xs text-muted-foreground">
                  Pre-formatted recipe structure
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Button (only show when editing) */}
      {note && (
        <div className="p-6 bg-card border-t border-border">
          {showDeleteConfirm ? (
            <div className="space-y-3">
              <p className="text-center text-primary">Are you sure you want to delete this note?</p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  variant="outline"
                  className="border-border"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => setShowDeleteConfirm(true)}
              variant="outline"
              className="w-full h-14 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Delete Note
            </Button>
          )}
        </div>
      )}
    </div>
  );
}