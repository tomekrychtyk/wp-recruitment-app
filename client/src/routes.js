import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';

import asyncComponent from './common/hoc/async';

const Home = asyncComponent({
  importFunc: () => import(/* webpackChunkName:"Home" */ './components/Home'),
});

const SectionList = asyncComponent({
  importFunc: () => import(/* webpackChunkName:"SectionList" */ './components/SectionList'),
});

const Section = asyncComponent({
  importFunc: () => import(/* webpackChunkName:"Section" */ './components/Section'),
});

const Login = asyncComponent({
  importFunc: () => import(/* webpackChunkName:"Login" */ './components/Login'),
});

const Logout = asyncComponent({
  importFunc: () => import(/* webpackChunkName:"Logout" */ './components/Logout'),
});

const Signup = asyncComponent({
  importFunc: () => import(/* webpackChunkName:"Signup" */ './components/Signup'),
});

const Confirm = asyncComponent({
  importFunc: () => import(/* webpackChunkName:"Confirm" */ './components/Confirm'),
});

const Photo = asyncComponent({
  importFunc: () => import(/* webpackChunkName:"Photo" */ './components/Photo'),
});

const Favs = asyncComponent({
  importFunc: () => import(/* webpackChunkName:"Favs" */ './components/Favs'),
});

const FourOFour = asyncComponent({
  importFunc: () => import(/* webpackChunkName:"FourOFour" */ './components/FourOFour'),
});

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/sections" component={SectionList} />
    <Route path="/section/:id" component={Section} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/signup" component={Signup} />
    <Route path="/confirm" component={Confirm} />
    <Route path="/photo/:id" component={Photo} />
    <Route path="/favs" component={Favs} />
    <Route component={FourOFour} />
  </Switch>
);

export default withRouter(Routes);
