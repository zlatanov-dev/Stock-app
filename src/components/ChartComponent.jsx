import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ChartComponent = ({ data }) => {
  
  const period = data["Meta Data"]["1. Information"];
  let dataObject = {};
  if( period === "Monthly Prices (open, high, low, close) and Volumes"){
    dataObject = data["Monthly Time Series"];
  } else if (period === "Weekly Prices (open, high, low, close) and Volumes") {
    dataObject = data["Weekly Time Series"];
  } else if (period === "Intraday (30min) open, high, low, close prices and volume") {
      dataObject = data["Time Series (30min)"];
    } else if (period ===   "Intraday (60min) open, high, low, close prices and volume") {
      dataObject = data["Time Series (60min)"];
  } else {
    dataObject = data["Time Series (Daily)"];
  }

  const chartData = Object.entries(dataObject)
  .map(([date, values]) => ({
    date,
    close: parseFloat(values["4. close"]).toFixed(2),
  }))
  .reverse();

  // Find the minimum and maximum values of 'close' in the chart data
  const minClose = Math.min(...chartData.map((entry) => entry.close));
  const maxClose = Math.max(...chartData.map((entry) => entry.close));

  // Calculate buffer to add some padding to the y-axis domain
  const yDomainBuffer = (maxClose - minClose) * 0.1;

  // Custom tick formatter function for x-axis labels
  const formatXAxisTick = (tickItem) => {
    const date = new Date(tickItem);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  return (
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          style={{
            margin: "auto",
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
          }}
          width={900}
          height={450}
          data={chartData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={formatXAxisTick} // Apply the custom tick formatter
          />
          <YAxis
            domain={[minClose - yDomainBuffer, maxClose + yDomainBuffer]}
            tickFormatter={(value) => parseFloat(value).toFixed(2)} // Format y-axis labels
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#5DB43D"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
  );
};

export default React.memo(ChartComponent);
