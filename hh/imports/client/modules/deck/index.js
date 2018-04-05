import create from './pages/NewDeck';
import view from './pages/ViewDeck';
import edit from './pages/EditDeck';
import list from './pages/Decks';

export default {routes:[
        {path:"/decks/new", component:create},
        {path:"/decks/:_id", component:view},
        {path:"/decks/edit/:_id", component:edit},
        {path:"/decks", component:list}
    ]};
