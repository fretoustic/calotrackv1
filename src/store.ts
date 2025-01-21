import { create } from "zustand";

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
    set(() => ({ calorieConsumed: newcalorieConsumed }));
  },
  increaseCalorieConsumed: (amount: number) => {
    set((state) => ({ calorieConsumed: state.calorieConsumed + amount }));
  },
  decreaseCalorieConsumed: (amount: number) => {
    set((state) => ({ calorieConsumed: state.calorieConsumed - amount }));
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