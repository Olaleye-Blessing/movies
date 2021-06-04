import { Link } from "react-router-dom";
import notFound from "./../images/404.jpg";

let baseUrl = `https://image.tmdb.org/t/p/w500`;
const Media = ({ img, alt, rate, path }) => {
    let imgSrc = img ? `${baseUrl}/${img}` : notFound;

    return (
        <div className="media">
            <Link to={path} className="media__link">
                <figure className="media__img-cont">
                    <img src={imgSrc} alt={alt} className="media__img" />
                </figure>
                <div className="media__details">
                    <span className="media__pop">{alt}</span>
                    <span className="media__pop-value box">{rate}</span>
                </div>
            </Link>
        </div>
    );
};

export default Media;
