const SingleCard = ({
    CardDescription,
}) => {
    return (
        <>
            <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3 w-52 border-2">
                <div className="p-2 flex flex-col items-start justify-center">
                    <h3 className="font-bold">
                        Total Visitors
                    </h3>
                    <h2 className="text-base leading-relaxed dark:text-dark-6">
                        {CardDescription}
                    </h2>
                    <h1 className="font-bold mt-2">
                        More than previous one
                    </h1>
                </div>
            </div>
        </>
    );
};
export default SingleCard