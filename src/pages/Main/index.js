import { MainSlider } from "../../components/MainSlider"
import MoviesList from "../../components/MoviesList";
import cls from './Main.module.scss';

export const Main = () => {
    return (
        <div className={cls.root}>
            <MainSlider />
            <MoviesList />
        </div>
    )
}