const Conditions = ({ conditions }) => {
    return (
        <ul className="conditions">
            {conditions.map((condition) => {
                let { label, text, valid } = condition;
                return (
                    <li
                        key={label}
                        className={`condition ${valid && "condition-valid"}`}
                    >
                        {text}
                    </li>
                );
            })}
        </ul>
    );
};

export default Conditions;
