"use client"; // this registers <Editor> as a Client Component
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { Block, PartialBlock } from "@blocknote/core";
import "@blocknote/mantine/style.css";
import { useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { SquareM } from "lucide-react";
import { Note } from "@/state/note";
import { invoke } from "@tauri-apps/api";
import { DeleteButton } from "./delete-button";

interface IEditorProps {
  note: Note;
}

export default function Editor({ note }: IEditorProps) {
  const { theme } = useTheme();

  const editor = useCreateBlockNote({
    trailingBlock: false,
  });

  useEffect(() => {
    (async () => {
      const dbData = await invoke<string>("get_note_data", { id: note.id });
      const blocks =
        dbData !== "" ? (JSON.parse(dbData) as PartialBlock[]) : [];
      editor.replaceBlocks(editor.document, blocks);
    })();
  }, [note, editor]);

  const updateNote = (blocks: Block[]) => {
    const action = async () => {
      await invoke("update_note", {
        id: note.id,
        data: JSON.stringify(blocks),
      });
    };
    const timeOut = setTimeout(() => {
      action();
    }, 200);
    return () => clearTimeout(timeOut);
  };

  return (
    <div className="h-full w-full space-y-4 overflow-y-auto bg-bgshade py-8 font-sans text-foreground">
      <div className="flex justify-between px-16 text-muted-foreground">
        <div className="flex w-full items-center space-x-3">
          <SquareM size={16} />
          <h3 className="w-16 overflow-hidden overflow-ellipsis whitespace-nowrap lg:w-64">
            {note.title}
          </h3>
        </div>
        <div className="flex items-center space-x-3">
          <DeleteButton note={note} />
        </div>
      </div>
      <BlockNoteView
        className="px-7"
        theme={theme == "dark" ? "dark" : "light"}
        editor={editor}
        onChange={() => updateNote(editor.document)}
      />
    </div>
  );
}
