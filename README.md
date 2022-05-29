# 33_Danmaku
 A danmaku-display tool for 33

## API源码
https://github.com/lwd-temp/site-api/blob/main/api/33reply.php

## TODO
* 根据`next`参数可控获取下一页内容
* 可以一直获取下去，但是问题是，获取几页？
* 思路：先初始化（获取`next=0`）一次池，再次请求，当一页评论（20个？）均不在池里，向下获取一页，限制最多嵌套次数。
* 前端包装
