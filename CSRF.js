/**
 * 跨站点请求伪造
 * 用户登录了A系统并且产生了cookie，没有登出的情况下访问了B，A系统没有做csrf防御
 * 如何防御
 * 1.get请求不做数据修改（SameSite）
 * 2.不让第三方网站访问cookie
 * 3.阻止第三方网站请求接口（Referer 判断来源https跳http不会携带Referer）
 * 4.请求附带验证信息，验证码，token等（token 服务端验证）
 **/ 