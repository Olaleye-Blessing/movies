import React from "react";

const DefaultFormInput = ({ label, name, value }) => {
    return (
        <div className="form__control">
            <label htmlFor={name} className="form__label">
                {label}
            </label>
            <input
                className={`form__input`}
                id={name}
                name={name}
                type="text"
                defaultValue={value}
                disabled={true}
            />
        </div>
    );
};

export default DefaultFormInput;
