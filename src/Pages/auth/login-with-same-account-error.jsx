import React, { useEffect } from "react";
import Chart from "../../assets/analytics-chart.svg";
import Navbar from "../../Components/Navbar";
import { Toaster, toast } from "react-hot-toast";


const LoginWithSameAccountError = () => {

    useEffect(() => {
        toast.error("Login with same account", { style: customToastStyle });
    });

    return (
        <div className="h-screen overflow-hidden">
            <Toaster position="bottom-right" reverseOrder={false} />
            <Navbar />
            <div className="flex flex-col md:flex-row mx-auto justify-center">
                <div className="flex flex-col items-start w-full md:w-1/2 pl-4 md:pl-16">
                    <h1 className="text-5xl font-medium tracking-wide mt-12 md:mt-64">
                        Please Connect <br />
                        Same Google Account
                    </h1>
                    <div className="mt-12" />
                    <button
                        onClick={() => {
                            window.location.replace(`{baseUrl}/connect-analytics`)
                        }}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >Connect Again</button>
                    <div className="mt-16 md:mt-96">
                        <p className="tracking-wide">
                            <span className="font-bold">Info:</span> We only have read-only
                            access to your analytics data, and all your data is kept
                            private.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center bg-[#F0F0F0] w-full md:w-1/2 h-screen">
                    <img
                        src={Chart}
                        className="self-center mt-14 md:mt-0"
                        width={500}
                        alt=""
                    />
                    <div className="flex flex-col items-center justify-center gap-y-4 mt-12">
                        <h1 className="font-bold tracking-normal text-xl">
                            Let us handle google analytics for you
                        </h1>
                        <p className="tracking-wide font-normal w-8/12 text-center">
                            We gather meaningful insights from Google Analytics and directly
                            notify you on WhatsApp.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const customToastStyle = {
    background: "#333",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "14px",
};

export default LoginWithSameAccountError;
