/* eslint-disable no-useless-escape */
const validateEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const checkUniqueEmail = async (email) => {
    try {
        let req = await fetch(`/authentication/${email}`);
        return req.status === 200;
    } catch (error) {
        console.log(error);
    }
};

export { validateEmail, checkUniqueEmail };
