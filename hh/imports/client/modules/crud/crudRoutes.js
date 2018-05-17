

import { createContainer } from 'meteor/react-meteor-data';
import List from './List';
import View from './View';
import Edit from './Edit';
import New from './New';

const viewRoute = (Collection, ViewContent, subscribe = true) => {
        return {
            path: "/" + Collection._name + "/:_id", component: createContainer(({ match }) => {
                const { _id } = match.params;
                const subscription = subscribe?Meteor.subscribe(Collection._name + '.view', _id):false;
                const doc = Collection.findOne(_id);
                const loading = subscribe?(!subscription.ready()):false;
                return { loading, ViewContent, doc };
            }, View)
        }
    }

const listRoute = (Collection, renderDoc, button, subscribe = true, autoButton = true) => {
    return {
        path: "/" + Collection._name, component: createContainer(({ match, history }) => {
            console.log(Collection._name);
            const subscription = subscribe?Meteor.subscribe(Collection._name):false;
            const docs = Collection.find().fetch();
            const loading = subscribe?(!subscription.ready()):false;
            console.log(loading, subscribe);
            return {loading, docs, Collection, renderDoc, match, history, button, autoButton };
        }, List)
    }
}

const newRoute = (Collection, Editor) => {
    return {
            path: "/"+Collection._name+"/new", component: createContainer(({ match }) => {
                return {
                    Editor,
                };
            }, New)
        }
}

const editRoute = (Collection, Editor, subscribe = true) => {
    return {
            path: "/"+Collection._name+"/:_id/edit", component: createContainer(({ match }) => {
                const { _id } = match.params;
                const subscription = subscribe?Meteor.subscribe(Collection._name + '.view', _id):null;
                const doc = Collection.findOne(_id);
                const loading = subscribe?(!subscription.ready()):false;
                return {loading, doc, Editor};
            }, Edit)
        }
}

export {viewRoute, listRoute, newRoute, editRoute};
