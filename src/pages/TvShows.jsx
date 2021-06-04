import LoadingIndicator from "../Components/LoadingIndicator";
import Media from "../Components/MediaBox";
import { useGlobalContext } from "../contexts/GlobalContext";
import useInfiniteScrolling from "../hooks/useInfiniteScrolling";
import useTitle from "../hooks/useTitle";

const TvShows = () => {
    let { key, baseUrl } = useGlobalContext();
    useTitle("Wahala || TvShow");
    let {
        data: tvshows,
        loading,
        error,
    } = useInfiniteScrolling(
        `${baseUrl}/tv/popular?api_key=${key}&language=en-US`
    );

    return (
        <>
            <section className="width" data-sec="media">
                {tvshows.length > 0 &&
                    tvshows.map((tv) => {
                        let { id, poster_path, name, vote_average } = tv;
                        let path = `/tv/${id}`;
                        return (
                            <Media
                                key={`${id}`}
                                img={poster_path}
                                alt={name}
                                path={path}
                                rate={vote_average}
                            />
                        );
                    })}
            </section>
            {loading && <LoadingIndicator />}
            {error && <div>{error}</div>}
        </>
    );
};

export default TvShows;
