
export default {
  name: "hill",
  offline:true,
  subscribe:true,
  listView: {
    primary: ({name})=>{return name?name:''},
    secondary: () => {return null},
    extra: ()=>{return null}
  },
  views: {
    view: (data)=>{return data},
    print: (data)=>{return data},
    form: (data)=>{return data},
  },
  methods: {
    insert:true,
    remove:true,
    update:true
  },
  publish: {
    view:true,
    list:true
  },
  schema:
  [
    {
      name:'name',
      type: String,
      label:'Name',
      default:'',
      required:true,
      requiredMessage: 'specify name.'
    }
  ]
};
