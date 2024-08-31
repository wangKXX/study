class myKoa {
  context=null
  constructor() {
    this.middleware = []
  }
  use(fn) {
    this.middleware.push(fn)
  }

  dispatch(index){
    if (index === this.middleware.length) return Promise.resolve()
    const fn = this.middleware[index]
    if (!fn) return Promise.resolve()
    Promise.resolve(fn(this.context, () => this.dispatch(index + 1)))
  }

  listene() {
    this.dispatch(0)
  }
}

const app = new myKoa()

app.use(async (ctx, next) => {
  console.log(1)
  await next()
  console.log(2)
})

app.use(async (ctx, next) => {
  console.log(3)
  await next()
  console.log(4)
})

app.use(async (ctx, next) => {
  console.log(5)
  await next()
  console.log(6)
})

app.listene()