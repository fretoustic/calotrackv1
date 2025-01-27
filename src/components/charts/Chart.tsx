import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../homepage/homePage.css";
import { useThemeStore } from "../../store";
ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  target: number;
  consumed: number;
  unit: string;
}

const PieChartCard = ({ target, consumed, unit }: Props) => {
  const { isDarkMode } = useThemeStore();
  const textColor = isDarkMode ? "#fff" : "#000";

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
        color: textColor,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div
      style={{
        width: "240px",
        height: "240px",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
      }}
    >
      <div style={{ flex: "1", minHeight: 0 }}>
        <Pie data={chartData} options={options} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          marginTop: "12px",
        }}
      >
        {chartData.labels.map((label: string, i: number) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: textColor,
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: isComplete
                  ? "#4BC0C0"
                  : chartData.datasets[0].backgroundColor[i],
              }}
            />
            <span style={{ fontSize: "14px", fontFamily: "Arial, sans-serif" }}>
              {`${label}: ${chartData.datasets[0].data[i]}${unit}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartCard;
