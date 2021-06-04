import { useEffect, useState } from "react";
// import { NetWork } from "./../utility/customErrors";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);

    let abortControl = new AbortController();
    const fetchData = async () => {
        setIsPending(true);
        try {
            let response = await fetch(url, { signal: abortControl.signal });
            if (!response.ok) {
                throw new Error("resource not found");
            }
            let data = await response.json();
            setData(data);
            setError(null);
            setIsPending(null);
        } catch (error) {
            if (error.name !== "AbortError") {
                setIsPending(null);
                // console.log(error.name);
                // console.log("normal error, could not fetch");
                // console.log({ message: error.message });
                if (error.name === "TypeError") {
                    setError(
                        "Network Issue! Pls check your network connection"
                    );
                }
            }
            // if (error.name === "AbortError") {
            // } else {
            //     console.log(error.name);
            //     console.log("normal error, could not fetch");
            //     console.log({ message: error.message });
            //     setError(error.name);
            //     setIsPending(null);
            // }
        }
    };

    useEffect(() => {
        // setTimeout(() => {
        fetchData();
        // }, 3000);
        return () => abortControl.abort();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return { data, error, isPending };
};

export default useFetch;
