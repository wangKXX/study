# node面试

## node的模块化

nodejs在12版本中开始支持ESM模块化，在nodejs中，模块分为CommonJS模块和ESM模块，CommonJS模块是nodejs默认的模块化方式，ESM模块是nodejs12版本开始支持的模块化方式。

## node的内存

内存限制：nodejs的内存限制主要是由于其所依赖的v8引擎的限制，v8引擎在64位系统中大概是1.4G的堆内存限制,在32位系统中大概是0.7G。不过这个参数可以通过在nodejs启动的时候添加参数--max-old-space-size来修改。当然我们也可以使用buffer来解决一些超出内存限制的问题，比如我现在在内存中有个超出设置内存的数据，可以通过使用buffer来解决。因为buffer的内存管理是C++处理的而不是靠v8做垃圾回收。

## node的进程管理

node是一个单线程非阻塞式I/O的异步编程语言，通过事件驱动和异步操作来实现它的非阻塞式。
## cluster模块

 由有nodejs是单进程模型，所以它没法充分利用多核cpu的计算能力。cluster模块可以创建出多个子进程，每个
 子进程都是独立的node实例，共享同一个端口，主进程负责管理子进程。可以使用cluster.fork()方法创建子进程。
 与child_process模块不同的是，cluster模块多用于提高服务的稳定性，在cluster模式下有master和worker的概念，master用来监听端口和分配给子进程处理之间通过IPC通信管道进行通信。我们知道net模块按理说同一个端口只能被一个服务监听，那为啥子进程和主进程能共享端口呢，这主要是因为net模块子内部做了特殊处理，如果当当前是主进程，则直接监听端口，如果是子进程则创建serve实例，然后通过消息让master也创建serve实例，当请求进来的时候，master将请求转发给子进程。大名鼎鼎的pm2就基于cluster模块实现。

## child_process模块
child_process模块可以启动一个进程，child_process模块提供了exec、execFile、spawn、fork等方法，分别用于执行外部程序，执行外部程序脚本，启动子进程，启动子进程。与spawn不同的是exec，execFile有专门的回调可以监测进程的状态，通常在前端工程化工具中被广泛使用，如使用spawn或者exec去执行一些命令。比如文件压缩或者执行一些shell脚本，与其余三个API不同的是，fork会在子进程和主进程之间开辟一个IPC通信通道，可以通过send和message来进行通信。

## pm2 进程管理器
pm2是一个node的进程管理器，提供了自动重启，日志，内存监控，负载均衡等能力。方便开发者便捷的管理node应用程序
## worker_threads模块

 在node10.5版本引入了worker_threads模块。允许在一个进程中创建多个线程，用来出来计算密集的操作，而不影响主线程的操作，与主线程之间通过postMessage进行通信。可以通过该模块提供的isMainThread方法判断当前是否为主线程。通过提供的worker来通过new Worker()创建一个子线程

 ## nodejs中的事件循环
基于libuv实现的
 与浏览器不同的是，nodejs中的事件循环流程是先去执行同步代码，遇到异步代码会将其放在事件循环队列中人物对垒中的任务也是有优先级的其中主要关注的优先级有三个，第一个是timers(其中主要是setTimeout和setInterval)
第二个是poll(其中主要是I/O操作的回调)， 第三个是check(其中主要是setImmediate)，
 每一轮循环按照timers->poll->check的顺序执行，在进入每一个阶段之前都先去清空微任务队列（第一次也是），先去执行timers中的定时器操作执行执行完成之后再去执行poll中的IO操作的回调，需要注意的是这里是一个轮训队列，比如当执行到poll的时候虽然当时队列为空但是会在这里等待一段时间，如果这段时间内有回调被加入进来则执行，如果没有等待超过阈值之后就会进入下一个阶段也就是check阶段去执行setImmediate的回调。
 在nodejs的事件循环中的微任务队列永远是有最高执行权其中Process.nextTick()是微任务执行权最高的，之后是promise，通常在Timers里面的setTimeout0和check阶段的任务很多时候是无法确定其执行顺序的，因为setImmediate会直接被加入到check队列中，而timer中的回调加入的事件不止取决于设置的回调事件，还要取决于事件循环执行的耗时。

 ## nodejs中的buffer和stream

 buffer和stream都是处理数据的重要模块
 buffer通常用于处理字符串和二进制数据，而stream则用于处理流数据，比如文件流，网络流等。
 buffer 的堆内存占用是在v8的堆内存之外的由C++进行管理和维护
 buffer的创建通常可以使用buffer.alloc(length),或者buffer.from(string|array),buffer本身是一个类数组对象。
 stream对象是node事件驱动EventEmitter的子类，通常用于处理流数据，比如文件流，网络流等。
 分为四类可读性，可写，双工（可读可写）,转换（转换后输出， gzip）
 这四类都可以通过监听data,end,error,finish事件来对过程进行监听

 ## nodejs 如果是使用cluster模块创建的主从的集群模式如果主进程挂了怎么办

 1. 使用pm2 pm2 提供了自动重启能力可以使用pm2的配置文件来配置，在nodejs项目创建一个pm2的配置文件

 ```js
 // pm2.config.js
module.exports = {
  apps: [{
    name: 'appName',
    script: './app.js', // 项目入口
    instances: 'max', // 设置为max则使用cpu核数，也可以设置成具体的数字，如2，表示只启动2个进程
    exec_mode: 'cluster', // 设置为cluster模式，默认为fork模式
    autorestart: true, // 设置为true则自动重启，默认为true
    max_restarts: 10, // 设置重启次数，默认为15次，超过这个次数则不再重启
    restart_delay: 1000, // 设置重启延迟，默认为3000ms，即3s
  }]
}
 ```
 然后使用pm2 start pm2.config.js即可

 2. k8s

 不熟自己研究吧

 ## 如何理解nodejs的事件驱动？
在nodejs中提供了一个事件的基类EventEmiter，该类提供了on、once、emit等方法，通过on方法可以监听事件，通过once方法可以监听一次事件，通过emit方法可以触发事件。nodejs很多内置模块都继承了它（fs, http），这也就意味着可以异步的去监听事件，当事件触发时再执行其回调，从而达到非阻塞式的效果。

## koa的洋葱圈模型

koa洋葱圈模型主要是指koa中的中间件处理链，当前中间件通过调用next来继续下一个中间件，中间件支持generate函数和promise函数，内部实现机制也不一样对于普通函数的内部会使用compose函数使用promise.resolve来返回，对于generator函数内部会使用koa-convert来进行处理，这个模块内部使用的CO执行其来实现generator函数的自动执行。

执行顺序是外->内->外
