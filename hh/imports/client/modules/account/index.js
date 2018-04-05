import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Logout from './pages/Logout';
import RecoverPassword from './pages/RecoverPassword';
import ResetPassword from './pages/ResetPassword';

export default {routes: [
        {path:"/profile", component:Profile},
        {path:"/signup", component:Signup},
        {path:"/login", component:Login},
        {path:"/logout", component:Logout},
        {path:"/recover-password", component:RecoverPassword},
        {path:"/reset-password/:token", component:ResetPassword}
    ]};