import { useParams } from "react-router";

const Profile = () => {
    let { id } = useParams();

    console.log({ id });
    return <div>Profile page</div>;
};

export default Profile;
