const FormSelectInput = ({
    options,
    label,
    name,
    value,
    handleChange,
    children,
    required,
    errorClass,
    handleKeyDown,
}) => {
    return (
        <div className="form__control">
            <label htmlFor={name} className="form__label">
                {label}
            </label>
            <div className="select-wrapper">
                <select
                    name={name}
                    id={name}
                    value={value}
                    onChange={(e) => {
                        handleChange(e);
                        handleKeyDown(name);
                    }}
                    className={`form__select ${errorClass}`}
                >
                    {options &&
                        options.map((option) => {
                            let { text } = option;
                            return (
                                <option key={text} value={text}>
                                    {text}
                                </option>
                            );
                        })}
                </select>
            </div>
            {required && <span className={`required ${errorClass}`}></span>}
            {children}
        </div>
    );
};

export default FormSelectInput;
