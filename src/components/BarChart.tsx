import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  protein: number;
  carbohydrates: number;
  fats: number;
}

const MacronutrientBarChart = ({ protein, carbohydrates, fats }: Props) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily Macronutrients',
        font: {
          size: 16,
          family: "'Arial', sans-serif",
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Grams'
        }
      }
    }
  };

  const data = {
    labels: ['Macronutrients'],
    datasets: [
      {
        label: 'Protein',
        data: [protein],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderWidth: 1,
      },
      {
        label: 'Carbohydrates',
        data: [carbohydrates],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderWidth: 1,
      },
      {
        label: 'Fats',
        data: [fats],
        backgroundColor: 'rgba(255, 206, 86, 0.7)',
        borderWidth: 1,
      }
    ],
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default MacronutrientBarChart; 