import React from "react";
import { FaDove } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeLogoLink = () => {
    return (
        <Link to="/" className="homeLogo">
            WAHALA
            <figure className="homeLogo__svg">
                <FaDove />
            </figure>
        </Link>
    );
};

export default HomeLogoLink;
