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
  increaseCalorieConsumed: (entry: NutritionEntry) => void;
  decreaseCalorieConsumed: (amount: number) => void;
};

export const useCalorieConsumedStore = create<calorieConsumedStore>((set) => ({
  calorieConsumed: 0,
  setcalorieConsumed: (newcalorieConsumed: number) => {
    set(() => ({ calorieConsumed: Number(newcalorieConsumed.toFixed(1)) }));
  },
  increaseCalorieConsumed: (entry: NutritionEntry) => {
    set((state) => ({ 
      calorieConsumed: Number((state.calorieConsumed + entry.value).toFixed(1)) 
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

export interface NutritionEntry {
  value: number;
  timestamp: string;
}

type MacronutrientsStore = {
  entries: NutritionEntry[];
  protein: NutritionEntry[];
  carbohydrates: NutritionEntry[];
  fats: NutritionEntry[];
  setProtein: (newAmount: number) => void;
  setCarbohydrates: (newAmount: number) => void;
  setFats: (newAmount: number) => void;
  increaseProtein: (entry: NutritionEntry) => void;
  increaseCarbohydrates: (entry: NutritionEntry) => void;
  increaseFats: (entry: NutritionEntry) => void;
};

export const useMacronutrientsStore = create<MacronutrientsStore>((set) => ({
  entries: [] as NutritionEntry[],
  protein: [] as NutritionEntry[],
  carbohydrates: [] as NutritionEntry[],
  fats: [] as NutritionEntry[],
  
  setProtein: (newAmount: number) => {
    set(() => ({ 
      protein: [{
        value: newAmount,
        timestamp: new Date().toISOString()
      }]
    }));
  },
  setCarbohydrates: (newAmount: number) => {
    set(() => ({ 
      carbohydrates: [{
        value: newAmount,
        timestamp: new Date().toISOString()
      }]
    }));
  },
  setFats: (newAmount: number) => {
    set(() => ({ 
      fats: [{
        value: newAmount,
        timestamp: new Date().toISOString()
      }]
    }));
  },

  increaseProtein: (entry: NutritionEntry) =>
    set((state) => ({
      protein: [...state.protein, entry]
    })),
  
  increaseCarbohydrates: (entry: NutritionEntry) =>
    set((state) => ({
      carbohydrates: [...state.carbohydrates, entry]
    })),
  
  increaseFats: (entry: NutritionEntry) =>
    set((state) => ({
      fats: [...state.fats, entry]
    })),
}));

type ThemeStore = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));

interface WeightEntry {
  value: number;
  timestamp: string;
}

type WeightStore = {
  weights: WeightEntry[];
  targetWeight: number;
  setTargetWeight: (newTarget: number) => void;
  addWeightEntry: (entry: WeightEntry) => void;
};

export const useWeightStore = create<WeightStore>((set) => ({
  weights: [] as WeightEntry[],
  targetWeight: 0,
  
  setTargetWeight: (newTarget: number) => {
    set(() => ({ targetWeight: newTarget }));
  },
  
  addWeightEntry: (entry: WeightEntry) =>
    set((state) => ({
      weights: [...state.weights, entry]
    })),
}));