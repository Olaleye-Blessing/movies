import { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, submitting }) => {
    useEffect(() => {
        let timeout = setTimeout(() => {
            removeAlert();
        }, 4000);
        return () => clearTimeout(timeout);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submitting]);
    return <div className={`alert alert-${type}`}>{msg}</div>;
};

export default Alert;
