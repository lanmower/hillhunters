import list from './pages/Skates';
import view from './pages/ViewSkate';

export default {routes:[
        {path:"/skates/:_id", component:view},
        {path:"/skates", component:list}
    ]};
