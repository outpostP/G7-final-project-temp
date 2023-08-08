import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { format } from 'date-fns';

const LineChart = ({ transactions }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Store the chart instance

  useEffect(() => {
    const generateLineChart = () => {
      const chartLabels = transactions.map((transaction) =>
        format(new Date(transaction.createdAt), 'yyyy-MM-dd HH:mm:ss')
      );
      const chartData = transactions.map((transaction) => transaction.totalPrice);

      const chartConfig = {
        type: 'line',
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: 'Total Sales',
              data: chartData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      if (chartRef.current) {
        // Destroy the previous chart instance if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        // Create a new chart instance
        chartInstance.current = new Chart(chartRef.current, chartConfig);
      }
    };

    generateLineChart();

    // Cleanup: Destroy the chart instance when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [transactions]);

  return <canvas ref={chartRef} id="line-chart" />;
};

export default LineChart;
