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
  calorieHistory: NutritionEntry[];
  setcalorieConsumed: (newcalorieConsumed: number) => void;
  increaseCalorieConsumed: (entry: NutritionEntry) => void;
  decreaseCalorieConsumed: (amount: number) => void;
  addToCalorieHistory: (entry: NutritionEntry) => void;
  deleteFromCalorieHistory: (timestamp: string) => void;
};

export const useCalorieConsumedStore = create<calorieConsumedStore>((set) => ({
  calorieConsumed: 0,
  calorieHistory: [],
  setcalorieConsumed: (newcalorieConsumed: number) => {
    set(() => ({ calorieConsumed: Number(newcalorieConsumed.toFixed(1)) }));
  },
  increaseCalorieConsumed: (entry: NutritionEntry) => {
    set((state) => ({ 
      calorieConsumed: Number((state.calorieConsumed + entry.value).toFixed(1)),
      calorieHistory: [...state.calorieHistory, entry]
    }));
  },
  decreaseCalorieConsumed: (amount: number) => {
    set((state) => ({ 
      calorieConsumed: Number((state.calorieConsumed - amount).toFixed(1)) 
    }));
  },
  addToCalorieHistory: (entry: NutritionEntry) => {
    set((state) => ({
      calorieHistory: [...state.calorieHistory, entry]
    }));
  },
  deleteFromCalorieHistory: (timestamp: string) => {
    set((state) => {
      const entry = state.calorieHistory.find(e => e.timestamp === timestamp);
      const newHistory = state.calorieHistory.filter(e => e.timestamp !== timestamp);
      return {
        calorieHistory: newHistory,
        calorieConsumed: entry ? Number((state.calorieConsumed - entry.value).toFixed(1)) : state.calorieConsumed
      };
    });
  },
}));

interface CustomGoal {
  id: number;
  name: string;
  target: number;
  consumed: number;
  unit: string;
}

type CustomGoalsStore = {
  goals: CustomGoal[];
  addGoal: (name: string, target: number,id:number,unit:string) => void;
  updateGoal: (id: number, updates: Partial<CustomGoal>) => void;
  setConsumed: (id: number, amount: number) => void; // New function
};

export const useCustomGoalsStore = create<CustomGoalsStore>((set) => ({
  goals: [],
  
  addGoal: (name: string, target: number,id:number,unit:string) => {
    set((state) => ({
      goals: [...state.goals, {
        id,
        name,
        target,
        consumed: 0,
        unit: unit
      }]
    }));
  },


  updateGoal: (id: number, updates: Partial<CustomGoal>) => {
    set((state) => ({
      goals: state.goals.map(goal => 
        goal.id === id ? { ...goal, ...updates } : goal
      )
    }));
  },

  setConsumed: (id: number, amount: number) => {
    set((state) => ({
      goals: state.goals.map(goal =>
        goal.id === id ? { ...goal, consumed: amount } : goal
      )
    }));
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
  deleteProtein: (timestamp: string) => void;
  deleteCarbohydrates: (timestamp: string) => void;
  deleteFats: (timestamp: string) => void;
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

  deleteProtein: (timestamp: string) =>
    set((state) => ({
      protein: state.protein.filter(entry => entry.timestamp !== timestamp)
    })),
  
  deleteCarbohydrates: (timestamp: string) =>
    set((state) => ({
      carbohydrates: state.carbohydrates.filter(entry => entry.timestamp !== timestamp)
    })),
  
  deleteFats: (timestamp: string) =>
    set((state) => ({
      fats: state.fats.filter(entry => entry.timestamp !== timestamp)
    })),
}));

type MicronutrientsStore = {
  sugar: NutritionEntry[];
  fiber: NutritionEntry[];
  sodium: NutritionEntry[];
  potassium: NutritionEntry[];
  cholesterol: NutritionEntry[];
  increaseSugar: (entry: NutritionEntry) => void;
  increaseFiber: (entry: NutritionEntry) => void;
  increaseSodium: (entry: NutritionEntry) => void;
  increasePotassium: (entry: NutritionEntry) => void;
  increaseCholesterol: (entry: NutritionEntry) => void;
};

export const useMicronutrientsStore = create<MicronutrientsStore>((set) => ({
  sugar: [],
  fiber: [],
  sodium: [],
  potassium: [],
  cholesterol: [],
  
  increaseSugar: (entry: NutritionEntry) =>
    set((state) => ({
      sugar: [...state.sugar, entry]
    })),
  
  increaseFiber: (entry: NutritionEntry) =>
    set((state) => ({
      fiber: [...state.fiber, entry]
    })),
  
  increaseSodium: (entry: NutritionEntry) =>
    set((state) => ({
      sodium: [...state.sodium, entry]
    })),
  
  increasePotassium: (entry: NutritionEntry) =>
    set((state) => ({
      potassium: [...state.potassium, entry]
    })),
  
  increaseCholesterol: (entry: NutritionEntry) =>
    set((state) => ({
      cholesterol: [...state.cholesterol, entry]
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