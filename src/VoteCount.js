import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './VoteCount.css'; // Import CSS file

const VoteCount = () => {
  const defaultCounts = [
    { _id: 'Janasena', count: 0 },
    { _id: 'Telugu Desam Party', count: 0 },
    { _id: 'YSRCP', count: 0 },
    { _id: 'BJP', count: 0 },
    { _id: 'Congress', count: 0 },
    { _id: 'NOTA', count: 0 }
  ];

  const [counts, setCounts] = useState(defaultCounts);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/counts');
        const fetchedCounts = response.data;

        // Merge fetched counts with default counts
        const mergedCounts = defaultCounts.map(defaultCount => {
          const fetchedCount = fetchedCounts.find(count => count._id === defaultCount._id);
          return fetchedCount ? fetchedCount : defaultCount;
        });

        setCounts(mergedCounts);
      } catch (error) {
        console.error('Error fetching vote counts:', error);
      }
    };

    fetchCounts();
  }, []);

  const barChartData = {
    labels: counts.map(vote => vote._id),
    datasets: [{
      label: 'Votes',
      data: counts.map(vote => vote.count),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }]
  };

  const pieChartData = {
    labels: counts.map(vote => vote._id),
    datasets: [{
      label: 'Votes',
      data: counts.map(vote => vote.count),
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)'
      ],
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <center><h2>Vote Counts</h2></center><br/>
      <div style={{ width: '60%', height: '400px', margin: '0 auto' }}>
        <h3>Bar Chart</h3>
        <Bar data={barChartData} options={options} />
      </div>
      <br/><br/>
      <div style={{ width: '60%', height: '400px', margin: '0 auto' }}>
        <h3>Pie Chart</h3>
        <Pie data={pieChartData} options={options} />
      </div>
    </div>
  );
};

export default VoteCount;
