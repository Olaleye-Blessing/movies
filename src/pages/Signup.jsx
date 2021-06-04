import { useState } from "react";
// import FormButton from "../Components/Form/FormButton";
import HomeLogoLink from "../Components/HomeLogoLink";
// import FormInput from "./../Components/Form/FormInput";
// import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import FormBtn from "../Components/Form/FormBtn";
import useSignUpForm from "../hooks/useSignUpForm";
import validateInfo from "../utility/validateFormInfo";
// import DefaultFormInput from "../Components/Form/DefaultFormInput";
import sliceObject from "../utility/sliceObjects";
import SignupPersonalInfo from "../Components/Form/SignupPersonalInfo";
import SignUpAccountInfo from "../Components/Form/SignUpAccountInfo";
import ConfirmPage from "../Components/Form/ConfirmPage";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import LoaderIndicatorSmall from "../Components/LoaderIndicatorSmall";
// import { useGlobalContext } from "../contexts/GlobalContext";

const SignUp = () => {
    // let { signUpEmailSignal } = useGlobalContext();
    const [stages, setStages] = useState([
        { "pos": 1, name: "personal", "done": false },
        { "pos": 2, name: "account", "done": false },
        { "pos": 3, name: "confirm", "done": false },
    ]);

    const [currentStage, setCurrentStage] = useState(1);

    const handleStageChange = (name, change) => {
        let currentStages = [...stages];
        currentStages = currentStages.map((stage) => {
            let currentStage = { ...stage };
            if (currentStage.name === name) {
                currentStage.done = change === 1 ? true : false;
                return currentStage;
            }
            return stage;
        });
        setStages(currentStages);
    };

    const {
        values,
        handleChange,
        handleSubmit,
        errors,
        touched,
        handleKeyDown,
        submitting,
    } = useSignUpForm(validateInfo);

    const {
        data: countries,
        // error,
        // pending,
    } = useFetch("https://restcountries.eu/rest/v2/all");

    // console.log(countries);

    let countriesName = countries.map((country) => {
        let { name: text, alpha3Code: value } = country;
        return { text, value };
    });
    // console.log(countriesName);

    const fieldError = (field) => {
        const hasError = errors[field].status;
        const shouldShow = touched[field];
        if (!shouldShow) {
            return "";
        }
        return hasError ? "invalid" : "valid";
    };

    // console.log(errors);
    let stageOne = sliceObject(0, 4, errors);
    let stageTwo = sliceObject(4, 7, errors);
    // console.log(stageTwo);

    let disbleStageOne = stageOne
        .map((name) => errors[name])
        .some((obj) => obj.status === true);

    let disbleStageTwo = stageTwo
        .map((name) => errors[name])
        .some((obj) => obj.status === true);

    let element;

    let confirmation = [
        { label: "first name", name: "firstname", value: values.firstName },
        { label: "last name", name: "lastname", value: values.lastName },
        { label: "email", name: "email", value: values.email },
        { label: "user name", name: "username", value: values.userName },
        { label: "country", name: "country", value: values.country },
    ];

    const displaySignUpSection = () => {
        switch (currentStage) {
            case 1:
                element = (
                    <SignupPersonalInfo
                        values={values}
                        fieldError={fieldError}
                        handleChange={handleChange}
                        handleKeyDown={handleKeyDown}
                        errors={errors}
                        disbleStageOne={disbleStageOne}
                        setCurrentStage={setCurrentStage}
                        handleStageChange={handleStageChange}
                        currentStage={currentStage}
                        options={[
                            { text: "select options", value: "default" },
                            ...countriesName,
                        ]}
                    />
                );
                break;

            case 2:
                element = (
                    <SignUpAccountInfo
                        fieldError={fieldError}
                        handleKeyDown={handleKeyDown}
                        handleChange={handleChange}
                        values={values}
                        errors={errors}
                        setCurrentStage={setCurrentStage}
                        currentStage={currentStage}
                        handleStageChange={handleStageChange}
                        disbleStageTwo={disbleStageTwo}
                    />
                );
                break;

            case 3:
                element = (
                    <section>
                        <ConfirmPage confirm={confirmation} />

                        <div className="form__control form__button-container">
                            <FormBtn
                                className={`form__button`}
                                type="button"
                                next={false}
                                text="back"
                                disabled={false}
                                handleClick={() => {
                                    setCurrentStage(currentStage - 1);
                                    handleStageChange("account", -1);
                                }}
                            />

                            <FormBtn
                                className="submit"
                                type="submit"
                                next={false}
                                text={
                                    submitting ? (
                                        <LoaderIndicatorSmall />
                                    ) : (
                                        "submit"
                                    )
                                }
                                disabled={false}
                                handleClick={null}
                            />
                        </div>
                    </section>
                );
                break;

            default:
                break;
        }
        return element;
    };

    return (
        <>
            <header className="login">
                <h1 className="width">
                    <HomeLogoLink />
                </h1>
            </header>
            <main className="width">
                <section className="stages">
                    {stages.map((stage) => {
                        let { pos, name, done } = stage;

                        return (
                            <div key={pos} className="stage__box">
                                <span
                                    className={`box stage__check ${
                                        currentStage === pos && "active"
                                    } ${done && "checked"}`}
                                >
                                    {pos}
                                </span>
                                <span className="stage__name">{name}</span>
                            </div>
                        );
                    })}
                </section>
                <form className="form" onSubmit={handleSubmit}>
                    <h2>Create An Account</h2>
                    {displaySignUpSection()}
                </form>
                <div className="form__other">
                    Already have an account?
                    <span>
                        <Link to="/login">Login</Link>
                    </span>
                </div>
                <p className="form__other" style={{ marginTop: "5px" }}>
                    <Link to="/forgotpassword">Forgot password?</Link>
                </p>
            </main>
        </>
    );
};

export default SignUp;
