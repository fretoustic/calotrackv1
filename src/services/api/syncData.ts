import axios from 'axios';
import { NutritionEntry } from '../../store';

interface SyncDataPayload {
  waterTarget: number;
  waterConsumed: number;
  calorieTarget: number;
  calorieConsumed: number;
  protein: NutritionEntry[];
  carbohydrates: NutritionEntry[];
  fats: NutritionEntry[];
  customGoals: Array<{
    id: number;
    name: string;
    target: number;
    consumed: number;
    unit: string;
  }>;
  targetWeight: number;
  weights: NutritionEntry[];
}

export const syncDataToServer = async (data: SyncDataPayload) => {
  const today = new Date().toISOString().split('T')[0];
  const token = document.cookie.split('; ').find(row => row.startsWith('authToken='))?.split('=')[1];

  try {
    await axios.post(`http://localhost:8080/api/goals/${today}`, {
      type: "water",
      goal: {
        goalName: "water",
        type: "L",
        goalValue: data.waterTarget,
        progressValue: data.waterConsumed
      }
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    await axios.post(`http://localhost:8080/api/goals/${today}`, {
      type: "calorie",
      goal: {
        goalName: "calories",
        type: "kcal",
        goalValue: data.calorieTarget,
        progressValue: data.calorieConsumed
      }
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    // Sync custom goals
    for (const goal of data.customGoals) {
      await axios.post(`http://localhost:8080/api/goals/${today}`, {
        type: "customgoal",
        goal: {
          goalName: goal.name,
          type: goal.unit,
          goalValue: goal.target,
          progressValue: goal.consumed
        }
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }

    // Sync weight data
    if (data.targetWeight > 0) {
      await axios.post(`http://localhost:8080/api/goals/${today}`, {
        type: "weight",
        goal: {
        goalName: "weight",
          goalValue: data.targetWeight,
          entries: data.weights
        }
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }
  } catch (error) {
    console.error('Error syncing data:', error);
  }
};

export const loadDataFromServer = async () => {
  const today = new Date().toISOString().split('T')[0];
  const token = document.cookie.split('; ').find(row => row.startsWith('authToken='))?.split('=')[1];

  try {
    const response = await axios.get(`http://localhost:8080/api/goals/${today}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    return response.data;
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
};
