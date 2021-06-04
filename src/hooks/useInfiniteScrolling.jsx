import { useEffect, useState } from "react";
import { checkScroll } from "../utility/checkScroll";
import { fetchData } from "../utility/fetchData";
import { NetWork } from "./../utility/customErrors";

const useInfiniteScrolling = (pathUrl) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(false);

    let url = `${pathUrl}&page=${page}`;

    const handleScroll = () => {
        //? increase the page number if true(if the user is 100px away from document's bottom)
        if (checkScroll()) {
            setPage((page) => page + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        //? remove effect when component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let abortFetch = new AbortController();
    let signal = abortFetch.signal;
    useEffect(() => {
        setLoading(true);
        setError(false);
        // if (totalPages === 0) {
        //     setLoading(false);
        //     setError("not found");
        //     return;
        // }
        // setTotalPages(1);
        if (page > totalPages) {
            setLoading(false);
            setError("no more data");
            return;
        }
        fetchData(url, signal)
            .then((fetchedData) => {
                let { results, total_pages } = fetchedData;
                setData((old) => [...new Set([...old, ...results])]);
                setLoading(false);
                setTotalPages(total_pages);

                //? you need to set the total no of pages back to 1 since there is a return statement(up there) that returns "no more data"
                if (total_pages === 0) {
                    setError("not found");
                    setTotalPages(1);
                }
                // setError(null);
            })
            .catch((err) => {
                console.log(err);
                if (err.name !== "AbortError") {
                    setLoading(false);
                    // setError(error.mess)
                    if (err instanceof NetWork) {
                        setError(err.message);
                    }
                }
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pathUrl]);

    //! WAHALA!!
    //? set all data to empty array if the url chnages. This is particularly useful for form query
    //? set totalPages back to 1 so that search could start all over. also peculiar to form query
    useEffect(() => {
        setData([]);
        setTotalPages(1);
        // setLoading(false);
        // setError("not found");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathUrl]);

    // useEffect(() => {
    //     setLoading(false);
    //     setError("not found");

    // }, [input])

    return { data, loading, error };
};

export default useInfiniteScrolling;
