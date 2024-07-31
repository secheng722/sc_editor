import { invoke } from "@tauri-apps/api";
import { create } from "zustand";

export interface Note {
  id?: number;
  title: string;
}

interface FetchNotes {
  notes: Note[];
}

interface LoadNotesStore {
  notes: Note[];
  add: (note: Note) => Promise<Note>;
  fetch: () => Promise<FetchNotes>;
}

interface displayNoteState {
  noteId: number;
  setNoteId: (noteId: number) => void;
}

export const useDisplayNote = create<displayNoteState>((set) => ({
  noteId: 0,
  setNoteId: (noteId: number) => set({ noteId }),
}));

export const useNotesStore = create<LoadNotesStore>((set) => ({
  notes: [],
  add: async (note: Note) => {
    const createNote: Note = await invoke("add_note", {
      title: note.title,
    });
    set((state) => ({ notes: [...state.notes, createNote] }));
    return createNote;
  },
  fetch: async () => {
    const notes: Note[] = await invoke("get_notes");
    set({ notes });
    return {
      notes,
    };
  },
}));
