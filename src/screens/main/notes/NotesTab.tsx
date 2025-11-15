import { useState } from 'react';
import { Plus, Search, Clock, Tag } from 'lucide-react-native';
import { Badge } from '../../../components/ui/badge';
import type { Note } from '../../../types';

interface NotesTabProps {
  notes: Note[];
  onAddNote: () => void;
  onEditNote: (note: Note) => void;
}

export default function NotesTab({ notes, onAddNote, onEditNote }: NotesTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'recipe':
        return 'bg-accent text-primary';
      case 'shopping':
        return 'bg-muted text-primary';
      case 'idea':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-accent text-primary';
    }
  };

  const filteredNotes = notes.filter(
    (note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tag.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = !selectedTag || note.tag === selectedTag;
      
      return matchesSearch && matchesTag;
    }
  );

  // Get unique tags
  const uniqueTags = Array.from(new Set(notes.map((note) => note.tag)));

  // Sort notes by update date
  const sortedNotes = [...filteredNotes].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="p-6 pb-24">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-primary">My Notes</h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="w-5 h-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-10 pr-4 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-primary placeholder:text-muted-foreground"
          />
        </div>

        {/* Tag Filter */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              !selectedTag
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-card text-muted-foreground border border-border hover:bg-muted'
            }`}
          >
            All ({notes.length})
          </button>
          {uniqueTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-muted-foreground border border-border hover:bg-muted'
              }`}
            >
              {tag} ({notes.filter((n) => n.tag === tag).length})
            </button>
          ))}
        </div>
        
        <p className="text-muted-foreground">
          {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'} 
          {searchQuery && ' found'}
        </p>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 gap-4">
        {sortedNotes.map((note) => (
          <button
            key={note.id}
            onClick={() => onEditNote(note)}
            className="bg-card rounded-2xl p-5 shadow-sm border border-border text-left hover:shadow-md hover:ring-2 hover:ring-primary/50 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <Badge className={`${getTagColor(note.tag)}`}>{note.tag}</Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {formatDate(note.updatedAt)}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-primary mb-2">
              {note.title}
            </h3>

            {/* Content Preview */}
            <p className="text-muted-foreground text-sm line-clamp-2">
              {note.content}
            </p>
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            {searchQuery || selectedTag ? (
              <Search className="w-10 h-10 text-muted-foreground" />
            ) : (
              <Plus className="w-10 h-10 text-muted-foreground" />
            )}
          </div>
          <h3 className="text-primary mb-2">
            {searchQuery || selectedTag ? 'No notes found' : 'No notes yet'}
          </h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery || selectedTag
              ? 'Try a different search or filter'
              : 'Start by creating your first note'}
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={onAddNote}
        className="fixed bottom-24 right-8 w-16 h-16 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
      >
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
}