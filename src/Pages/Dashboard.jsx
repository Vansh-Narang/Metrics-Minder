import React, { useState, useEffect } from "react";
import { DashNav } from "../Components/DashNav";
import TabContent from "../Components/ui/TabContent";
import Button1 from "../Components/ui/Button1";
import { FiLink2 } from "react-icons/fi";
import axios from "axios"
import countryWiseData from "../data/country_wise_data.json";
import { MdArrowOutward } from "react-icons/md";
import { FiArrowDownLeft } from "react-icons/fi";
import { Footer } from "../Components/ui/Footer";
import TotalTrafficGraph from "../Components/TotalTrafficGraph";
import SourcesGraph from "../Components/SourcesGraph";
import { TbUsers } from "react-icons/tb";
import { MdOutlineRestorePage } from "react-icons/md";
import NewUsersTrafficGraph from './../Components/NewUsersGraph'
import DevicesGraph from './../Components/DevicesGraph'
import { Toaster, toast } from "react-hot-toast";
import { customToastStyle } from './../utils/toastStyle'



const baseUrl = process.env.REACT_APP_BACKEND_API_BASE_URL


const Dashboard = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [open, setOpen] = useState("overview");
    const [openTabs, setOpenTabs] = useState("Traffic");
    const [, setCountryData] = useState()
    const handleTabOpen = (tabCategory) => {
        setOpen(tabCategory);
    };
    const handleTabsOpen = (tabCategory) => {
        setOpenTabs(tabCategory);
    };

    //button code of time
    const [data, setData] = useState([]);
    const [selectedRange, setSelectedRange] = useState('1week');
    const handleMenuChange = (event) => {
        setSelectedRange(event.target.value);
    };
    useEffect(() => {
        fetchData(selectedRange);
    }, [selectedRange]);

    useEffect(() => {
        const checkIfMobileDevice = () => {
            return /Mobi|Android/i.test(navigator.userAgent);
        };

        setIsMobile(checkIfMobileDevice());
    }, []);
    const fetchData = async (range) => {
        try {
            let fromDate, toDate;
            if (range === '1week') {
                const today = new Date();
                const sevenDaysAgo = new Date(today);
                sevenDaysAgo.setDate(today.getDate() - 7);
                fromDate = sevenDaysAgo.toISOString().split('T')[0]; // Format as YYYY-MM-DD
                toDate = new Date().toISOString().split('T')[0]; // Today's date
            }
            // You can add more conditions for other ranges if needed
            else if (range === '15days') {
                const today = new Date();
                const fifteenDaysAgo = new Date(today);
                fifteenDaysAgo.setDate(today.getDate() - 15);
                fromDate = fifteenDaysAgo.toISOString().split('T')[0];
                toDate = new Date().toISOString().split('T')[0];
            }
            else if (range === '30days') {
                const today = new Date();
                const fifteenDaysAgo = new Date(today);
                fifteenDaysAgo.setDate(today.getDate() - 15);
                fromDate = fifteenDaysAgo.toISOString().split('T')[0];
                toDate = new Date().toISOString().split('T')[0];
            }

            const url = `${baseUrl}/api/analytics/stats?from=${fromDate}&to=${toDate}`;
            const response = await axios.get(url, {
                headers: {
                    "ngrok-skip-browser-warning": true,
                },
                withCredentials: true
            });
            //   console.log(response.data.data);
            setData(response.data.data); // You can set the data here if needed
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    //button code ends

    //const { current, previous, comparison } = quickStats.data;
    const { current, previous, comparison } = data;
    const stats = [
        { label: 'New Visitors', current: current?.new_visitors, previous: previous?.new_visitors, comparison: comparison?.new_visitors },
        { label: 'Page Views', current: current?.page_views, previous: previous?.page_views, comparison: comparison?.page_views },
        { label: 'Views per Visit', current: current?.views_per_visit, previous: previous?.views_per_visit, comparison: comparison?.views_per_visit },
        { label: 'Total Visits', current: current?.total_visits, previous: previous?.total_visits, comparison: comparison?.total_visits },
        { label: 'Total Visitors', current: current?.total_visitors, previous: previous?.total_visitors, comparison: comparison?.total_visitors },
    ];
    async function getCountryWise() {
        try {
            const data = await axios.get(`${baseUrl}/api/analytics/stats/country-wise-users`,
                {
                    headers: {
                        "ngrok-skip-browser-warning": true,
                    },
                    withCredentials: true
                }
            )
            setCountryData(data.data.data);
            console.log(data.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCountryWise()
    }, [])

    return (
        <>

            {isMobile ? <div className="flex flex-col items-center justify-center h-screen gap-y-4">
                <h1 className="text-6xl font-medium text-center">OPPS!</h1>
                <p className="text-center w-60">Currently Metrics Minder is only available on desktops. Please use a desktop computer to access it.</p>
            </div> :
                <>
                    <Toaster position="top-center" reverseOrder={false} />
                    <DashNav />
                    <div className="dark:bg-dark flex justify-between">
                        {/* Left Side Content */}
                        <div className="flex flex-col items-start">
                            <div className="flex flex-wrap">
                                <div className="px-10 mx-auto">
                                    <div className="m-2 mt-8 bg-white rounded-lg">
                                        <div className="w-fit flex flex-wrap rounded-lg border border-[#E4E4E4] p-1 dark:border-dark-3 sm:flex-row gap-x-3 bg-[#F1F5F9]">
                                            <Button1
                                                onClick={() => handleTabOpen("overview")}
                                                className={`${open === "overview" ? "bg-white" : "bg-[#F1F5F9] text-gray-800"}`}
                                            >
                                                Overview
                                            </Button1>
                                            <Button1
                                                onClick={() => {
                                                    featureUnderDevelopment()
                                                    // NEXT-RELEASE
                                                    // handleTabOpen("realtime")
                                                }}
                                                className={`${open === "realtime" ? "bg-white" : "bg-[#F1F5F9] text-gray-800"}`}
                                            >
                                                Realtime
                                            </Button1>

                                            <Button1
                                                onClick={() => {
                                                    featureUnderDevelopment()
                                                    // NEXT-RELEASE
                                                    // handleTabOpen("reports")
                                                }}
                                                className={`${open === "reports" ? "bg-white" : "bg-[#F1F5F9] text-gray-800"}`}
                                            >
                                                Reports
                                            </Button1>
                                        </div>
                                        <div className="w-11/12 flex">
                                            <TabContent
                                                details={
                                                    <div className="w-full flex flex-col items-start">
                                                        <section className="bg-white dark:bg-dark">
                                                            <div className="container">
                                                                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                                                    {stats.length > 0 && stats.map((stat, index) => (
                                                                        <div key={index} className="stat-card p-4 border rounded-lg inline-block">
                                                                            <h3 className="text-sm">{stat.label}</h3>
                                                                            <div className="mt-2 flex flex-row">
                                                                                <div className="flex flex-col">
                                                                                    <p className="font-medium text-3xl text-ellipsis overflow-hidden whitespace-nowrap">{stat.current}</p>
                                                                                    <p className="text-sm mt-2 whitespace-nowrap">{stat.comparison?.overview}</p>
                                                                                </div>
                                                                                <div className="text-3xl pr-6 pl-4">
                                                                                    <p>{stat.comparison?.is_increasing ? <MdArrowOutward color="green" /> : <FiArrowDownLeft color="red" style={{ transform: 'rotate(270deg)' }} />}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}

                                                                </div>
                                                            </div>
                                                        </section>
                                                    </div>
                                                }
                                                tabCategory="overview"
                                                open={open}
                                            />
                                            <TabContent
                                                details={
                                                    <div className="whitespace-nowrap">
                                                        We are actively working on this feature. It will be launched soon.
                                                    </div>
                                                }
                                                tabCategory="reports"
                                                open={open}
                                            />
                                            <TabContent
                                                details={
                                                    <div className="whitespace-nowrap">
                                                        We are actively working on this feature. It will be launched soon.
                                                    </div>
                                                }
                                                tabCategory="realtime"
                                                open={open}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full pl-12 pt-2 flex flex-col">
                                <div className="flex flex-wrap">
                                    <div className="flex flex-col items-start justify-start">
                                        <div className="rounded-lg mb-4 pt-6">
                                            <div className="flex flex-col flex-wrap rounded-lg bg-[#F1F5F9] border border-[#E4E4E4] p-1 dark:border-dark-3 sm:flex-row gap-x-3">
                                                <Button1
                                                    onClick={() => handleTabsOpen("Traffic")}
                                                    className={`${openTabs === "Traffic" ? "bg-white" : "bg-[#F1F5F9] text-gray-800"}`}
                                                >
                                                    Traffic
                                                </Button1>
                                                <Button1
                                                    onClick={() => handleTabsOpen("New Users")}
                                                    className={`${openTabs === "New Users" ? "bg-white" : "bg-[#F1F5F9] text-gray-800"}`}
                                                >
                                                    New Users
                                                </Button1>
                                                <Button1
                                                    onClick={() => handleTabsOpen("Countries")}
                                                    className={`${openTabs === "Countries" ? "bg-white" : "bg-[#F1F5F9] text-gray-800"}`}
                                                >
                                                    Countries
                                                </Button1>
                                                <Button1
                                                    onClick={() => handleTabsOpen("Sources")}
                                                    className={`${openTabs === "Sources" ? "bg-white" : "bg-[#F1F5F9] text-gray-800"}`}
                                                >
                                                    Sources
                                                </Button1>
                                                <Button1
                                                    onClick={() => handleTabsOpen("Devices")}
                                                    className={`${openTabs === "Devices" ? "bg-white" : "bg-[#F1F5F9] text-gray-800"}`}
                                                >
                                                    Devices
                                                </Button1>
                                            </div>
                                        </div>
                                        <div className="w-full bg-white rounded-lg">
                                            <TabContent
                                                details={<TotalTrafficGraph />}
                                                tabCategory="Traffic"
                                                open={openTabs}
                                            />
                                            <style jsx>{`
                        .grid-custom {
                            display: grid;
                            gap: 1rem;
                            justify-items: start;
                        }
                        @media (min-width: 640px) {
                            .grid-custom {
                                grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
                                grid-auto-flow: row;
                            }
                        }
                    `}</style>
                                            <TabContent
                                                details={
                                                    <NewUsersTrafficGraph />
                                                }
                                                tabCategory="New Users"
                                                open={openTabs}
                                            />
                                            <TabContent
                                                details={
                                                    <div className="grid gap-x-14 grid-cols-3">
                                                        <div className="border p-3 rounded-lg w-60">
                                                            <h2 className="text-md font-medium mb-4">Today</h2>
                                                            <div className="grid-custom text-center">
                                                                {countryWiseData.data.today > 0 ? countryWiseData.data.today.map((item, index) => (
                                                                    <div key={index} className="flex justify-between w-full">
                                                                        <p className="text-gray-700">{item.country}</p>
                                                                        <p>{item.users}</p>
                                                                    </div>
                                                                )) : "No data available"}
                                                            </div>
                                                        </div>
                                                        <div className="border p-3 rounded-lg">
                                                            <h2 className="text-md font-medium mb-4">This Week</h2>
                                                            <div className="grid-custom text-center">
                                                                {countryWiseData.data.this_week.map((item, index) => (
                                                                    <div key={index} className="flex justify-between w-full">
                                                                        <p className="text-gray-700">{item.country}</p>
                                                                        <p>{item.users}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="border p-3 rounded-lg">
                                                            <h2 className="text-md font-medium mb-4">This Month</h2>
                                                            <div className="grid-custom text-center ">
                                                                {countryWiseData.data.this_month.map((item, index) => (
                                                                    <div key={index} className="flex justify-between w-full">
                                                                        <p className="text-gray-700">{item.country}</p>
                                                                        <p>{item.users}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                tabCategory="Countries"
                                                open={openTabs}
                                            />
                                            <TabContent
                                                details={<SourcesGraph />}
                                                tabCategory="Sources"
                                                open={openTabs}
                                            />
                                            <TabContent
                                                details={<DevicesGraph />}
                                                tabCategory="Devices"
                                                open={openTabs}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Right Side Content */}
                        <div className="w-5/12 px-10 py-8 flex flex-col items-start">
                            <div className="w-full flex justify-end">
                                <select value={selectedRange} onChange={handleMenuChange} className="p-2 border rounded-lg border-gray-300">
                                    <option value="1week">1 Week</option>
                                    <option value="15days">15 Days</option>
                                    <option value="30days">30 Days</option>
                                </select>

                                {/* Display your data
                        <ul>
                            {data.map((item, index) => (
                                <li key={index}>{}</li>
                            ))}
                        </ul> */}
                            </div>
                            <div className="w-full">
                                <section className="bg-gray-2 dark:bg-dark p-5 border rounded-lg mt-8 ml-12">
                                    <div className="flex flex-col mb-5">
                                        <p className="text-lg font-bold">Recent Insights✨</p>
                                        <p className="text-sm text-gray-700">
                                            We have generate some insights for you
                                        </p>
                                    </div>
                                    <div className="mt-4 flex gap-x-2">
                                        <div className="flex flex-col gap-7">
                                            <div className="flex gap-4 items-center">
                                                <FiLink2 className="text-4xl p-1" size={32} style={{ backgroundColor: "#d9d9d9", borderRadius: 100 }} />
                                                <div>
                                                    <h1 className="font-medium">32 % drop in traffic</h1>
                                                    <p className="text-sm">
                                                        You have lost 3 backlinks that caused 32% drop in your traffic.
                                                    </p>
                                                </div>

                                            </div>
                                            <div className="flex gap-4 items-center">
                                                <TbUsers className="text-4xl p-1" size={32} style={{ backgroundColor: "#d9d9d9", borderRadius: 100 }} />
                                                <div>
                                                    <h1 className="font-medium">Peak Traffic</h1>
                                                    <p className="text-sm">
                                                        Today your webiste reached peak traffic of 1232 users in last 2 months
                                                    </p>
                                                </div>

                                            </div>
                                            <div className="flex gap-4 items-center">
                                                <TbUsers className="text-4xl p-1" size={32} style={{ backgroundColor: "#d9d9d9", borderRadius: 100 }} />
                                                <div>
                                                    <h1 className="font-medium">Unexpected Anomaly</h1>
                                                    <p className="text-sm">
                                                        Today you got only 30 visitors. Instant decrease in traffic may be an anomaly.
                                                    </p>
                                                </div>

                                            </div>
                                            <div className="flex gap-4 items-center">
                                                <MdOutlineRestorePage className="text-4xl p-1" size={32} style={{ backgroundColor: "#d9d9d9", borderRadius: 100 }} />
                                                <div>
                                                    <h1 className="font-medium">Page isn't indexing</h1>
                                                    <p className="text-sm">
                                                        Your page /how-to-play is not indexing. Kindly check out search console
                                                    </p>
                                                </div>

                                            </div>
                                            {/* <div className="flex gap-4 items-center">
                                        <BsEmojiExpressionless className="text-4xl p-1" size={32} style={{ backgroundColor: "#d9d9d9", borderRadius: 100 }} />
                                        <div>
                                            <h1 className="font-medium">Website not accessibele</h1>
                                            <p className="text-sm">
                                                Your webiste is not accessible. Kindly check it out.
                                            </p>
                                        </div>

                                    </div> */}

                                            <div>
                                                <p className="text-xs">*This feature is under development. It will be released in future. <br></br> *All the data is for demo purpose.</p>

                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className="bg-gray-2 dark:bg-dark p-5 border rounded-lg mt-8 ml-12">
                                    <div>
                                        <h1 className="font-bold">AI Chat Bot</h1>
                                        <p className="text-sm text-gray-700">Chat with our AI to know more about your website.</p>
                                    </div>
                                    <div className="text-center mt-12 mb-12">
                                        <h1 className="font-bold text-xl">Coming soon</h1>
                                        <p className="text-sm text-gray-700">Join Beta to get notified when this feature releases.</p>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12" />
                    <Footer />
                </>
            }
        </>
    );
};

export default Dashboard;

function featureUnderDevelopment() {
    toast.error('This feature is under development. Join beta to get early access.', {
        style: customToastStyle
    })
}