import PM from "platemale";
const config = {
  name: "deck",
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
    },
    {
      name:'shape',
      type: String,
      label:'Shape',
      required:true,
      element: 'imageSelect',
      options:[
        { value: 'directional-cutaway'},
        { value: 'doublekick-cutaway'},
        { value: 'pintail'},
        { value: 'pintail-kicktail'},
        { value: 'popsickle'},
      ],
      path:"shapes",
      requiredMessage: 'specify shape.'
    },
    {
      name:'edge',
      type: String,
      label:'Edge',
      required:true,
      element: 'imageSelect',
      options:[
        { value: 'straight'},
        { value: 'dropped'},
      ],
      path:"edges",
      requiredMessage: 'specify edge.'
    },
    {
      name:'mount',
      type: String,
      label:'Mount',
      required:true,
      element: 'imageSelect',
      options:[
        { value: 'drop'},
        { value: 'top'},
      ],
      path:"mount",
      requiredMessage: 'specify mount.'
    },
    {
      name:'curve',
      type: String,
      label:'Curve',
      required:true,
      element: 'imageSelect',
      options:[
        { value: 'concave'},
        { value: 'convex'},
        { value: 'straight'},
        { value: 'w'},
      ],
      path:"curves",
      requiredMessage: 'specify curve.'
    },
    {
      name:'griptape',
      type: String,
      label:'Grip Tape',
      required:true,
      element: 'select',
      options:[
        { value: 'fine', label: 'fine' },
        { value: 'medium', label: 'medium' },
        { value: 'rough', label: 'rough' }
      ],
      requiredMessage: 'specify grip tape.'
    },
    {
      name:'bushinghardness',
      type: Number,
      label:'Bushing Hardness',
      required:true,
      element: 'slider',
      min:65,
      max:110,
      step:2,
      requiredMessage: 'specify bushing hardness.'
    },
    {
      name:'orientationfront',
      type: String,
      label:'Front wheel orientation',
      required:true,
      element: 'imageSelect',
      options:[
        { value: 'boardside'},
        { value: 'roadside'},
      ],
      path:"orientations/front",
      requiredMessage: 'specify front orientation.'
    },
    {
      name:'orientationrear',
      type: String,
      label:'Rear wheel orientation',
      required:true,
      element: 'imageSelect',
      options:[
        { value: 'boardside'},
        { value: 'roadside'},
      ],
      path:"orientations/rear",
      requiredMessage: 'specify rear orientation.'
    },
    {
      name:'wheelhardness',
      type: Number,
      label:'Wheel Hardness',
      required:true,
      element: 'slider',
      min:65,
      max:110,
      step:2,
      requiredMessage: 'specify wheel hardness.'
    },
    {
      name:'wheelsize',
      type: Number,
      label:'Wheel Size',
      required:true,
      element: 'slider',
      min:65,
      max:110,
      step:2,
      requiredMessage: 'specify wheel size.'
    },
    {
      name:'boardlength',
      type: Number,
      label:'Board Length',
      required:true,
      element: 'slider',
      min:65,
      max:110,
      step:2,
      requiredMessage: 'specify board length.'
    },
    {
      name:'bearings',
      type: String,
      label:'Bearing Type',
      required:true,
      element: 'select',
      options:[
        { value: 'ABEC3', label: 'ABEC 3' },
        { value: 'ABEC5', label: 'ABEC 5' },
        { value: 'ABEC7', label: 'ABEC 7' },
        { value: 'ABEC9', label: 'ABEC 9' }
      ],
      requiredMessage: 'specify bearing type.'
    }
  ]
}
export default PM.initCollections(PM.defaults(config));
