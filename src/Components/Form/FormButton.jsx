import React from "react";
// import PropTypes from "prop-types";

const FormButton = ({ text, disabled, type, next, handleClick }) => {
    // console.log(disabled);
    return (
        <div className="form__control form__button-container">
            <button
                type={type}
                className={`form__button ${disabled && "disabled"} ${
                    next && "form__button-next"
                }`}
                disabled={disabled}
                onClick={handleClick}
            >
                {text}
            </button>
        </div>
    );
};

FormButton.defaultProps = {
    type: "submit",
    next: "",
};

export default FormButton;
