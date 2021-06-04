import { useState } from "react";
import { useHistory } from "react-router";
import excludeKeys from "../utility/excludeKeys";

const useSignUpForm = (validate) => {
    let history = useHistory();
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
        country: "",
    });

    const [submitting, setSubmitting] = useState(false);

    // const [errors, setErrors] = useState({});
    const [errors, setErrors] = useState({
        firstName: { msg: "", status: true },
        lastName: { msg: "", status: true },
        email: { msg: "", status: true },
        country: { msg: "", status: true },
        userName: { msg: "", status: true },
        password: { msg: "", status: true },
        confirmPassword: { msg: "", status: true },
    });
    const handleChange = (e) => {
        let { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });

        // console.log({ ...values });
        // console.log({ value });
        // console.log("handling change");
        setErrors({
            ...errors,
            ...validate(name, value, values),
        });
    };

    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        email: false,
        country: false,
        userName: false,
        password: false,
        confirmPassword: false,
    });

    const handleKeyDown = (e, name) => {
        if (excludeKeys(e)) return;

        setTouched({ ...touched, [name]: true });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // setErrors(validate(values));
        setSubmitting(true);

        let body = JSON.stringify(values);

        console.log(body);

        const sign = async () => {
            try {
                let req = await fetch(`/authentication/signup`, {
                    method: "POST",
                    body,
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                });
                let res = await req.json();
                if (!(req.status >= 200 && req.status <= 299)) throw res;
                // console.log("success");
                // console.log(res);
                setValues({
                    firstName: "",
                    lastName: "",
                    email: "",
                    userName: "",
                    password: "",
                    confirmPassword: "",
                    country: "",
                });
                history.replace("/");
            } catch (error) {
                // console.log("---------- error ------------");
                console.warn(error);
            } finally {
                setSubmitting(false);
            }
        };

        sign();
    };

    return {
        handleChange,
        values,
        errors,
        handleSubmit,
        touched,
        handleKeyDown,
        submitting,
    };
};

export default useSignUpForm;
