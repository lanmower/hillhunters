import list from './pages/Tracks';
import create from './pages/NewTrack';
import view from './pages/ViewTrack';

export default {routes:[
        {path:"/tracks/new", component:create},
        {path:"/tracks/:_id", component:view},
        {path:"/tracks", component:list}
    ]};
