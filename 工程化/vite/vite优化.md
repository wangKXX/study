# vite优化

## 开发环境优化

vite基于esModle+ esBuild + 按需编译的模式使得冷启动和HMr的性能表现非常好基本无需优化，但对于项目中的一些通用文件如（common.css, help.js）这种不会经常变动的文件可以显式的使用optimizeDeps.include配置项来提前编译，这样可以进一步缩短编译时间。

## 生产环境优化

### 构建层面

1. 代码分包：通过rollup-plugin-visualizer插件分析构建产物大小情况，对于项目中使用的较大的依赖库可以使用CDN加载（使用vite-plugin-resolve-externals或者vite-plugin-cdn-import）插件将依赖库排除在bundle外，在页面采用CDN方式引入，使用ESM的动态导入import()基于路由文件进行代码分包，减少入口文件大小。当然分包也不是越多越好毕竟过多网络请求也会是性能瓶颈，一般建议通过路由文件来进行分包. 当然在vue3中也可以采用defineAsyncComponent来实现组件的懒加载，这同样会生成一个单独的chunk。
2. 代码压缩: 使用minify进行代码压缩配置，默认是使用esbuild的压缩，也可以使用terser的压缩。(前者比后者快)
3. 图片压缩：使用vite-plugin-imagemin插件对图片进行压缩，通过设置assetsInlineLimit（默认4kb）来对一些小图使用base64编码，减少http请求。
4. treeshaking: vite默认开启treeshaking，但注意要使用ESM对法，这样rollup才能在代码静态分析的时候识别出未使用的代码，从而进行代码摇树优化。避免使用import * 和export * 语法，这样会导致vite在做静态代码分析的时候无法分析出无用模块，尽量选择纯ESM语法的第三方库。
5. gzip：使用vite-plugin-compression插件对打包后的文件进行gzip压缩，可以打出对应的.gz文件，减小带宽。gzip压缩虽然是可以减小带宽但是对于一些较小的文件并不建议这么做，因为.gz文件还需要在客户端进行解压，也会消耗一些时间。
  

```yaml
  http {
      gzip on; # 开启gzip压缩
      gzip_min_length 1024; # 设置最小压缩的页面大小，页面字节大于此大小会被压缩
      gzip_types text/plain application/javascript application/x-javascript text/javascript text/xml text/css; # 对这些类型的响应进行压缩
      gzip_vary on; # 根据请求的user-agent来判断是否使用gzip
      gzip_proxied any; # 设置代理服务器的gzip压缩策略
      gzip_comp_level 6; # 压缩级别，默认1，最高9
      gzip_buffers 16 8k; # 压缩缓冲区大小
      gzip_http_version 1.1; # 设置压缩所支持的最低HTTP协议版本
  }
  ```

### 网络层面

1. 设置合适的缓存策略：通常我们会对html文件设置协商缓存，对其他的静态资源设置强缓存，这是因为对于spa来说html作为整个资源的请求入口，每次打包之后会生成新的内容hash，会更新html中静态资源的引入，由于使用的是协商缓存,当html文件更新时，浏览器会自动请求新的html文件，同时请求新的静态资源，从而实现更新。nginx的配置如下：

```yaml
location ~ .*\.(html)$ {    
  # 协商缓存
  add_header Cache-Control no-cache; # 应用于http1.1
  add_header Pragma no-cache; # 应用于http1.0和http1.1
}

location ~ .*\.(js|css)?$ {
  add_header Cache-Control max-age=604800;
}
```

当然我们也可以直接在html中设置缓存策略，但是这种方式只能在浏览器生效，如果是在节点服务器访问html文件时，就无效了，如：

```html
<meta http-equiv="Cache-Control" content="no-cache">
```

2. 使用CDN：一般常见的做法是将html文件放置在自己的服务器上，将静态资源放置在CDN上（这样做的目的是为了能对产品入口有更大控制权，比如缓存控制，访问控制，流量控制，动态内容控制等）。CDN服务能够快速响应请求的原理是：节点服务+缓存+智能路由+内容压缩+传输优化+缓存更新。

```
- 节点服务：CDN服务会在全球范围内部署大量的节点服务器，这些节点服务器会根据用户的请求地址，将请求路由到最近的节点服务器，从而实现快速响应请求。
- 缓存： 当用户请求到节点服务器上没有请求的资源时，会将该请求进行请求转发到源服务，之后会在节点服务器缓存该文件
- 智能路由：CDN服务会根据用户的请求地址，将请求路由到最近的节点服务器，从而实现快速响应请求。
- 内容压缩：CDN服务会对网站内容进行压缩和优化，包括图片压缩，gzip压缩等
- 传输优化：CDN服务器会采用Http2.0协议等技术来提升传输速度
- 缓存更新：CDN服务会根据源服务器的更新情况，自动更新节点服务器的资源。
  ```

 
3. 对于一些QPS较大的页面要考虑做负载均衡，比如一些秒杀页面，可以采用nginx的负载均衡模块来实现。
通过upstream模块来实现负载均衡，配置如下：
配置服务器组：

```yaml
upstream backend {
    server node1.example.com:8080;
    server node2.example.com:8080;
    # 可以添加更多的服务器
}
```

配置负载均衡策略：

```yaml 

# 轮询策略 默认策略

upstream backend {

    server node1.example.com:8080;
    server node2.example.com:8080;

}

# 权重策略 权重高的接受更多请求

upstream backend {

    server node1.example.com:8080 weight=2;
    server node2.example.com:8080 weight=1;

}

# IP哈希策略 确保同一个IP被分配到同一台机器 

upstream backend {

    ip_hash; 

    server node1.example.com:8080;
    server node2.example.com:8080;

}

# 最少连接策略 确保每个机器被访问到

upstream backend {

    least_conn; 

    server node1.example.com:8080;
    server node2.example.com:8080;

}

# 公平调度 这是一个第三方模块提供的策略，它根据后端服务器的响应时间来分配请求。 sudo apt-get install nginx-extras

upstream backend {

    fair; 

    server node1.example.com:8080;
    server node2.example.com:8080;

```

配置 SPA 的路由:

```yaml
erver {
    listen 80;
    server_name example.com;

    location / {
        try_files $uri $uri/ /index.html;  # 如果找不到文件，尝试返回 index.html
        proxy_pass http://backend; # 将请求转发到后端服务器组
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
    }
}
```
