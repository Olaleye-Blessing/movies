import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Gallery from "../Components/Gallery";
import LoadingIndicator from "../Components/LoadingIndicator";
import { useGlobalContext } from "../contexts/GlobalContext";
import useFetch from "../hooks/useFetch";
import notFound from "./../images/404.jpg";

const TvShow = () => {
    let { id } = useParams();
    let { key, baseUrl } = useGlobalContext();

    let tvUrl = `${baseUrl}/tv/${id}?api_key=${key}&language=en-US`;
    let {
        data: tvshow,
        error: errTvshow,
        isPending: loadingTvShow,
    } = useFetch(tvUrl);

    console.log(tvshow);

    let creditUrl = `${baseUrl}/tv/${id}/credits?api_key=${key}&language=en-US`;

    let {
        data: castsResult,
        // isPending: castPending,
        // error: castError,
    } = useFetch(creditUrl);

    let cast = castsResult?.cast;
    console.log(cast);

    let w300 = `https://image.tmdb.org/t/p/w185/`;
    const handleDragStart = (e) => e.preventDefault();
    let items = cast?.map((c) => (
        <div className="gallery__item">
            <Link to={`/person/${c.id}`} target="_blank">
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

    if (loadingTvShow) {
        return <LoadingIndicator />;
    }

    if (errTvshow) {
        return <div>error...</div>;
    }

    return (
        <main className="width">
            <section className="smedia">
                <figure className="smedia__img">
                    <img
                        src={`https://image.tmdb.org/t/p/w300${tvshow.poster_path}`}
                        alt={tvshow.original_name}
                    />
                </figure>
                <section className="smedia__detail">
                    <header className="smedia__title">
                        <h2>{tvshow.original_name}</h2>
                        <span>({tvshow.first_air_date})</span>
                    </header>
                    <p className="smedia__overview">{tvshow.overview}</p>
                    <div className="smedia__slider">
                        <Gallery items={items} />
                    </div>
                    <div className="smedia__trialer">
                        <Link
                            to="/"
                            className="btn btn-link btn-border btn-extra"
                        >
                            watch trialer
                        </Link>
                    </div>
                </section>
            </section>
            <section className="smedia__reviews">reviews</section>
        </main>
    );
};

export default TvShow;
