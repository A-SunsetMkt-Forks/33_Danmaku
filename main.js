const url = "https://api.lwd-temp.top/api/33reply.php"; // API: https://api.lwd-temp.top/api/33reply.php?next=0
var damoo = new Damoo('dm-screen', 'dm-canvas', 25);
var rpool = new Map(); // 弹幕/回复池
var currReq = 0; // 是否正处理请求，避免网络延迟造成的不必要重复请求

function shoot(t) {
    damoo.play();
    damoo.emit({ text: t, color: "black" });
}

function gettxt(next) {
    if (currReq == 0) {
        currReq = 1; // 将正在处理请求标记为1
        axios({
            method: "GET",
            url: url + "?next=" + next,
            timeout: 10000 // 请求超时10s
        })
            .then(response => {
                rplys = response.data.data.replies;
                // next = response.data.data.cursor.next; // next是下一页的索引，添入API的next参数
                // Append each.rpid:each.content.message to rpool
                for (var i = 0; i < rplys.length; i++) {
                    id = rplys[i].rpid;
                    msg = rplys[i].content.message;
                    if (rpool.get(id) == undefined) {
                        // If the rply is not in rpool, shoot & save it
                        shoot(msg);
                        rpool.set(id, msg);
                        // console.log(msg);
                    }
                    // Delete older items in rpool if it's too big
                    if (rpool.size > 200) {
                        rpool.delete(rpool.keys().next().value);
                    }
                }
                currReq = 0; // 将正在处理请求标记为0
            })
            .catch(error => {
                console.log(error);
                currReq = 0; // 将正在处理请求标记为0
            });
    } else {
        //console.log("Request is in progress, pass.");
    }
}

function st() {
    window.setInterval("gettxt('0')", 1000);
}
