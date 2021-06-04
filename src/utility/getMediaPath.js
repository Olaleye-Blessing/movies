const getMediaPath = (type, id, key) =>
    `https://api.themoviedb.org/3/${type}/${id}?api_key=${key}&language=en-US`;

export default getMediaPath;
