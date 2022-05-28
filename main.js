const url = "https://api.lwd-temp.top/api/33reply.php";
var damoo = new Damoo('dm-screen', 'dm-canvas', 25);
var r = "";
var last_d = "", d = "";

function shoot(t) {
  damoo.play();
  damoo.emit({ text: t, color: "black" });
}
function gettxt() {
  axios({
    method: "GET",
    url: url,
  }).then(response => {
    d = response.data.data.replies[0].content.message;
    if (last_d != d) {
      shoot(d);
      console.log(d);
    };
    last_d = d;
  })
}
function st() {
  window.setInterval("gettxt()", 1000);
}