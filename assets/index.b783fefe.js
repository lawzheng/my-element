import{d as c,r as a,c as m,a as l,w as u,b as o,o as b,e as s,g}from"./index.38b68325.js";const F=s(" open "),v=s(" Click to upload "),D=g("div",{class:"el-upload__tip"}," jpg/png files with a size less than 500KB. ",-1),y=c({__name:"index",setup(_){const e=a(!1),p=()=>{e.value=!e.value},i=a([{type:"input",value:"",label:"\u7528\u6237\u540D",prop:"userName",rules:[{required:!0,message:"\u7528\u6237\u540D\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"},{min:2,max:6,message:"\u7528\u6237\u540D\u57282~6\u4F4D\u4E4B\u95F4",trigger:"blur"}],attrs:{clearable:!0}},{type:"input",value:"",label:"\u5BC6\u7801",prop:"password",rules:[{required:!0,message:"\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"},{min:6,max:15,message:"\u5BC6\u7801\u57286~15\u4F4D\u4E4B\u95F4",trigger:"blur"}],attrs:{showPassword:!0,clearable:!0}},{type:"select",value:"",label:"\u804C\u4F4D",placeholder:"\u8BF7\u9009\u62E9\u804C\u4F4D",prop:"role",attrs:{style:{width:"100%"}},rules:[{required:!0,message:"\u804C\u4F4D\u4E0D\u80FD\u4E3A\u7A7A",trigger:"change"}],children:[{type:"option",label:"\u7ECF\u7406",value:"1"},{type:"option",label:"\u4E3B\u7BA1",value:"2"},{type:"option",label:"\u5458\u5DE5",value:"3"}]},{type:"checkbox-group",value:[],prop:"like",label:"\u7231\u597D",rules:[{required:!0,message:"\u7231\u597D\u4E0D\u80FD\u4E3A\u7A7A",trigger:"change"}],children:[{type:"checkbox",label:"\u8DB3\u7403",value:"1"},{type:"checkbox",label:"\u7BEE\u7403",value:"2"}]},{type:"radio-group",value:"",prop:"gender",label:"\u6027\u522B",rules:[{required:!0,message:"\u6027\u522B\u4E0D\u80FD\u4E3A\u7A7A",trigger:"change"}],children:[{type:"radio",label:"\u7537",value:"male"},{type:"radio",label:"\u5973",value:"female"},{type:"radio",label:"\u4FDD\u5BC6",value:"not"}]},{type:"upload",label:"\u4E0A\u4F20",prop:"pic",uploadAttrs:{action:"https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",multiple:!0,limit:3}},{type:"editor",value:"111",prop:"desc",label:"\u63CF\u8FF0",placeholder:"\u8BF7\u8F93\u5165\u63CF\u8FF0",rules:[{required:!0,message:"\u63CF\u8FF0\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}]}]);return(A,t)=>{const r=o("el-button"),n=o("m-model-form");return b(),m("div",null,[l(r,{type:"primary",onClick:p},{default:u(()=>[F]),_:1}),l(n,{visible:e.value,"onUpdate:visible":t[0]||(t[0]=d=>e.value=d),title:"\u7F16\u8F91\u7528\u6237",options:i.value,"is-scroll":!0},{uploadArea:u(()=>[l(r,{type:"primary"},{default:u(()=>[v]),_:1})]),uploadTip:u(()=>[D]),_:1},8,["visible","options"])])}}});export{y as default};
