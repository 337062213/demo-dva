import IndexPage from './routes/IndexPage';
import IndexRouter from './routes/index/IndexRouter';
import UserRouter from './routes/user/UserRouter';
import GroupRouter from './routes/group/GroupRouter';
import MockRouter from './routes/mock/MockRouter';
import LoginRouter from './routes/login/LoginRouter';
import PropTypes from 'prop-types';
import { Router, Route, Switch} from 'dva/router';

/**
 * resolve one object to json
 * @param  {string} history       The response we want to resolve
 * @return {object}           An object containing either "data" or "err"
*/
function RouterConfig ({ history }) {
  const routers = [
    {path: '/index', key: 'index', component: IndexPage},
    {path: '/user', key: 'user', component: UserRouter},
    {path: '/group', key: 'group', component: GroupRouter},
    {path: '/mock', key: 'mock', component: MockRouter},
    {path: '/login', key: 'login', component: LoginRouter},
    {path: '/', key: 'default', component: IndexRouter},
  ];
  return (
    <Router history={history}>
      <Switch>{routers.map(({path, key, component}) => (<Route path={path} key={key} component={component}></Route>))}
      </Switch>
    </Router>
  );
}

RouterConfig.propTypes = {
  history: PropTypes.object.isRequired,
};
export default RouterConfig;
