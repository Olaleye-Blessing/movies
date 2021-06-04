import { useParams } from "react-router";
import LoadingIndicator from "../Components/LoadingIndicator";
import { useGlobalContext } from "../contexts/GlobalContext";
import useFetch from "../hooks/useFetch";

const Person = () => {
    let { id } = useParams();
    let { key, baseUrl } = useGlobalContext();
    //api.themoviedb.org/3/person/11701?api_key=651ef57b1ca582995fef27ff08df6717&language=en-US

    let personUrl = `${baseUrl}/person/${id}?api_key=${key}&language=en-US`;

    let {
        data: person,
        error: personErr,
        isPending: personLoading,
    } = useFetch(personUrl);

    if (personLoading) {
        return <LoadingIndicator />;
    }

    if (personErr) {
        return <div>error...</div>;
    }

    return (
        <main className="width">
            <section className="smedia">
                <figure className="smedia__img">
                    <img
                        src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                        alt={person.name}
                    />
                </figure>
                <section className="smedia__detail">
                    <header className="smedia__title">
                        <h2>{person.name}</h2>
                        {person.birthday && <span>({person.birthday})</span>}
                        <span>({person.deathday || "alive"})</span>
                    </header>
                    <p className="smedia__overview">{person.biography}</p>
                </section>
            </section>
        </main>
    );
};

export default Person;
