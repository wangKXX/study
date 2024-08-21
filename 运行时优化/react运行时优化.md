# react项目代码优化

## 使用memo包裹子组件使用useCallback缓存函数

```jsx

默认情况下当组件的状态发生变化时，组件会重新渲染并递归渲染其子组件，但是react中提供了一个memo方法，
将组件用memo包裹之后，如果组件的props没有发生变化，react将跳过该组件的渲染。如果组件的props中有函数的话，
通常在组件重新渲然的时候会生成新的函数定义，这就导致每次重新渲染props都被判定为是变更的，导致组件的重新渲染。
这个时候可以使用useCallback来优化。useCallback返回一个缓存的函数，当函数的依赖没有变更的时候再组件重新渲染的
时候不会重新定义。

import React, { memo, useCallback, useState } from 'react';

const Child = memo(({ onClick }) => {

return (
  <div onClick={onClick}>child</div>
)
})

const Parent = () => {
  const [id, setId] = useState(0)
  const onClick = useCallback(() => {
    console.log('click')
  }, [id])

  return (
    <div>
      <Child onClick={onClick} />
    </div>
  )
}
```

## 使用useMemo缓存计算结果

```jsx
useMemo函数类似于vue中的computed，将计算结果缓存起来，当依赖项发生变化时，重新计算。
import React, { useMemo, useState } from 'react';

const [id, setId] = useState(0)

const sum = useMemo(() => {
  return id + 1
}, [id])
```

## 使用lazy懒加载组件

```jsx
lazy 类似于vue中的defineAsyncComponent，将组件定义为一个promise，在需要渲染组件的时候异步加载组件。

import React, { lazy, Suspense } from 'react';

const Child = lazy(() => import('./Child'))

const Parent = () => {
  return (
    <Suspense fallback={<div>loading</div>}>
    <Child />
    </Suspense>
  )
}
```

## 在class组件中使用PureComponent

```jsx
PureComponent可以在组件的props和state保持一致是跳过渲染
import React, { PureComponent } from 'react';

class Child extends PureComponent {
  render() {}
}
```

## 在class组件中使用shouldComponentUpdate

```jsx
在class组价中可以使用shouldComponentUpdate来自定义是否需要重新渲染，该函数的参数是新的props，state和context，通过手动比较返回一个布尔值，如果返回true则重新渲染，如果返回false则不重新渲染。

class Rectangle extends Component {
  state = {
    isHovered: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.position.x === this.props.position.x &&
      nextProps.position.y === this.props.position.y &&
      nextProps.size.width === this.props.size.width &&
      nextProps.size.height === this.props.size.height &&
      nextState.isHovered === this.state.isHovered
    ) {
      // 没有任何改变，因此不需要重新渲染
      return false;
    }
    return true;
  }

  // ...
}
```

## 路由懒加载

```jsx
使用react的lazy
import React, { lazy, Suspense } from 'react';

const Child = lazy(() => import('./Child'))

使用react-router的lazy

react-router的配置中提供了lazy配置用于设置懒加载


```
