import axios from "axios";

export const createGoal = async (name: string, unit: string, target: number) => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const token = document.cookie.split('; ').find(row => row.startsWith('authToken='))?.split('=')[1];
    const response = await axios.post(`http://localhost:8080/api/goals/${today}`, {
        "type": name,
        "goal": {
            "goalName": name,
            "type": unit,
            "goalValue": target,
            "progressValue": 0
        }
    }, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};
export const getGoal=async()=>{
    const today = new Date().toISOString().split('T')[0];
    const token = document.cookie.split('; ').find(row => row.startsWith('authToken='))?.split('=')[1];
    const response = await axios.get(`http://localhost:8080/api/goals/${today}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

export const updateNutritionData = async (data: any) => {
    const today = new Date().toISOString().split('T')[0];
    const response = await axios.post(`http://localhost:8080/api/nutrition/${today}`, data);
    return response.data;
};