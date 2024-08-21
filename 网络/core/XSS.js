/**
 * 跨站点脚本攻击
 * 1.非持久性XSS 诱导点击， 不过数据库
 * 2.持久性XSS 可输入控件提交，过数据库
 * 如何防范
 * 1.转义
 * 2.设置 HTTP Header 中的 Content-Security-Policy
 *  只允许加载本站资源
    Content-Security-Policy: default-src 'self'
    只允许加载 HTTPS 协议图片
    Content-Security-Policy: img-src https://*
    允许加载任何来源框架
    Content-Security-Policy: child-src 'none'
   3.HttpOnly cookie
 **/ 