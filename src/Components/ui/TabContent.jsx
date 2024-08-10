import React from "react";
const TabContent = ({ open, tabCategory, details }) => {
    return (
        <div>
            <div
                className={`pt-6 text-base leading-relaxed text-body-color dark:text-dark-6 ${open === tabCategory ? "block" : "hidden"
                    } `}
            >
                {details}
            </div>
        </div>
    );
};
export default TabContent;