// import { Link } from "react-router-dom";
// import Gallery from "./Gallery";

const MediaProfile = ({ media, children }) => {
    return (
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
                    <span>({media.release_date || media.first_air_date})</span>
                </header>
                <p className="smedia__overview">{media.overview}</p>
                {children}
                {/* <div className="smedia__slider">
                    <Gallery items={items} />
                </div>
                <div className="smedia__trialer">
                    <Link to="/" className="btn btn-link btn-border btn-extra">
                        watch trialer
                    </Link>
                </div> */}
            </section>
        </section>
    );
};

export default MediaProfile;
