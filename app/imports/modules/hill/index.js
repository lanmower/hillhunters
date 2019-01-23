import PM from "platemale";
const config = {
  name: "hill",
  subscribe:false,
  collectionTypes: {
    client: true,
    server: false,
    submission: false
  },
  schema:
  [
    {
      name:'name',
      type: String,
      label:'Name',
      required:true,
      requiredMessage: 'specify name.'
    }
  ]
}
export default PM.initCollections(PM.defaults(config));
