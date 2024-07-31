-- Add up migration script here
create table note_data(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  noteId INTEGER NOT NULL,
  data TEXT NOT NULL
);
