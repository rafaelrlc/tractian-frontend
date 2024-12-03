import { atom } from 'jotai';
import { SelectedHeaderButtonType, SelectedDashboardButtonType } from './types';

export const selectedHeaderButtonAtom = atom<SelectedHeaderButtonType>("Tobias");
export const selectedDashboardButtonAtom = atom<SelectedDashboardButtonType>(null);

export const toggleDashboardButtonAtom = atom(
  (get) => get(selectedDashboardButtonAtom),
  (get, set, buttonCode: SelectedDashboardButtonType) => {
    const currentSelection = get(selectedDashboardButtonAtom);
    set(selectedDashboardButtonAtom, currentSelection === buttonCode ? null : buttonCode);
  }
);