import PropTypes from "prop-types";

const FormInput = ({
    label,
    name,
    type,
    placeholder,
    value,
    required,
    children,
    handleChange,
    handleKeyDown,
    errorClass,
}) => {
    // console.log(errorClass);
    return (
        <div className="form__control">
            <label htmlFor={name} className="form__label">
                {label}
            </label>
            <input
                // onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                value={value}
                onChange={handleChange}
                // onBlur={validate}
                className={`form__input ${errorClass}`}
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
            />
            {required && <span className={`required ${errorClass}`}></span>}
            {children}
        </div>
    );
};

FormInput.propTypes = {
    name: PropTypes.string.isRequired,
};

FormInput.defaultProps = {
    placeholder: "",
    type: "text",
    errorClass: "",
    required: false,
    ref: null,
};

export default FormInput;
