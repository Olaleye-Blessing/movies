import LoadingIndicator from "../Components/LoadingIndicator";
import Media from "../Components/MediaBox";
import { useGlobalContext } from "../contexts/GlobalContext";
import useInfiniteScrolling from "../hooks/useInfiniteScrolling";

const MediaSearch = () => {
    let { searchQuery, key } = useGlobalContext();

    let pathUrl = `https://api.themoviedb.org/3/search/multi?api_key=${key}&language=en-US&query=${searchQuery}&include_adult=true`;

    let { data: allMedia, loading, error } = useInfiniteScrolling(pathUrl);

    if (!searchQuery) {
        return <span></span>;
    }

    return (
        <section className="width">
            <section className="width" data-sec="media">
                {allMedia.length > 0 &&
                    allMedia.map((media, i) => {
                        let {
                            id,
                            poster_path,
                            profile_path,
                            name,
                            title,
                            media_type,
                            popularity,
                            vote_average,
                        } = media;
                        let path =
                            media_type === "person"
                                ? `/person/${id}`
                                : media_type === "tv"
                                ? `/tv/${id}`
                                : `/movies/${id}`;
                        return (
                            <Media
                                key={`${id}${i}`}
                                img={poster_path || profile_path}
                                alt={title || name}
                                path={path}
                                rate={vote_average || popularity}
                                type={media_type === "person" && "person"}
                            />
                        );
                    })}
            </section>
            {loading && <LoadingIndicator />}
            {error && searchQuery !== "" && <div>{error.message || error}</div>}
        </section>
    );
};

export default MediaSearch;
