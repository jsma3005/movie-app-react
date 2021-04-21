import { useEffect, useState } from 'react';
import { getMoviesRequest, searchMovieRequest } from '../../API/api';
import { imgUrl } from '../../API/api';
import cls from './MoviesList.module.scss';
import Tilt from 'react-parallax-tilt';
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import { paginationArray } from '../../utils/funcs';
import { Title } from '../Title';
import { Link } from 'react-router-dom';

const MoviesList = () => {
    const [data, setData] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const [page, setPage] = useState(1);
    const [slicedFrom, setSlicedFrom] = useState(0);
    const [slicedTo, setSlicedTo] = useState(5);
    const [sortBy, setSortBy] = useState('popular');
    const [searchString, setSearchString] = useState('');
    const totalPagesArray = paginationArray(totalPages).slice(slicedFrom, slicedTo);
    const pageTitle = sortBy === 'popular' ? 'Популярные на данный момент' : sortBy === 'upcoming' ? 'Ожидаемые фильмы' : 'Самые рейтинговые';

    useEffect(() => {
        if(searchString === ""){
            getMoviesRequest(page, sortBy)
            .then(res => {
                setData(res.results);
                setTotalPages(res.total_pages);
            });
        }else{
            setSlicedFrom(0)
            setSlicedTo(5);
            setPage(1)

            setTimeout(() => {
                searchMovieRequest(page, searchString)
                .then(res => {
                    setData(res.results);
                })
            }, 1200);
        }
    }, [setData, page, sortBy, searchString])

    const nextPage = () => {
        setPage(prev => prev + 1);
        setSlicedFrom(prev => prev + 1);
        setSlicedTo(prev => prev + 1);
    };
    const prevPage = () => {
        setPage(prev => prev - 1);
        if(slicedTo > 5){
            setSlicedFrom(prev => prev - 1);
            setSlicedTo(prev => prev - 1);
        }
    };
    const handlePage = item => {
        setPage(item);
        const midleItem = totalPagesArray[2];
        if((item - midleItem) === 1){
            setSlicedFrom(prev => prev + 1);
            setSlicedTo(prev => prev + 1);
        }else if((item - midleItem) === 2){
            setSlicedFrom(prev => prev + 2);
            setSlicedTo(prev => prev + 2);
        }

        if(slicedFrom > 1){
            if((midleItem - item) === 1){
                setSlicedFrom(prev => prev - 1);
                setSlicedTo(prev => prev - 1);
            }else if((midleItem - item) === 2){
                setSlicedFrom(prev => prev - 2);
                setSlicedTo(prev => prev - 2);
            }
        }
    }

    const handleChangeFiltering = e => {
        setSortBy(e.target.value);
        setSlicedFrom(0);
        setSlicedTo(5);
        setPage(1);
    }

    const handleSearch = e => {
        setSearchString(e.target.value);
    }

    return (
        <div className={cls.root}>
            <div className={cls.line}>
            </div>
            <div className={cls.content}>
                <Title title={pageTitle} />
                <div className={cls.filtering}>
                    <select onChange={handleChangeFiltering} className="form-select">
                        <option value="popular">Популярные на данный момент</option>
                        <option value="upcoming">Ожидаемые</option>
                        <option value="top_rated">Самые рейтинговые</option>
                    </select>
                </div>
                <div className={cls.searching}>
                    <input type='text' onChange={handleSearch} className='form-control' placeholder='Поиск фильма по названию' />
                </div>
                <div className={cls.cards}>
                    {
                        data ? (
                            data.map(({id, poster_path}) => (
                                <Tilt
                                    className={cls.cardItem} 
                                    style={{
                                        background: `url('${poster_path ? (imgUrl + poster_path) : 'https://linnea.com.ar/wp-content/uploads/2018/09/404PosterNotFound.jpg'}') center / cover`
                                    }}
                                    key={id}
                                >
                                    <div className={cls.innerElement}>
                                        <Link to={`/movie/${id}`} className={cls.btnMore}>Подробнее</Link>
                                    </div>
                                </Tilt>
                            ))
                        ) : null
                    }
                </div>
                <div className={cls.pagination}>
                    <button disabled={page <= 1 ? true : false } onClick={prevPage} className={cls.pagePrev}><IoIosArrowBack /></button>
                    <ul className={cls.pageList}>
                        {
                            totalPagesArray.map(item => (
                                <li key={item}>
                                    <button onClick={() => {
                                        handlePage(item);
                                    }} className={`${cls.pageItem} ${page === item ? cls.activePage : null}`}>{item}</button>
                                </li>
                            ))
                        }
                    </ul>
                    <button disabled={page === totalPages ? true : false } onClick={nextPage} className={cls.pageNext}><IoIosArrowForward /></button>
                </div>
            </div>
        </div>
    )
}

export default MoviesList