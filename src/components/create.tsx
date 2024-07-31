import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { useDisplayNote, useNotesStore } from "@/state/note";
import { useViewStore } from "@/state/view";
export default function Create() {
  const [title, setTitle] = useState<string>("");

  const addNote = useNotesStore((lp) => lp.add);

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const changeNote = useDisplayNote((lp) => lp.setNoteId);

  const changeToNoteView = useViewStore((lp) => lp.setNote);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newNote = {
      title: title || "Untitled",
      data: "",
    };
    const addedNote = await addNote(newNote);
    changeNote(addedNote.id!);
    changeToNoteView();
  };

  return (
    <div className="flex flex-col w-10/12 items-center justify-center bg-bgshade text-sm text-muted-foreground">
      <div className="flex w-3/4 ">
        <h1 className="font-heading text-foreground">Create new note</h1>
      </div>
      <form
        className="flex w-3/4 flex-col items-center justify-center space-y-2"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          placeholder="Title"
          className="w-full rounded-md border border-border bg-bgshade px-4 py-3 outline-none focus:border-primary/50"
          onKeyUp={onChange}
          autoFocus
        ></input>

        <Button
          type="submit"
          className="w-1/2  px-4 py-2  shadow-xl transition duration-300 ease-in-out hover:scale-105 "
          variant="outline"
        >
          Create
        </Button>
      </form>
    </div>
  );
}
