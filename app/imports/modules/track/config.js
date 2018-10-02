import defaults from '../crud/defaults';

export default defaults({
  name: "track",
  schema:
  [
    {
      name:'startTime',
      type: String,
      label:'Start Time',
      default:''
    },
    {
      name:'start',
      type: String,
      label:'Start Location',
      default:''
    },
    {
      name:'deck',
      type: Object,
      label:'Deck info',
      default:''
    },
    {
      name:'tracking',
      type: [Object],
      label:'Tracking info',
      default:''
    },
  ]
});
