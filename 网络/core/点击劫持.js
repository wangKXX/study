/**
 * 利用iframe诱导点击
 * 如何防御
 * X-FRAME-OPTIONS 
 *  DENY，表示页面不允许通过 iframe 的方式展示
    SAMEORIGIN，表示页面可以在相同域名下通过 iframe 的方式展示
    ALLOW-FROM，表示页面可以在指定来源的 iframe 中展示
  JS防御
  通过判断slef == top来做出对应操作
 */