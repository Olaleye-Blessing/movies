import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    let baseUrl = `https://api.themoviedb.org/3`;
    let key = "651ef57b1ca582995fef27ff08df6717";
    let loggedOut = true;
    // "proxy": "http://127.0.0.1:7000/",
    let authUrl =
        process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:7000"
            : "https://wahala-movie.herokuapp.com";
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <GlobalContext.Provider
            value={{
                key,
                searchQuery,
                setSearchQuery,
                baseUrl,
                loggedOut,
                authUrl,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
