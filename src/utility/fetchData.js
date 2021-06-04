import { NetWork } from "./customErrors";

//? I dont know why I pass in signal here but it works. DON't TOUCH!!
const fetchData = async (url, signal) => {
    try {
        let req = await fetch(url, { signal });
        if (!req.ok) throw new Error("not found");
        let data = await req.json();
        return data;
        // return { status: "success", data };
    } catch (error) {
        if (error.name === "TypeError") {
            throw new NetWork("Network issue! Check your internet connection");
        }
        throw error;
    }
};

export { fetchData };
