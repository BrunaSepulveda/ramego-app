import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { BrothProtein } from './types';

interface AppStateType {
  broths: BrothProtein[];
  proteins: BrothProtein[];
  changeBroths: (broths: BrothProtein[]) => void;
  changeProteins: (proteins: BrothProtein[]) => void;
}

const store = create<AppStateType>()(
  persist(
    (set) => ({
      broths: [],
      proteins: [],
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
