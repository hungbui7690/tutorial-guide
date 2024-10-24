1. create useAuthStore.js

```js
import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  isLogin: false,
  setIsLogin: (loginState) => set({ isLogin: loginState }),
}))

```

2. access state
```js
  const isLogin = useAuthStore((state) => state.isLogin)
```

3. setter 
```js
const setIsLogin = useAuthStore((state) => state.setIsLogin)
...
setIsLogin(true)
setIsLogin(false)
```