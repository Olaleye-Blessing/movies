import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Gallery from "./../Components/Gallery";
import LoadingIndicator from "./../Components/LoadingIndicator";
import { useGlobalContext } from "./../contexts/GlobalContext";
import useFetch from "../hooks/useFetch";
import notFound from "./../images/404.jpg";
import { FaYoutube } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchData } from "../utility/fetchData";
// import MediaProfile from "./MediaProfile";

const Media = ({ type }) => {
    let { id } = useParams();
    const [trialer, setTrialer] = useState([]);

    let { key, baseUrl } = useGlobalContext();

    let mediaUrl = `${baseUrl}/${type}/${id}?api_key=${key}&language=en-US`;

    let {
        data: media,
        error: mediaErr,
        isPending: mediaLoading,
    } = useFetch(mediaUrl);

    let creditUrl = `${baseUrl}/${type}/${id}/credits?api_key=${key}&language=en-US`;

    let {
        data: castsResult,
        isPending: castPending,
        // error: castError,
    } = useFetch(creditUrl);

    let cast = castsResult?.cast;

    let w300 = `https://image.tmdb.org/t/p/w185/`;
    const handleDragStart = (e) => e.preventDefault();
    let items = cast?.map((c) => (
        <div className="gallery__item">
            <Link to={`/person/${c.id}`}>
                <img
                    src={
                        c.profile_path ? `${w300}/${c.profile_path}` : notFound
                    }
                    alt={c?.name}
                    onDragStart={handleDragStart}
                    className="gallery__item-img"
                />
                <span className="gallery__item-txt">{c?.name}</span>
            </Link>
        </div>
    ));

    let trailerLink = `${baseUrl}/${type}/${id}/videos?api_key=${key}&language=en-US`;
    useEffect(() => {
        let abortFetch = new AbortController();
        let signal = abortFetch.signal;
        fetchData(trailerLink, signal).then((data) => {
            let result = data.results;
            setTrialer(result?.[0]);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // console.log({ trialer });

    if (mediaLoading) {
        return <LoadingIndicator />;
    }

    if (mediaErr) {
        return <div>error...</div>;
    }

    const galleryResponsiveness = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
        1024: {
            items: 6,
        },
    };

    return (
        <main className="width">
            <section className="smedia">
                <figure className="smedia__img">
                    <img
                        src={`https://image.tmdb.org/t/p/w300${media.poster_path}`}
                        alt={media.original_title || media.original_name}
                    />
                </figure>
                <section className="smedia__detail">
                    <header className="smedia__title">
                        <h2>{media.original_title || media.original_name}</h2>
                        <span>
                            ({media.release_date || media.first_air_date})
                        </span>
                    </header>
                    <p className="smedia__overview">{media.overview}</p>
                    <div className="smedia__slider">
                        {castPending && <LoadingIndicator />}
                        {!castPending && (
                            <Gallery
                                responsive={galleryResponsiveness}
                                items={items}
                                animationDuration="3000"
                                autoPlayInterval="300"
                            />
                        )}
                    </div>
                    <div className="smedia__trialer">
                        <a
                            href={`https://www.youtube.com/watch?v=${trialer.key}`}
                            className="btn btn-link btn-border btn-extra"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaYoutube />
                            watch trialer
                        </a>
                    </div>
                </section>
            </section>
        </main>
    );
};

export default Media;
