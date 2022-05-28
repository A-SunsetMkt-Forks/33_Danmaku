const proxyurl = "https://fierce-river-78204.herokuapp.com/";
const url = "main.json"
//const url = "https://api.bilibili.com/x/v2/reply/main?jsonp=jsonp&next=0&type=17&oid=662016827293958168&mode=2&plat=1&_=1653737939819";
var damoo = new Damoo('dm-screen', 'dm-canvas', 25);
var r="";
var last_d="",d="";
function test(){
  shoot("吼吼吼吼吼吼吼吼吼吼吼吼吼吼吼");
  shoot("gsfdasfsgdsdasfsgd");
  shoot("啊啊啊啊啊啊啊啊");
  shoot("哇哇哇哇哇哇哇哇哇哇");
  shoot("呱呱呱呱呱呱呱呱呱");
  shoot("强强强强强强强强强强");
}
function shoot(t){
  damoo.play();
  damoo.emit({ text: t, color: "black" });
}
function gettxt(){
  axios({
    method:"GET",
    url:url,
   }).then(response=>{
    d=response.data.data.replies[0].content.message;
    if(last_d!=d){
      shoot(d);
      console.log(d);
    };
    last_d=d;
   })
}
function st(){
  window.setInterval("gettxt()",200); 
}