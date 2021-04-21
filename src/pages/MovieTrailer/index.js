import { useState, useEffect } from "react"
import { useParams } from "react-router";
import { imgUrl, singleMovieRequest, singleMovieTrailerReques } from "../../API/api";
import cls from './MovieTrailer.module.scss';

export const MovieTrailer = () => {
    const [data, setData] = useState(null);
    const [movieTrailer, setMovieTrailer] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        singleMovieRequest(id)
        .then(res => setData(res));

        return () => {}
    }, [setData, id])

    useEffect(() => {
        singleMovieTrailerReques(id)
        .then(res => setMovieTrailer(res.results));

        return () => {}
    }, [id, setMovieTrailer])

    return (
        data ? (
            <div className={cls.root}>
                <div 
                    className={cls.imageBg} 
                    style={{
                        background: `url('${imgUrl + data.backdrop_path}') center / cover`
                    }}
                >
                    {
                        movieTrailer ? (
                            <div className={cls.video}>
                                <iframe width="600px" height="350" src={`https://www.youtube.com/embed/${movieTrailer[0].key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        ) : <h1 className={cls.loading}>Загрузка...</h1>
                    }
                </div>
            </div>
        ) : null
    )
}