import { Line } from 'react-chartjs-2'
import { getAgoDateFormatted, getTodayDateFormatted } from '../utils/dateTime'
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
} from 'chart.js'
import axios from 'axios';
import { useEffect, useState } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler
)

const baseUrl = process.env.REACT_APP_BACKEND_API_BASE_URL


const NewUSersTrafficGraph = () => {
    useEffect(() => {
        console.log('Getting Total Users Graph')
        getTotalTrafficDataFromAPI(14)
    }, [])

    const [graphData, setGraphData] = useState({
        date: [],
        traffic: []
    })

    async function getTotalTrafficDataFromAPI(daysAgo) {
        const to = getTodayDateFormatted()
        const from = getAgoDateFormatted(daysAgo)

        const response = await axios.get(`${baseUrl}/api/analytics/stats/total-users-graph?from=${from}&to=${to}&new_users=true`, {
            headers: {
                "ngrok-skip-browser-warning": true,
            },
            withCredentials: true,
        })

        const d = {
            date: [],
            traffic: []
        }

        const fromDateParts = from.split('-');

        const data = response.data.data.data

        data.forEach((entry) => {
            const day = entry['day'].padStart(2, '0');
            const month = fromDateParts[1];
            const year = fromDateParts[0];

            const formattedDay = `${day}-${month}-${year}`;
            d.date.push(formattedDay)
            d.traffic.push(entry['value'])
        })

        setGraphData(d)
        console.log(d)  // Log the newly created data object
    }

    const data = {
        labels: graphData.date,
        datasets: [
            {
                data: graphData.traffic,
                borderColor: '#4A4A4A',  // Dark grey color for the line
                backgroundColor: 'rgba(74, 74, 74, 0.1)',  // Light grey fill color with transparency
                pointBorderColor: '#4A4A4A',  // Dark grey color for the points
                borderRadius: 4,
                tension: 0.3,
                fill: {
                    target: "origin",
                    above: "rgba(74, 74, 74, 0.1)"  // Light grey fill area above the line
                }
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const datasetIndex = context.datasetIndex ?? 0
                        const dataIndex = context.dataIndex ?? 0
                        const time = data.labels[dataIndex]
                        return `${time}: ${context.raw}`
                    }
                }
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
            {graphData.date.length === 0 && graphData.traffic.length === 0
                ? <p>No Data Found</p>
                : <Line options={options} data={data} />}
        </>
    )
}

export default NewUSersTrafficGraph
