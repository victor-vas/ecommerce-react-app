import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Footer, Navbar, Sidebar } from './components';
import { Home, Error } from './containers';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
