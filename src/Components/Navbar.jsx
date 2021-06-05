import React, { useEffect, useRef, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";

import HomeLogoLink from "./HomeLogoLink";
import { useGlobalContext } from "../contexts/GlobalContext";
import NavAuthButtons from "./NavAuthButtons";
import NavAuthUser from "./NavAuthUser";

import useFetch from "../hooks/useFetch";

const Navbar = () => {
    let { setSearchQuery, authUrl } = useGlobalContext();

    let history = useHistory();
    let pathname = history.location.pathname;

    let navItems = [
        { path: "/movies" },
        { path: "/tvshows" },
        { path: "/people" },
        // { path: "/login" },
        // { path: "/signup" },
    ];

    const navRef = useRef(null);
    const navLinksRef = useRef(null);
    const navLinksContRef = useRef(null);
    const navToggleRef = useRef(null);

    const [showLinks, setShowLinks] = useState(false);

    const searchRef = useRef(null);
    const searchCont = useRef(null);

    const toggleNav = () => {
        navToggleRef.current.classList.toggle("change");
        navLinksContRef.current.classList.toggle("show");
        setShowLinks(!showLinks);
    };

    const toggleFormCont = () => {
        searchCont.current.classList.toggle("change");
        searchRef.current.focus();
        navLinksContRef.current.classList.remove("show");
        navToggleRef.current.classList.remove("change");
        navRef.current.classList.toggle("padding");
    };

    //? remove search form when leaving search page for other pages
    if (pathname !== "/search") {
        if (searchCont.current != null) {
            searchCont.current.classList.remove("change");
            searchRef.current.value = "";
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pathname !== "/search") {
            history.push("/search");
        }
    };

    const handleSearchChange = (e) => {
        if (pathname !== "/search") {
            history.push("/search");
        }
        let { value } = e.target;
        setSearchQuery(value);
    };

    //? remove navbar and search form each time path changes
    useEffect(() => {
        navLinksContRef.current.classList.remove("show");
        navToggleRef.current.classList.remove("change");
        if (pathname === "/search") return;
        navRef.current.classList.remove("padding");
    }, [pathname]);

    let {
        data: user,
        // error,
        // isPending: loading,
    } = useFetch(`${authUrl}/authentication/isLogin`);

    const checkUserIsLoggedIn = () => {
        // console.log("loggedOut.....");
        return user.user ? <NavAuthUser {...user} /> : <NavAuthButtons />;
    };

    return (
        <nav ref={navRef}>
            <div className="width nav">
                <HomeLogoLink />
                <div ref={navLinksContRef} className="nav__links-container">
                    <ul ref={navLinksRef} className="nav__links">
                        {navItems.map((item) => {
                            let { path } = item;
                            return (
                                <li
                                    className={`nav__link ${
                                        path === "/login" && "mg-l-a"
                                    }`}
                                    key={path}
                                >
                                    <NavLink
                                        to={path}
                                        className={`btn btn-link ${
                                            path === "/signup" &&
                                            "btn-border btn-extra"
                                        } ${pathname === path ? "active" : ""}`}
                                    >
                                        {path.slice(1)}
                                    </NavLink>
                                </li>
                            );
                        })}
                        {checkUserIsLoggedIn()}
                    </ul>
                </div>
                <button
                    onClick={toggleNav}
                    ref={navToggleRef}
                    type="button"
                    className="hamburger nav__toggle"
                >
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </button>
                <button
                    type="button"
                    className="btn-icon"
                    onClick={toggleFormCont}
                >
                    <figure className="nav__search lone-icon">
                        <BiSearchAlt />
                    </figure>
                </button>
            </div>
            <form
                className={`nav__form width`}
                ref={searchCont}
                onSubmit={handleSubmit}
            >
                <input
                    onChange={handleSearchChange}
                    ref={searchRef}
                    type="search"
                    name="search"
                    id="search"
                    className="form__input"
                    placeholder="search for your tvshow, movie, person"
                    aria-label="search for your tvshow, movie, person"
                />
            </form>
        </nav>
    );
};

export default Navbar;
