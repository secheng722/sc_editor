import { Plus, SquareM } from "lucide-react";
import { Button } from "./ui/button";
import { Note, useDisplayNote, useNotesStore } from "@/state/note";
import { useViewStore } from "@/state/view";
import { ModeToggle } from "./theme-change";

export default function Sidebar() {
  const notes = useNotesStore((lp) => lp.notes);

  const newNote = () => {
    changeToCreateView();
  };

  const changeToCreateView = useViewStore((lp) => lp.setCreate);

  const changeToIntroView = useViewStore((lp) => lp.setIntro);

  const openNote = async (note: Note) => {
    changeToNoteView();
    changeNote(note.id!);
  };

  const changeToNoteView = useViewStore((lp) => lp.setNote);

  const changeNote = useDisplayNote((lp) => lp.setNoteId);

  return (
    <div className="flex h-screen w-1/6 min-w-min flex-col border-r border-r-muted text-sm">
      <div className="flex flex-col space-y-4 px-5 py-6 font-heading text-lg font-bold text-foreground">
        <div className="flex items-center justify-between">
          <div onClick={changeToIntroView}>ScEditor</div>
          <ModeToggle />
        </div>
      </div>
      <hr className="w-1/5 border-muted-foreground/30"></hr>
      <div className="h-full w-64 overflow-y-auto px-3 text-muted-foreground ">
        {notes &&
          notes.map((note) => (
            <Button
              className="flex w-full items-center space-x-3 rounded-md px-2 py-2 hover:bg-accent"
              key={note.id}
              onClick={() => openNote(note)}
              variant="ghost"
            >
              <SquareM size={16} />
              <span className="flex w-4/5">
                <h1 className="overflow-hidden  overflow-ellipsis whitespace-nowrap">
                  {note.title}
                </h1>
              </span>
            </Button>
          ))}
      </div>
      <div className="flex w-full flex-col justify-center space-y-2 p-3">
        <Button
          className="w-full space-x-2 "
          onClick={newNote}
          variant="outline"
        >
          <Plus size={16} />
          <span className="lg:inline">New Note</span>
        </Button>
      </div>
    </div>
  );
}
