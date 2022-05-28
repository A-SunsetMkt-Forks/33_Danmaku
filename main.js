const url = "https://api.lwd-temp.top/api/33reply.php";
var damoo = new Damoo('dm-screen', 'dm-canvas', 25);
var r = "";
var last_d = "", d = "";
var rpool = new Map();

function shoot(t) {
  damoo.play();
  damoo.emit({ text: t, color: "black" });
}
function gettxt() {
  axios({
    method: "GET",
    url: url,
  }).then(response => {
    rplys = response.data.data.replies;
    // Append each.rpid:each.content.message to rpool
    for (var i = 0; i < rplys.length; i++) {
      id = rplys[i].rpid;
      msg = rplys[i].content.message;
      if (rpool.get(id) == undefined) {
        // If the rply is not in rpool, shoot it
        shoot(msg);
        console.log(msg);
      }
      rpool.set(id, msg);
    }
    // Delete older items in rpool if it's too big
    if (rpool.size > 30) {
      rpool.delete(rpool.keys().next().value);
    }
  })
}
function st() {
  window.setInterval("gettxt()", 1000);
}