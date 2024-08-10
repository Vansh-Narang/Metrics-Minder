import React from "react";
import Chart from "../../assets/analytics-chart.svg";
import Navbar from "../../Components/Navbar";
import { Toaster } from "react-hot-toast";


const baseUrl = process.env.REACT_APP_BACKEND_API_BASE_URL



const ConnectAnalytics = () => {

    // useEffect(() => {
    //     toast.success("Login Successful", { style: customToastStyle });
    // });

    return (
        <div className="h-screen overflow-hidden">
            <Toaster position="bottom-right" reverseOrder={false} />
            <Navbar />
            <div className="flex flex-col-reverse md:flex-row-reverse mx-auto justify-center">
                <div className="flex flex-col items-center w-full md:w-1/2 md:pl-16 md:items-start">
                    <h1 className="text-3xl hidden font-medium tracking-wide mt-12 text-center md:mt-64 md:text-5xl md:text-left md:block">
                        Welcome to Metrics Minder <br />
                        Connect your Google Analytics
                    </h1>
                    <div className="mt-12" />
                    <button
                        onClick={() => {
                            window.location.replace(`${baseUrl}/auth/google`)
                        }}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >Connect Google Analytics</button>
                    <div className="mt-16 md:mt-96 p-6 md:p-0">
                        <p className="tracking-wide text-center text-sm md:text-base mt-36">
                            <span className="font-bold">Info:</span> We only have read-only
                            access to your analytics data, and all your data is kept private.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center bg-white md:bg-[#F0F0F0] w-full md:w-1/2 ">
                    <img src={Chart} className="self-center mt-14 md:mt-0 w-56 md:w-96" alt="" />
                    <div className="flex flex-col items-center justify-center gap-y-4 mt-12">
                        <h1 className="font-bold tracking-normal text-xl">
                            Let us handle your GA
                        </h1>
                        <p className="tracking-wide font-normal text-sm pl-4 pr-4 text-center mb-6 md:text-base">
                            We gather meaningful insights from Google Analytics and directly
                            notify you on WhatsApp.
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
};

const customToastStyle = {
    background: "#333",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "14px",
};

export default ConnectAnalytics;
