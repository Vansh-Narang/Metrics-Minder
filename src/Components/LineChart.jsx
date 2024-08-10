import React from "react";
import { Line } from "react-chartjs-2";
function LineChart({ chartData, width, height }) {
    return (
        <div className="chart-container mt-4" style={{ width: width, height: height }}>
            <h2 style={{ textAlign: "center" }}>Line Chart</h2>
            <Line
                data={chartData}
                options={{
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    responsive: true, // This ensures chart responsiveness
                    //  maintainAspectRatio: false // This ensures height and width are respected
                }}
            />
        </div>
    );
}
export default LineChart;