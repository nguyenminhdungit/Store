import logo from './logo.svg';
import './app.scss';
import Header from 'components/header';
import Footer from 'components/Footer';

import { Redirect, Route, Switch } from 'react-router-dom';
import Home from 'page/Home';
import ProductPage from 'page/Product';
import Notfound from 'components/NotFound/Notfound';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/home" component={Home} />
          <Route path="/product" component={ProductPage} />
          <Route component={Notfound} exact />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
