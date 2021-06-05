import { NavLink, useHistory } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
// import { fetchData } from "../utility/fetchData";

const NavAuthUser = ({ user, id }) => {
    // console.log({ user, id });
    let history = useHistory();
    let { authUrl } = useGlobalContext();

    console.log(history);

    return (
        <>
            <li className="nav__link mg-l-a nav__prof">
                <NavLink to={`/user/${id}`} className="btn">
                    {user[0].toUpperCase()}
                </NavLink>
            </li>
            <li className={`nav__link`}>
                <NavLink
                    to={`${authUrl}/authentication/logout`}
                    className={`btn btn-link btn-border btn-extra`}
                >
                    logout
                </NavLink>
            </li>
        </>
    );
};

export default NavAuthUser;
