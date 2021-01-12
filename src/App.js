import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { Main } from './pages/app/index';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
