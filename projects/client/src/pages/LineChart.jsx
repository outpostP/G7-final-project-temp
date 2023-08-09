import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { format, startOfDay } from 'date-fns'; // Import startOfDay function for grouping

const LineChart = ({ transactions }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const generateLineChart = () => {
      // Group transactions by date and calculate the sum of totalPrice for each date
      const groupedTransactions = transactions.reduce((groups, transaction) => {
        const date = startOfDay(new Date(transaction.createdAt));
        if (!groups[date]) {
          groups[date] = 0;
        }
        groups[date] += parseFloat(transaction.totalPrice); // Convert totalPrice to a numeric value
        return groups;
      }, {});

      const chartLabels = Object.keys(groupedTransactions).map(date =>
        format(new Date(date), 'yyyy-MM-dd')
      );

      const chartData = Object.values(groupedTransactions);

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
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        chartInstance.current = new Chart(chartRef.current, chartConfig);
      }
    };

    generateLineChart();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [transactions]);

  return <canvas ref={chartRef} id="line-chart" />;
};

export default LineChart;
