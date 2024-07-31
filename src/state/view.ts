import { create } from "zustand";

export enum View {
  Intro,
  Create,
  Note,
}

interface ViewState {
  view?: View;
  setIntro: () => void;
  setCreate: () => void;
  setNote: () => void;
}

export const useViewStore = create<ViewState>((set) => ({
  view: undefined,
  setIntro: () => set({ view: View.Intro }),
  setCreate: () => set({ view: View.Create }),
  setNote: () => set({ view: View.Note }),
}));
