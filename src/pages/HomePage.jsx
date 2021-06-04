import React from "react";
import LoadingIndicator from "../Components/LoadingIndicator";
import Media from "../Components/MediaBox";
import { useGlobalContext } from "../contexts/GlobalContext";
import useInfiniteScrolling from "../hooks/useInfiniteScrolling";

const Homepage = () => {
    let { key } = useGlobalContext();
    let {
        data: allMedia,
        loading,
        error,
    } = useInfiniteScrolling(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${key}&language=en-US`
    );

    return (
        <main className="home">
            <section className="width">
                <section className="width" data-sec="media">
                    {allMedia.length > 0 &&
                        allMedia.map((media) => {
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
                                    key={`${id}`}
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
                {error && <div>{error.message || error}</div>}
            </section>
        </main>
    );
};

export default Homepage;
