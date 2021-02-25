import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Footer, Navbar, Sidebar } from './components';
import {
  Home,
  Error,
  About,
  Checkout,
  SingleProduct,
  Products,
  Cart,
  PrivateRoute,
  AuthWrapper,
} from './containers';

const App = () => {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <PrivateRoute exact path="/checkout">
            <Checkout />
          </PrivateRoute>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/products/:id">
            <SingleProduct />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </AuthWrapper>
  );
};

export default App;
