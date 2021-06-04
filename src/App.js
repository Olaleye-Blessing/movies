import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import Homepage from "./pages/HomePage";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./Components/Navbar";

import "./css/index.css";

import ResetPassword from "./pages/ResetPassword";
import Movies from "./pages/Movies";
import People from "./pages/People";
import TvShows from "./pages/TvShows";
import MediaSearch from "./pages/MediaSearch";
import Person from "./pages/Person";
import Media from "./Components/Media";
import Profile from "./Components/Profile";

const App = () => {
    let { pathname } = useLocation();

    return (
        <>
            {pathname !== "/signup" &&
                pathname !== "/login" &&
                pathname !== "/forgotpassword" && <Navbar />}
            <Switch>
                <Route path="/" exact>
                    <Homepage />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/forgotpassword">
                    <ResetPassword />
                </Route>
                <Route path="/movies/:id">
                    <Media type="movie" />
                </Route>
                <Route path="/movies">
                    <Movies />
                </Route>
                <Route path="/person/:id">
                    <Person />
                </Route>
                <Route path="/people">
                    <People />
                </Route>
                <Route path="/tv/:id">
                    <Media type="tv" />
                </Route>
                <Route path="/tvshows">
                    <TvShows />
                </Route>
                <Route path="/user/:id">
                    <Profile />
                </Route>
                <Route path="/search">
                    <MediaSearch />
                </Route>
            </Switch>
        </>
    );
};

export default App;
