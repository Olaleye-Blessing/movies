import LoadingIndicator from "../Components/LoadingIndicator";
import Media from "../Components/MediaBox";
import { useGlobalContext } from "../contexts/GlobalContext";
import useInfiniteScrolling from "../hooks/useInfiniteScrolling";
import useTitle from "../hooks/useTitle";

const People = () => {
    let { key } = useGlobalContext();
    useTitle("Wahala || People");
    let {
        data: people,
        loading,
        error,
    } = useInfiniteScrolling(
        `https://api.themoviedb.org/3/person/popular?api_key=${key}&language=en-US`
    );
    // console.log(error);
    return (
        <>
            <section className="width" data-sec="media">
                {people.length > 0 &&
                    people.map((person) => {
                        let { id, profile_path, name, popularity } = person;
                        popularity = +popularity.toFixed(2);
                        let path = `/person/${id}`;
                        return (
                            <Media
                                key={`${id}`}
                                img={profile_path}
                                alt={name}
                                type="person"
                                path={path}
                                rate={popularity}
                            />
                        );
                    })}
            </section>
            {loading && <LoadingIndicator />}
            {error && <div>{error}</div>}
        </>
    );
};

export default People;
