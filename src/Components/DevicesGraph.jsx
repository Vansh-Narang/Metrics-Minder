import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const baseUrl = process.env.REACT_APP_BACKEND_API_BASE_URL


const DevicesGraph = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/analytics/stats/devices?from=2024-04-01&to=2024-05-01`, {
                    headers: {
                        "ngrok-skip-browser-warning": true,
                    },
                    withCredentials: true,
                });
                const data = response.data.data.data;

                // Parse the data to get labels and values
                const labels = data.map(item => Object.keys(item)[0]);
                const values = data.map(item => Number(Object.values(item)[0]));

                // Set the parsed data
                setChartData({
                    labels,
                    datasets: [
                        {
                            data: values,
                            pointBorderColor: '#4A4A4A',
                            borderRadius: 4,
                            borderWidth: 2,
                            backgroundColor: '#EDEDED',
                            borderColor: '#4A4A4A',
                            tension: 0.3,
                            fill: false
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                }
            },
            y: {
                grid: {
                    display: false,
                }
            }
        }
    };

    return (
        <>
            <div style={{ width: '30rem', height: '20rem' }}>
                {chartData === null
                    ? <p>Loading data...</p>
                    : <Bar data={chartData} options={options} />}
            </div>
        </>
    );
}

export default DevicesGraph;
