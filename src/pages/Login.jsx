import React, { useEffect, useState } from "react";
import HomeLogoLink from "../Components/HomeLogoLink";
import FormInput from "./../Components/Form/FormInput";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { validateEmail } from "../utility/validateEmail";
import FormBtn from "../Components/Form/FormBtn";
import { Link, useHistory } from "react-router-dom";
import LoaderIndicatorSmall from "../Components/LoaderIndicatorSmall";
import Alert from "../Components/Alert";

const Login = () => {
    let history = useHistory();

    const [disabled, setDisabled] = useState(true);

    const [pswdType, setPswdType] = useState("password");
    const [values, setValues] = useState({
        "email": "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: true,
        password: true,
    });

    const [submitting, setSubmitting] = useState(false);

    const [alert, setAlert] = useState({
        show: false,
        msg: "",
        type: "",
    });

    const handleChange = (e) => {
        let { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const togglePswdType = () => {
        setPswdType(pswdType === "password" ? "text" : "password");
    };

    const validate = (name) => {
        let currentErrors = { ...errors };

        if (name === "email") {
            currentErrors.email = !validateEmail(values.email);
        }

        if (name === "password") {
            currentErrors.password = values.password.length < 1;
        }

        setErrors(currentErrors);
    };

    useEffect(() => {
        validate("email");
        validate("password");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.password, values.email]);

    useEffect(() => {
        let disabled = Object.keys(errors).some((err) => errors[err] === true);
        setDisabled(disabled);
    }, [errors]);

    const showAlert = (show = false, msg, type) => {
        setAlert({ show, msg, type });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setDisabled(true);

        let body = JSON.stringify(values);

        const login = async () => {
            try {
                let req = await fetch(`/authentication/login`, {
                    method: "POST",
                    body,
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                });

                let res = await req.json();
                if (!(req.status >= 200 && req.status <= 299)) throw res;

                showAlert(true, "successfully logged in", "valid");
                setSubmitting(false);
                history.replace("/");
            } catch (error) {
                console.warn(error);
                showAlert(true, error.message, "invalid");
                setSubmitting(false);
                setDisabled(false);
            }
        };

        login();
    };

    return (
        <>
            {alert.show && (
                <Alert
                    {...alert}
                    removeAlert={showAlert}
                    submitting={submitting}
                />
            )}
            <header className="login">
                <h1 className="width">
                    <HomeLogoLink />
                </h1>
            </header>
            <main className="width">
                <form className="form" onSubmit={handleSubmit}>
                    <h2>Sign In</h2>
                    <FormInput
                        errorClass={errors.email ? "invalid" : "valid"}
                        label="email"
                        name="email"
                        type="email"
                        placeholder="shade@gmail.com"
                        value={values.email}
                        handleChange={handleChange}
                        required={true}
                        handleKeyDown={() => {
                            validate("email");
                        }}
                    />
                    <FormInput
                        errorClass={errors.password ? "invalid" : "valid"}
                        label="password"
                        name="password"
                        type={pswdType}
                        value={values.password}
                        handleChange={handleChange}
                        handleKeyDown={() => validate("password")}
                    >
                        <button
                            type="button"
                            onClick={togglePswdType}
                            className="form__icon"
                        >
                            {pswdType === "password" ? (
                                <BsEyeFill />
                            ) : (
                                <BsEyeSlashFill />
                            )}
                        </button>
                    </FormInput>
                    <div className="form__control form__button-container">
                        <FormBtn
                            className={disabled ? "" : "submit"}
                            type="submit"
                            disabled={disabled}
                            next={false}
                            text={
                                submitting ? <LoaderIndicatorSmall /> : "login"
                            }
                        />
                    </div>
                </form>
                <p className="form__other">
                    Don't have an account? <Link to="/signup">Signup</Link>
                </p>
                <p className="form__other" style={{ marginTop: "5px" }}>
                    <Link to="/forgotpassword">Forgot password?</Link>
                </p>
            </main>
        </>
    );
};

export default Login;
