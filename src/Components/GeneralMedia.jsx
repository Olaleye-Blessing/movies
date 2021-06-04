import { useGlobalContext } from "../contexts/GlobalContext";
// import useFetch from "../hooks/useFetch";
import useInfiniteScrolling from "../hooks/useInfiniteScrolling";
import useTitle from "../hooks/useTitle";
import LoadingIndicator from "./LoadingIndicator";
import Media from "./MediaBox";

const GeneralMedia = ({ title, type }) => {
    useTitle(title);
    // console.log({ title, type });
    let { key, baseUrl } = useGlobalContext();
    // let page = 1;

    let {
        data: media,
        loading,
        error,
    } = useInfiniteScrolling(
        `${baseUrl}/${type}/popular?api_key=${key}&language=en-US`
    );
    // console.log({ media, loading, error });

    // const { data: genresObj } = useFetch(
    //     `${baseUrl}/genre/${type}/list?api_key=${key}&language=en-US`
    // );

    // let { genres } = genresObj;

    // let newGenres =
    //     genres &&
    //     genres.map((genre) => {
    //         let { id } = genre;
    //         let path = `${baseUrl}/discover/${type}?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}&with_watch_monetization_types=flatrate`;
    //         return { ...genre, path };
    //     });

    return (
        <>
            {/* {newGenres && <Slider items={newGenres} />} */}
            <section className="width" data-sec="media">
                {media.length > 0 &&
                    media.map((med) => {
                        let { id, poster_path, title, name, vote_average } =
                            med;
                        let path = `/${type}s/${id}`;
                        return (
                            <Media
                                key={`${id}`}
                                img={poster_path}
                                alt={title || name}
                                path={path}
                                rate={vote_average}
                            />
                        );
                    })}
            </section>
            {loading && <LoadingIndicator />}
            {error && <div>{error.message || error}</div>}
        </>
    );
};

export default GeneralMedia;
