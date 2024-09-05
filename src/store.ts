import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { BrothProtein } from './types';

interface AppStateType {
  broths: BrothProtein[];
  proteins: BrothProtein[];
  brothId: string;
  proteinId: string;
  changeBrothId: (brothId: string) => void;
  changeProteinId: (proteinId: string) => void;
  changeBroths: (broths: BrothProtein[]) => void;
  changeProteins: (proteins: BrothProtein[]) => void;
}

const store = create<AppStateType>()(
  persist(
    (set) => ({
      broths: [],
      proteins: [],
      brothId: '',
      proteinId: '',
      changeBrothId: (brothId: string) => set(() => ({ brothId })),
      changeProteinId: (proteinId: string) => set(() => ({ proteinId })),
      changeBroths: (broths: BrothProtein[]) => set(() => ({ broths })),
      changeProteins: (proteins: BrothProtein[]) => set(() => ({ proteins })),
    }),
    {
      name: 'AppStateStorage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useAppStateStorage = () => store.getState();
