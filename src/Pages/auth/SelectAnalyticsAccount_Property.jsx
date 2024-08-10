import Chart from "../../assets/analytics-chart.svg";
import Navbar from "../../Components/Navbar";
import { Dropdown } from "primereact/dropdown";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { RevolvingDot } from "react-loader-spinner";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BACKEND_API_BASE_URL



const SelectAnalyticsAccount = () => {
    const navigate = useNavigate();

    const USER_STATE = {
        SELECT_ACCOUNT: "SELECT_ACCOUNT",
        SELECT_PROPERTY: "SELECT_PROPERTY",
    };

    const [userState, setUserState] = useState(USER_STATE.SELECT_ACCOUNT);
    const [dataFetched, setDataFetched] = useState(false);

    const [accounts, setAccounts] = useState([]);
    const [properties, setProperties] = useState([]);

    const [selectedAccount, setSelectedAccount] = useState(null);

    const accountsDropdownOptions = accounts.map((account) => ({
        label: account.displayName,
        value: account.name,
    }));

    const [selectedProperty, setSelectedProperty] = useState(null);
    const propertyDropdownOptions = properties.map((property) => ({
        label: property.displayName,
        value: property.name,
    }));

    useEffect(() => {
        getAnalyticsAccounts();
    }, []);

    useEffect(() => {
        if (userState === USER_STATE.SELECT_PROPERTY) {
            const accountId = selectedAccount.split("/")[1];
            getAnalyticsProperties(accountId);
        }
    }, [USER_STATE.SELECT_PROPERTY, selectedAccount, userState]);

    return dataFetched ? (
        <div className="h-screen ">
            <Toaster position="bottom-right" reverseOrder={false} />
            <Navbar />
            <div className="flex flex-col-reverse md:flex-row-reverse mx-auto justify-center">
                <div className="flex flex-col items-center w-full md:w-1/2 md:pl-16 md:items-start">
                    <h1 className="text-3xl hidden font-medium tracking-wide mt-12 text-center md:mt-64 md:text-5xl md:text-left md:block">
                        {userState === USER_STATE.SELECT_ACCOUNT ? (
                            <div>
                                Select Your Analytics <br />
                                Account
                            </div>
                        ) : (
                            <div>
                                Select Your Analytics <br />
                                Website
                            </div>
                        )}
                    </h1>

                    <div className="mt-12 flex">
                        <div className="card flex justify-content-center border">
                            {/* <Dropdown
                                value={
                                    userState === USER_STATE.SELECT_ACCOUNT
                                        ? selectedAccount
                                        : userState === USER_STATE.SELECT_PROPERTY
                                            ? selectedProperty
                                            : "Sorry! Currently Unavailable"
                                }
                                onChange={(e) => {
                                    if (userState === USER_STATE.SELECT_ACCOUNT) {
                                        setSelectedAccount(e.value);
                                        setUserState(USER_STATE.SELECT_PROPERTY);
                                    } else if (userState === USER_STATE.SELECT_PROPERTY) {
                                        setSelectedProperty(e.value);
                                    } else {
                                        toast.error("Sorry! Currently Unavailable", {
                                            style: customToastStyle,
                                        });
                                    }
                                }}
                                options={
                                    userState === USER_STATE.SELECT_ACCOUNT
                                        ? accountsDropdownOptions
                                        : propertyDropdownOptions
                                }
                                optionLabel="label"
                                placeholder={
                                    userState === USER_STATE.SELECT_ACCOUNT
                                        ? "Select Account"
                                        : "Select Website"
                                }
                                className="w-full md:w-14rem p-2 text-slate-800"
                            /> */}
                            <select
                                value={
                                    userState === USER_STATE.SELECT_ACCOUNT
                                        ? selectedAccount
                                        : userState === USER_STATE.SELECT_PROPERTY
                                            ? selectedProperty
                                            : "Sorry! Currently Unavailable"
                                }
                                onChange={(e) => {
                                    const selectedValue = e.target.value;
                                    if (userState === USER_STATE.SELECT_ACCOUNT) {
                                        setSelectedAccount(selectedValue);
                                        setUserState(USER_STATE.SELECT_PROPERTY);
                                    } else if (userState === USER_STATE.SELECT_PROPERTY) {
                                        setSelectedProperty(selectedValue);
                                    } else {
                                        toast.error("Sorry! Currently Unavailable", {
                                            style: customToastStyle,
                                        });
                                    }
                                }}
                                className="w-full md:w-14rem p-2 text-slate-800"
                            >
                                <option>
                                    {userState === USER_STATE.SELECT_ACCOUNT
                                        ? "Select Account"
                                        : "Select Website"}
                                </option>
                                {userState === USER_STATE.SELECT_ACCOUNT
                                    ? accountsDropdownOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))
                                    : propertyDropdownOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        {userState === USER_STATE.SELECT_PROPERTY ? (
                            <button
                                className="ml-2 flex items-center justify-center w-10 h-10 bg-blackBG text-white rounded-sm focus:outline-none hover:bg-blue-600 transition-colors duration-300"
                                aria-label="Check Button"
                                onClick={async () => {
                                    const accountId = selectedAccount.split("/")[1];
                                    const propertyId = selectedProperty.split("/")[1];

                                    if (!accountId || !propertyId) {
                                        toast.error("Select account and website first", {
                                            style: customToastStyle,
                                        });
                                        return;
                                    }

                                    await savePropertyToMonitor(accountId, propertyId);
                                }}
                            >
                                <span className="text-lg">&#10004;</span>
                            </button>
                        ) : (
                            <div />
                        )}
                    </div>

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
        </div>
    ) : (
        <div className="flex h-screen justify-center items-center">
            <div>
                <RevolvingDot radius={32} />
                <Toaster position="bottom-right" reverseOrder={false} />
            </div>
        </div>
    );

    async function getAnalyticsAccounts() {
        try {
            const jwt = Cookies.get("jwt_token");

            const resp = await toast.promise(
                axios.get(
                    `${baseUrl}/api/analytics/accounts/list`,
                    { withCredentials: true },
                    {
                        headers: {
                            "ngrok-skip-browser-warning": true,
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                ),
                {
                    loading: "Fetching your accounts...",
                    error: "We were unable to fetch your accounts.",
                    success: "Accounts Fetched.",
                },
                { style: customToastStyle }
            );

            if (resp.status !== 200) {
                toast.error("There was some error", { style: customToastStyle });
                return;
            }

            setDataFetched(true);
            setAccounts(resp.data.data.accounts);
        } catch (err) {
            toast.error("There was some error.", { style: customToastStyle });
            console.log("Error: ", err);
        }
    }

    async function getAnalyticsProperties(accountId) {
        try {
            const jwt = Cookies.get("jwt_token");

            const resp = await toast.promise(
                axios.get(
                    `${baseUrl}/api/analytics/property/list?account_id=${accountId}`,
                    { withCredentials: true },
                    {
                        headers: {
                            "ngrok-skip-browser-warning": true,
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                ),
                {
                    loading: "Fetching Properties...",
                    error: "We were unable to fetch properties",
                    success: "Properties Fetched",
                },
                { style: customToastStyle }
            );
            setProperties(resp.data.data.properties);
        } catch (err) {
            toast.error("There was some error.", { style: customToastStyle });
            console.log("Error: ", err);
        }
    }

    async function savePropertyToMonitor(accountId, propertyId) {
        try {
            const jwt = Cookies.get("jwt_token");

            const resp = await toast.promise(
                axios.post(
                    `${baseUrl}/api/analytics/property/save`,

                    {
                        account_id: accountId,
                        property_id: propertyId,
                    }, { withCredentials: true },
                    {
                        headers: {
                            "ngrok-skip-browser-warning": true,
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                ),
                {
                    loading: "Finishing Everything",
                    error: "We were unable to process your request",
                    success: "Cool! Everything Done",
                },
                { style: customToastStyle }
            );

            if (resp.status !== 200) {
                toast.error("There was some error", { style: customToastStyle });
                return;
            } else {
                navigate("/dashboard");
            }
        } catch (err) {
            toast.error("There was some error.", { style: customToastStyle });
            console.log("Error: ", err);
        }
    }
};

const customToastStyle = {
    background: "#333",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "14px",
};

export default SelectAnalyticsAccount;


