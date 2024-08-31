import { spawn, exec, execFile, fork } from 'child_process'

const ls = spawn('ls', ['-al'])

ls.stdout.on('data', function(data) {
  console.log('data: '+ data)
})

ls.stderr.on('error', function(error) {
  console.error(error)
})

ls.on('close', function(code) {
  console.log('close: ', code)
})

exec('node -v', { encoding: 'utf8'}, function(error, stdout,stderr) {
  if (error) return;
  console.log('exec data', stdout)
})

execFile('node -v', { encoding: 'utf8'}, function(error, stdout,stderr) {
  if (error) return;
  console.log('exec data', stdout)
})

const forked = fork('./forktest.js')

// 发送数据给子进程
forked.send({ hello: "world" });
// 监听子进程发送来的数据
forked.on("message", (msg) => {
  console.log("Message from child", msg);
});