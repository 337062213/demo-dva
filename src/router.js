import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import IndexRouter from './routes/index/IndexRouter';
import Production from './routes/production/production';
import User from './routes/user/UserRouter';
import GroupRouter from './routes/group/GroupRouter';
import Mock from './routes/mock/mockRouter';
import LoginRoute from './routes/login/LoginRoute';
import PropTypes from 'prop-types';

/**
 * resolve one object to json
 * @param  {string} history       The response we want to resolve
 * @return {object}           An object containing either "data" or "err"
*/
function RouterConfig ({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={ IndexRouter } />
        <Route path="/index" component={ IndexPage } />
        <Route path="/production" component={ Production } />
        <Route path="/user" component={User}/>
        <Route path="/group" component={GroupRouter}/>
        <Route path="/mock" component={Mock}/>
        <Route path="/login" component={LoginRoute}/>
      </Switch>
    </Router>
  );
}
RouterConfig.propTypes = {
  history: PropTypes.object.isRequired,
};
export default RouterConfig;
