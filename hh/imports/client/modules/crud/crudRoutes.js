import { createContainer } from 'meteor/react-meteor-data';
import List from './List';
import View from './View';
import Edit from './Edit';
import New from './New';

const viewRoute = (Collection, ViewContent, subscribe = true) => {
        return {
            path: "/" + Collection._name + "/:_id", component: createContainer(({ match }) => {
                const { _id } = match.params;
                const subscription = Meteor.subscribe(Collection._name + '.view', _id);
                const doc = Collection.findOne(_id);
                const loading = subscribe?!subscription.ready():false;
                return { loading, ViewContent, doc };
            }, View)
        }
    }

const listRoute = (Collection, renderDoc, button, subscribe = true) => {
    console.log(Collection, renderDoc);
    return {
        path: "/" + Collection._name, component: createContainer(({ match, history }) => {
            const subscription = Meteor.subscribe(Collection._name, name);
            const docs = Collection.find().fetch();
            const loading = subscribe?!subscription.ready():false;
            return {loading, docs, Collection, renderDoc, match, history, button };
        }, List)
    }
}

const newRoute = (Collection, Editor) => {
    return {
            path: "/decks/new", component: createContainer(({ match }) => {
                return {
                    Editor
                };
            }, New)
        }
}
const editRoute = (Collection, Editor, subscribe = true) => {
    return {
            path: "/decks/:_id/edit", component: createContainer(({ match }) => {
                const { _id } = match.params;
                const subscription = Meteor.subscribe(Collection._name + '.view', _id);
                const doc = Collection.findOne(_id);
                const loading = subscribe?!subscription.ready():false;
                return {loading, doc, Editor};
            }, Edit)
        }
}

export {viewRoute, listRoute, newRoute, editRoute};
