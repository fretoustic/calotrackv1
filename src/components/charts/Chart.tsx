import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../homepage/homePage.css";
ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  target: number;
  consumed: number;
  unit: string;
}

const PieChartCard = ({ target, consumed, unit }: Props) => {
  const isComplete = consumed >= target;
  const remainingAmount = Math.max(target - consumed, 0).toFixed(2);

  const chartData = {
    labels: ["Consumed", "Remaining"],
    datasets: [
      {
        data: isComplete ? [target, 0] : [consumed, remainingAmount],
        backgroundColor: isComplete
          ? ["#4BC0C0", "#4BC0C0"]
          : ["#4BC0C0", "#E0E0E0"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 14,
            family: "'Arial', sans-serif",
          },
          generateLabels: (chart: any) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => ({
                text: `${label}: ${data.datasets[0].data[i]}${unit}`,
                fillStyle: isComplete
                  ? "#4BC0C0"
                  : data.datasets[0].backgroundColor[i],
                hidden: false,
                lineCap: undefined,
                lineDash: undefined,
                lineDashOffset: undefined,
                lineJoin: undefined,
                lineWidth: undefined,
                strokeStyle: undefined,
                pointStyle: "circle",
                index: i,
              }));
            }
            return [];
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label;
            const value = context.raw;
            return `${label}: ${value}${unit}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "240px", height: "240px" }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChartCard;
