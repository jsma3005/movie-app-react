import { Redirect, Route, Switch } from 'react-router';
import { Main } from './pages/Main';
import { MovieTrailer } from './pages/MovieTrailer';
import { SingleMovie } from './pages/SingleMovie';
import './utils/genres.css';

const App = () => {
    return (
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/movie/:id" exact component={SingleMovie} />
            <Route path="/movie/trailer/:id" component={MovieTrailer} />
            <Redirect to="/" />
        </Switch>
    )
}

export default App