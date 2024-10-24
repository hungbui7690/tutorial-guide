```css
.shimmer {
  animation: shimmer 2s infinite linear;
  background: linear-gradient(to right, #2c2c2c 4%, #333 25%, #2c2c2c 36%);
  background-size: 1000px 100%;
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}
```


```html
<div className='animate-pulse'>
  <div className='bg-gray-700 mb-4 rounded-md w-40 h-6 shimmer'></div>
  <div className='bg-gray-700 mb-4 rounded-md w-full h-96 shimmer'></div>
  <div className='bg-gray-700 mb-2 rounded-md w-3/4 h-6 shimmer'></div>
  <div className='bg-gray-700 mb-4 rounded-md w-1/2 h-6 shimmer'></div>
  <div className='bg-gray-700 rounded-md w-full h-24 shimmer'></div>
</div>
```