import{d,r as s,f as c,b as i,o as v}from"./index.6138b993.js";const _=d({__name:"index",setup(m){const a=s([{title:"\u8D2D\u7269",start:"2022-08-11 08:00",end:"2022-08-11 12:00",editable:!0},{title:"\u6572\u4EE3\u7801",start:"2022-08-11 14:00",end:"2022-08-11 16:00"}]),u=e=>{console.log(e),a.value.push({start:e.dateStr+" 12:00",end:e.dateStr+" 18:00",title:"1"})},r=e=>{const n=document.createElement("div");let t=e.timeText.split("-"),l=t[0].replace("\u4E0A\u5348",""),o=t[1].replace("\u4E0B\u5348","");return n.innerHTML=`
    <div>\u5F00\u59CB\uFF1A${l}</div>
    <div>\u7ED3\u675F\uFF1A${o}</div>
    <div>\u6807\u9898\uFF1A${e.event._def.title}</div>
  `,{domNodes:[n]}};return(e,n)=>{const t=i("m-calendar");return v(),c(t,{events:a.value,"display-event-end":!0,"event-content":r,onDataClick:u},null,8,["events"])}}});export{_ as default};
