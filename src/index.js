import dva from 'dva';
import './index.css';
import * as serviceWorker from './service';
// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});
serviceWorker.unregister();

// 3. Model
app.model(require('./models/example')['default']);
app.model(require('./models/group/GroupModel')['default']);
app.model(require('./models/mock/MockModel')['default']);
app.model(require('./models/user/UserModel')['default']);
app.model(require('./models/login/LoginModel')['default']);
// 4. Router
app.router(require('./router')['default']);

// 5. Start
app.start('#root');
