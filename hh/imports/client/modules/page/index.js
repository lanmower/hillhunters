import Page from './pages/Page';
import edit from './pages/EditPage';
import list from './pages/Pages';
import create from './pages/NewPage';

export default {routes:[
        {path:"/pages/new", component:create},
        {path:"/pages", component:list},
        {path:"/page/:name", component:Page} ,
        {path:"/pages/edit/:_id", component:edit}
    ]};
