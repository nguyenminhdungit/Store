import Footer from 'components/Footer';
import Header from 'components/header';
import './app.scss';

import Notfound from 'components/NotFound/Notfound';
import FeatureCart from 'features/Cart';
import Home from 'page/Home';
import ProductPage from 'page/Product';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main">
        <ToastContainer />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/home" component={Home} />
          <Route path="/product" component={ProductPage} />
          <Route path="/cart" component={FeatureCart} />
          <Route component={Notfound} exact />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
