import { useEffect, useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import validatePasswordErrors from "../../utility/validatePassword";
import Conditions from "../Conditions";
import FormBtn from "./FormBtn";
import FormInput from "./FormInput";

const SignUpAccountInfo = ({
    fieldError,
    handleKeyDown,
    handleChange,
    values,
    errors,
    setCurrentStage,
    currentStage,
    handleStageChange,
    disbleStageTwo,
}) => {
    const [passwordType, setPasswordType] = useState({
        password: "password",
        confirmPassword: "password",
    });

    const [passwordConditions, setpasswordConditions] = useState([
        {
            label: "uppercase",
            text: "At least one upper case English letter",
            valid: false,
        },
        {
            label: "lowercase",
            text: "At least one lower case English letter",
            valid: false,
        },
        {
            label: "digit",
            text: "At least one digit",
            valid: false,
        },
        {
            label: "specialCharacter",
            text: "At least one special character",
            valid: false,
        },
        {
            label: "length",
            text: "Minimum eight in length",
            valid: false,
        },
    ]);

    useEffect(() => {
        let result = validatePasswordErrors(values.password);

        let pswdConditions = [...passwordConditions];

        pswdConditions = pswdConditions.map((condition) => {
            let { label } = condition;
            let newCond = { ...condition };
            newCond.valid = result[label];
            return newCond;
        });

        setpasswordConditions(pswdConditions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.password]);

    let { userName, password, confirmPassword } = errors;

    const togglePswdType = (name) => {
        let currenType = { ...passwordType };
        currenType[name] =
            currenType[name] === "password" ? "text" : "password";
        setPasswordType(currenType);
    };

    return (
        <section>
            <FormInput
                errorClass={fieldError("userName")}
                handleKeyDown={(e) => handleKeyDown(e, "userName")}
                handleChange={handleChange}
                value={values.userName}
                label="user name"
                name="userName"
                placeholder="Bikky"
                required={true}
            >
                {userName.msg && <small>{userName.msg}</small>}
            </FormInput>
            <FormInput
                errorClass={fieldError("password")}
                handleKeyDown={(e) => handleKeyDown(e, "password")}
                label="pasword"
                name="password"
                type={passwordType.password}
                value={values.password}
                handleChange={handleChange}
                required={true}
            >
                {password.msg && <small>{password.msg}</small>}
                {/* {fieldError("password") !== "" && (
                    <Conditions conditions={passwordConditions} />
                )} */}

                {fieldError("password") !== "" &&
                    fieldError("password") !== "valid" && (
                        <Conditions conditions={passwordConditions} />
                    )}

                {/* {<Conditions conditions={passwordConditions} />} */}
                <button
                    type="button"
                    onClick={() => togglePswdType("password")}
                    className="form__icon"
                >
                    {passwordType.password === "password" ? (
                        <BsEyeFill />
                    ) : (
                        <BsEyeSlashFill />
                    )}
                </button>
            </FormInput>
            <FormInput
                errorClass={fieldError("confirmPassword")}
                handleKeyDown={(e) => handleKeyDown(e, "confirmPassword")}
                label="confirm password"
                name="confirmPassword"
                type={passwordType.confirmPassword}
                value={values.confirmPassword}
                handleChange={handleChange}
            >
                {confirmPassword.msg && <small>{confirmPassword.msg}</small>}
                <button
                    type="button"
                    onClick={() => togglePswdType("confirmPassword")}
                    className="form__icon"
                >
                    {passwordType.confirmPassword === "password" ? (
                        <BsEyeFill />
                    ) : (
                        <BsEyeSlashFill />
                    )}
                </button>
            </FormInput>
            <div className="form__control form__button-container">
                <FormBtn
                    className={`form__button`}
                    type="button"
                    next={false}
                    text="back"
                    disabled={false}
                    handleClick={() => {
                        setCurrentStage(currentStage - 1);
                        handleStageChange("personal", -1);
                    }}
                />
                <FormBtn
                    className={disbleStageTwo ? "" : "submit"}
                    type="button"
                    next={true}
                    text="next"
                    disabled={disbleStageTwo}
                    handleClick={() => {
                        setCurrentStage(currentStage + 1);
                        handleStageChange("account", 1);
                    }}
                />
            </div>
        </section>
    );
};

export default SignUpAccountInfo;
