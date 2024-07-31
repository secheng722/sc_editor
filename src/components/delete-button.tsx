import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Note, useNotesStore } from "@/state/note";
import { useViewStore } from "@/state/view";
import { invoke } from "@tauri-apps/api";
import { Trash2 } from "lucide-react";

interface IDeleteButtonProps {
  note: Note;
}

export function DeleteButton({ note }: IDeleteButtonProps) {
  const fetch = useNotesStore((lp) => lp.fetch);
  const changeToIntroView = useViewStore((lp) => lp.setIntro);

  const onClick = async () => {
    changeToIntroView();
    await invoke("delete_note", { id: note.id });
    await fetch();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确定删除?</AlertDialogTitle>
          <AlertDialogDescription>
            删除后将无法恢复，请确认是否删除
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>确认</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
