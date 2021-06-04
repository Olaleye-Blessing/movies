import DefaultFormInput from "./DefaultFormInput";

const ConfirmPage = ({ confirm }) => {
    return (
        <>
            {confirm.map((item) => {
                let { label, value } = item;
                return (
                    <DefaultFormInput
                        key={label}
                        label={label}
                        value={value}
                        // name={name}
                    />
                );
            })}
        </>
    );
};

export default ConfirmPage;
