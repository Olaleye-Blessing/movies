import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FormInput from "../Components/Form/FormInput";
import HomeLogoLink from "../Components/HomeLogoLink";
import { validateEmail } from "../utility/validateEmail";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    let history = useHistory();
    console.log({ history });

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("rest submited");
        setEmail("");
        alert("reset submitted...");
        history.replace("/");
    };

    return (
        <>
            <header className="login">
                <h1 className="width">
                    <HomeLogoLink />
                </h1>
            </header>
            <form className="form" data-form="reset" onSubmit={handleSubmit}>
                <h2>Reset Password</h2>
                <FormInput
                    label="email"
                    name="email"
                    type="email"
                    placeholder="shade@gmail.com"
                    value={email}
                    handleChange={handleChange}
                    required={true}
                    handleKeyDown={() => validateEmail("email")}
                />
            </form>
            <p className="form__other">
                Don't have an account? <Link to="/signup">Signup</Link>
            </p>
            <p className="form__other" style={{ marginTop: "5px" }}>
                Remember password?
                <Link to="/login">Login</Link>
            </p>
        </>
    );
};

export default ResetPassword;
