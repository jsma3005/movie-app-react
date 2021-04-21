import cls from './Title.module.scss';

export const Title = ({ title }) => {
    return (
        <div className={cls.title}>
            <h1>{title}</h1>
        </div>
    )
}