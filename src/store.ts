import { create } from "zustand";

type UserProfileStore = {
  name: string;
  email: string;
  weightKg: number;
  heightCm: number;
  setName: (newName: string) => void;
  setEmail: (newEmail: string) => void;
  setWeightKg: (newWeight: number) => void;
  setHeightCm: (newHeight: number) => void;
};

export const useUserProfileStore = create<UserProfileStore>((set) => ({
  name: '',
  email: '',
  weightKg: 0,
  heightCm: 0,
  setName: (newName: string) => {
    set(() => ({ name: newName }));
  },
  setEmail: (newEmail: string) => {
    set(() => ({ email: newEmail }));
  },
  setWeightKg: (newWeight: number) => {
    set(() => ({ weightKg: newWeight }));
  },
  setHeightCm: (newHeight: number) => {
    set(() => ({ heightCm: newHeight }));
  },
}));

type waterTargetStore = {
  waterTarget: number;
  setWaterTarget: (newWaterTarget: number) => void;  // New action to set a specific waterTarget value
};

export const useWaterTargetStore = create<waterTargetStore>((set) => ({
  waterTarget: 0,
  setWaterTarget: (newWaterTarget: number) => {
    set(() => ({ waterTarget: newWaterTarget }));
  },
}));



type waterConsumedStore = {
  waterConsumed: number;
  setWaterConsumed: (newWaterConsumed: number) => void;
  increaseConsumed: (amount: number) => void;
  decreaseConsumed: (amount: number) => void;
};

export const useWaterConsumedStore = create<waterConsumedStore>((set) => ({
  waterConsumed: 0,
  setWaterConsumed: (newWaterConsumed: number) => {
    set(() => ({ waterConsumed: newWaterConsumed }));
  },
  increaseConsumed: (amount: number) => {
    set((state) => ({ waterConsumed: state.waterConsumed + amount }));
  },
  decreaseConsumed: (amount: number) => {
    set((state) => ({ waterConsumed: state.waterConsumed - amount }));
  },
}));


type calorieTargetStore = {
  calorieTarget: number;
  setCalorieTarget: (newCalorieTarget: number) => void;  // New action to set a specific calorieTarget value
};

export const useCalorieTargetStore = create<calorieTargetStore>((set) => ({
  calorieTarget: 0,
  setCalorieTarget: (newcalorieTarget: number) => {
    set(() => ({ calorieTarget: newcalorieTarget }));
  },
}));



type calorieConsumedStore = {
  calorieConsumed: number;
  setcalorieConsumed: (newcalorieConsumed: number) => void;
  increaseCalorieConsumed: (amount: number) => void;
  decreaseCalorieConsumed: (amount: number) => void;
};

export const useCalorieConsumedStore = create<calorieConsumedStore>((set) => ({
  calorieConsumed: 0,
  setcalorieConsumed: (newcalorieConsumed: number) => {
    set(() => ({ calorieConsumed: Number(newcalorieConsumed.toFixed(1)) }));
  },
  increaseCalorieConsumed: (amount: number) => {
    set((state) => ({ 
      calorieConsumed: Number((state.calorieConsumed + amount).toFixed(1)) 
    }));
  },
  decreaseCalorieConsumed: (amount: number) => {
    set((state) => ({ 
      calorieConsumed: Number((state.calorieConsumed - amount).toFixed(1)) 
    }));
  },
}));

type customGoal = {
  customGoal: string;
  setCustomGoal: (newCustomGoal: string) => void;  
};

export const useCustomGoalStore = create<customGoal>((set) => ({
  customGoal: "",
  setCustomGoal: (newCustomGoal: string) => {
    set(() => ({ customGoal: newCustomGoal }));
  },
}));


type customGoalTarget = {
  customGoalTarget: number;
  setCustomGoalTarget: (newCustomGoalTarget: number) => void;  
};

export const useCustomGoalTargetStore = create<customGoalTarget>((set) => ({
  customGoalTarget: 0,
  setCustomGoalTarget: (newCustomGoalTarget: number) => {
    set(() => ({ customGoalTarget: newCustomGoalTarget }));
  },
}));

type customGoalConsumed  = {
  customGoalConsumed: number;
  setCustomGoalConsumed: (newCustomGoalConsumed: number) => void;  
};

export const useCustomGoalConsumedStore = create<customGoalConsumed>((set) => ({
  customGoalConsumed: 0,
  setCustomGoalConsumed: (newCustomGoalConsumed: number) => {
    set(() => ({ customGoalConsumed: newCustomGoalConsumed }));
  },
}));

type MacronutrientsStore = {
  protein: number;
  carbohydrates: number;
  fats: number;
  setProtein: (newAmount: number) => void;
  setCarbohydrates: (newAmount: number) => void;
  setFats: (newAmount: number) => void;
  increaseProtein: (amount: number) => void;
  increaseCarbohydrates: (amount: number) => void;
  increaseFats: (amount: number) => void;
};

export const useMacronutrientsStore = create<MacronutrientsStore>((set) => ({
  protein: 0,
  carbohydrates: 0,
  fats: 0,
  
  setProtein: (newAmount: number) => {
    set(() => ({ protein: newAmount }));
  },
  setCarbohydrates: (newAmount: number) => {
    set(() => ({ carbohydrates: newAmount }));
  },
  setFats: (newAmount: number) => {
    set(() => ({ fats: newAmount }));
  },

  increaseProtein: (amount: number) => {
    set((state) => ({ protein: state.protein + amount }));
  },
  increaseCarbohydrates: (amount: number) => {
    set((state) => ({ carbohydrates: state.carbohydrates + amount }));
  },
  increaseFats: (amount: number) => {
    set((state) => ({ fats: state.fats + amount }));
  }
}));

type ThemeStore = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));