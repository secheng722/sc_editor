"use client";
import Sidebar from "@/components/sidebar";
import { useEffect } from "react";
import Create from "@/components/create";
import { useDisplayNote, useNotesStore } from "@/state/note";
import { useViewStore, View } from "@/state/view";
import Introduction from "@/components/intro";
import Editor from "./components/editor";

export default function Home() {
  
  const fetchNotes = useNotesStore((lp) => lp.fetch);

  const notes = useNotesStore((lp) => lp.notes);

  const displayedView = useViewStore((lp) => lp.view);

  const changeToNoteView = useViewStore((lp) => lp.setNote);

  const changeToIntroView = useViewStore((lp) => lp.setIntro);

  const { noteId, setNoteId } = useDisplayNote();

  useEffect(() => {
    (async () => {
      await fetchNotes();
      changeToIntroView();
    })();
  }, [fetchNotes, changeToIntroView, changeToNoteView, setNoteId]);

  const getDisplayComponent = (displayedId: number, view: View) => {
    const note = notes?.find((note) => note.id == displayedId);
    if (view == View.Intro) {
      return <Introduction />;
    } else if (view == View.Create) {
      return <Create />;
    } else if (view == View.Note) {
      return <Editor note={note!} />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-background">
      <Sidebar />
      {getDisplayComponent(noteId, displayedView!)}
    </div>
  );
}
