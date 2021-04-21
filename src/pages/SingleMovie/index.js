import { useState } from 'react';
import { useEffect } from 'react';
import cls from './SingleMovie.module.scss';
import { imgUrl, singleMovieRequest } from '../../API/api';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export const SingleMovie = () => {
    const [data, setData] = useState(null);
    const { id } = useParams();
    
    useEffect(() => {
        singleMovieRequest(id)
        .then(res => setData(res));

        return () => {}
    }, [setData, id])

    return(
        data ? (
            <div 
                className={cls.root}
            >
                <div 
                    className={cls.imageBg} 
                    style={{
                        background: `url('${imgUrl + data.backdrop_path}') center / cover`
                    }}
                >
                    <div className={cls.content}>
                        <div className={cls.genres}>
                            {
                                data.genres.map(item => (
                                    <span className={`genre-${item.id}`} key={item.id}>{item.name}</span>
                                ))
                            }
                        </div>
                        <h1 className={cls.title}>
                            {data.title}
                        </h1>
                        <h1 className={cls.originalTitle}>({data.original_title})</h1>
                        <p className={cls.description}>{data.overview}</p>
                        <div className={cls.prodCompanies}>
                            {
                                data.production_companies && data.production_companies.length !== 0 && (
                                    data.production_companies.map(({id, name, logo_path}) => (
                                        logo_path && <img title={name} key={id} alt={name} src={imgUrl + logo_path} />
                                    ))
                                )
                            }
                        </div>
                        <div className={cls.videoTrailer}>
                            <Link to={`/movie/trailer/${data.id}`} className='btn btn-lg btn-danger' >Смотреть трейлер</Link>
                        </div>
                    </div>
                </div>
            </div>
        ) : null
    )
}