import { NavLink } from "react-router-dom";

const NavAuthButtons = () => {
    return (
        <>
            <li className={`nav__link mg-l-a`}>
                <NavLink to="/login" className={`btn btn-link`}>
                    login
                </NavLink>
            </li>
            <li className={`nav__link`}>
                <NavLink
                    to="/signup"
                    className={`btn btn-link btn-border btn-extra`}
                >
                    signup
                </NavLink>
            </li>
        </>
    );
};

export default NavAuthButtons;
