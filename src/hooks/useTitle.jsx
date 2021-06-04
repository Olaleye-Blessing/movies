import { useEffect } from "react";

//? change document's title
const useTitle = (title) => {
    useEffect(() => {
        document.title = title;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useTitle;
