import FormBtn from "./FormBtn";
import FormInput from "./FormInput";
import FormSelectInput from "./FormSelectInput";

const SignupPersonalInfo = ({
    values,
    fieldError,
    handleKeyDown,
    handleChange,
    errors,
    disbleStageOne,
    setCurrentStage,
    handleStageChange,
    currentStage,
    options,
}) => {
    let { firstName, lastName, email, country } = errors;

    return (
        <section>
            <FormInput
                errorClass={fieldError("firstName")}
                handleKeyDown={(e) => handleKeyDown(e, "firstName")}
                handleChange={handleChange}
                value={values.firstName}
                label="first name"
                name="firstName"
                placeholder="Blessing"
                required={true}
            >
                {firstName.msg && <small>{firstName.msg}</small>}
            </FormInput>

            <FormInput
                errorClass={fieldError("lastName")}
                handleKeyDown={(e) => handleKeyDown(e, "lastName")}
                value={values.lastName}
                handleChange={handleChange}
                label="last name"
                name="lastName"
                placeholder="Olaleye"
                required={true}
            >
                {lastName.msg && <small>{lastName.msg}</small>}
            </FormInput>
            <FormInput
                errorClass={fieldError("email")}
                handleKeyDown={(e) => handleKeyDown(e, "email")}
                value={values.email}
                handleChange={handleChange}
                label="email"
                name="email"
                placeholder="Olaleye@gmail.com"
                required={true}
            >
                {email.msg && <small>{email.msg}</small>}
            </FormInput>
            <FormSelectInput
                options={options}
                label="country"
                value={values.country}
                handleChange={handleChange}
                name="country"
                required={true}
                errorClass={fieldError("country")}
                handleKeyDown={handleKeyDown}
            >
                {country.msg && <small>{country.msg}</small>}
            </FormSelectInput>
            <div className="form__control form__button-container">
                <FormBtn
                    className={disbleStageOne ? "" : "submit"}
                    type="button"
                    disabled={disbleStageOne}
                    text="next"
                    next={true}
                    handleClick={() => {
                        setCurrentStage(currentStage + 1);
                        handleStageChange("personal", 1);
                    }}
                />
            </div>
        </section>
    );
};

export default SignupPersonalInfo;
