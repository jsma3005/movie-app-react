export const baseURL = 'https://api.themoviedb.org/3';
export const api_key = 'b478c64928b758c517a23bb35c6977a7';
export const language = 'ru-RU';
export const imgUrl = 'https://image.tmdb.org/t/p/original'

export const getMoviesRequest = (page = 1, sortBy) => {
    return fetch(`${baseURL}/movie/${sortBy}?api_key=${api_key}&language=${language}&page=${page}&region=ru`)
    .then(res => res.json())
    .then(r => r);
}

export const singleMovieRequest = id => {
    return fetch(`${baseURL}/movie/${id}?api_key=${api_key}&language=${language}&region=ru`)
    .then(res => res.json())
    .then(r => r);
}

export const singleMovieTrailerReques = id => {
    return fetch(`${baseURL}/movie/${id}/videos?api_key=${api_key}&language=${language}&region=ru`)
    .then(res => res.json())
    .then(r => r);
}

export const searchMovieRequest = (page, query) => {
    return fetch(`${baseURL}/search/movie?api_key=${api_key}&language=${language}&page=${page}&query=${query}`)
    .then(res => res.json())
    .then(r => r);
}