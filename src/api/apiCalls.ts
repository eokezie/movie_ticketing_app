const movieApiKey = 'c4d2ef7a42f2f0e2a3e50333603e981e';
export const nowPlayingMovies:string = 
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${movieApiKey}`;
export const upcomingMovies:string = 
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${movieApiKey}`;
export const popularMovies:string = 
    `https://api.themoviedb.org/3/movie/popular?api_key=${movieApiKey}`;
export const searchMovies = (keyword:string) => {
    return `https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${keyword}`;
}
export const movieDetails = (id:number) => {
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${movieApiKey}`;
}
export const movieCastDetails = (id:number) => {
    return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${movieApiKey}`;
}

export const baseImagePath = (size:string, path:string) => {
    return `https://image.tmdb.org/t/p/${size}${path}`
}