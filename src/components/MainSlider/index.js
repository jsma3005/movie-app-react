import { useEffect, useState } from 'react'
import { getMoviesRequest } from '../../API/api';
import cls from './MainSlider.module.scss';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { imgUrl } from '../../API/api';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import { genresList } from '../../utils/genres';
import { filterGenres } from '../../utils/funcs';

export const MainSlider = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        getMoviesRequest(1, 'popular')
        .then(res => setData(res.results.slice(0, 4)));
    }, [setData])

    const AutoplaySlider = withAutoplay(AwesomeSlider);

    return (
        <div className={cls.root}>
            <AutoplaySlider 
                animation="cubeAnimation"
                play={true}
                cancelOnInteraction={false}
                interval={3000}
                bullets={false}
                className={cls.carouselContainer}
            >
                {
                    data ? data.map(({id, backdrop_path, title, release_date, genre_ids}) => (
                        <div 
                            key={id} 
                            style={{
                                background: `url('${imgUrl}${backdrop_path}') center / cover`
                            }}
                            className={cls.carouselItem}
                        >
                                <div className={cls.content}>
                                    <h1 className={cls.title}>{title}</h1>
                                    <h2 className={cls.date}>{release_date}</h2>
                                    <div className={cls.genres}>
                                        {
                                            filterGenres(genresList, genre_ids).map(item => (
                                                <span className={`genre-${item.id}`} key={item.id}>{item.name}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                        </div>
                    )) : null
                }
            </AutoplaySlider>
        </div>
    )    
}