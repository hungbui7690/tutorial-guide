#### Media queries
A media queries can be applied in `CSS` to enable different values to be given to properties of selectors based upon the width of the viewport.

```css
h1 {
  font-size: 26px;
}

@media only screen and (max-width: 900px) {
  h1 {
    font-size: 24px;
  }
}
```

#### Sass and media queries
With Sass, it is possible to `nest` a media query directly within the CSS rule:

```scss
h1 {
  font-size: 26px;

  @media (max-width: 900px) {
    font-size: 24px;
  }
}
```

#### An issue
Writing media queries in this way presents a new problem – instead of having a media query defined in one place, there might be as many smaller media queries as there are rules within the CSS document.

This would be a problem if in the future you needed to adjust the breakpoint value from, say, 900px to 950px. It would be necessary to scroll through the entire codebase, hunting down dozens of media queries.


#### Mixins to the rescue!
Luckily, `mixins` can solve this issue by allowing us to define the media query in one location and to then apply it around the codebase wherever it is needed.

```scss
@mixin respond-medium {
  @media (max-width: 900px) { @content }
}

...

h1 {
  font-size: 26px;

  @include respond-medium {
    font-size: 24px;
  }
}
```


#### Multiple media queries
We can go one step further to establish one mixin that handles `multiple media queries`, allowing us to set different breakpoints easily.

```scss
@mixin respond($breakpoint) {
  @if($breakpoint == medium)  {
    @media (max-width: 900px) { @content }
  }
  @if($breakpoint == small)  {
    @media (max-width: 600px) { @content }
  }
}
```

Here we have established a variable called $breakpoint. Depending upon what is passed in for this variable (medium or small), the correct media query is set.

With this done, we can easily apply multiple media queries:

```scss
h1 {
  font-size: 26px;
  @include respond(medium) {
     font-size: 24px;
   }
  @include respond(small) {
     font-size: 20px;
   }
}
```

This example would ensure that the h1 font-size, normally 26px, would be 24px in viewports less than 900px wide and 20px in viewports less than 600px wide.

[Example](https://codepen.io/duvallpj/pen/xoqLBr)