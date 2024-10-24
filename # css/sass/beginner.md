### Why should you use Sass?
- `Easy to learn`: If you are familiar with CSS already, then you'll be glad to know that Sass actually has a similar syntax, and so you can start using it, even after this tutorial ;)

- `Compatibility`: It is compatible with all versions of CSS. So, you can use any available CSS libraries.

- `Saves time`: It helps reduce the repetition of CSS, because of its powerful features.

- `Reusable code`: Sass allows for variables and chunks of code (mixins) that can be reused over and over again. This helps you save time and makes you able to code faster.

- `Organized Code`: Sass helps keep your code organized by using partials.

- `Cross Browser Compatibility`: Sass gets compiled into CSS and adds all the necessary vendor prefixes so you don't have to worry about manually writing them out.


### Features

#### Variables

```css
$primary-color: #24a0ed;

.text {
  color: $primary-color;
}
button {
  color: $primary-color;
  border: 2px solid $primary-color;
}
```

#### Nesting

Css
```css
nav {
  height: 10vh;
  width: 100%;
  display: flex;
}

nav ul {
  list-style: none;
  display: flex;
}

nav li {
  margin-right: 2.5rem;
}

nav li a {
  text-decoration: none;
  color: #707070;
}

nav li a:hover {
  color: #069c54;
}
```

Sass
```css
nav {
  height: 10vh;
  width: 100%;
  display: flex;

  ul {
    list-style: none;
    display: flex;
  }

  li {
    margin-right: 2.5rem;

    a {
      text-decoration: none;
      color: #707070;

      &:hover {
        color: #069c54;
      }
    }
  }
}
```


#### Parent Selector

`&`: In the Sass code above, you might notice the ampersand symbol `&` used with the hover pseudo-class. This is called a `Parent Selector`.

So, in the case of the code above, `&` will refer to the parent which is the anchor tag `a`.


#### Partials in Sass
This is one of the many awesome features of Sass that gives you an advantage.

As stylesheets grow large over time, it gets difficult to maintain them. Because of this, it just makes sense to break your stylesheets into smaller chunks. In other words, `Partials` help you organize and structure your code.

To `declare a partial`, we will start the file name with an `underscore _`, and add it in another Sass file using the `@import` directive.

For example, if we have a `_globals.scss`, `_variables.scss`, and `_buttons.scss`, we could import them into the main SCSS file `main.scss`.

```scss
// main.scss
@import "globals";
@import "variables";
@import "buttons";

```


#### Mixins in Sass
Another major issue with CSS is that you'll often use a `similar group` of styles. `Mixins` allow you to `encapsulate` a group of styles, and `apply` those styles anywhere in your code using the `@include` keyword.

An example of when you'd use mixins is when using Flexbox.

```scss
@mixin flex-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  background: #ccc;
}

.card {
  @include flex-container;
}

.aside {
  @include flex-container;
}
```


#### Sass Functions and Operators
Sass provides a suite of tools to help write more programmatic code.

Sass offers built-in functions that enable us to do calculations and operations that return a specific value.

They range from color calculations to math operations like getting random numbers and calculation of sizes, and even conditionals.

It also provides support for mathematical operators like `+`, `-`, `\`, `*`, `/`, and `%`, which we can use with the `calc` function.

Here is an example using a pixel to rem conversion function:

Example 1
```scss
@use "sass:math";

@function pxToRem($pxValue) {
  @return math.div($pxValue, 16px) * 1rem;
}

div {
  width: pxToRem(480px); // gives 30rem
}
```

Example 2
```scss
@mixin body-theme($theme) {
  @if $theme == "light" {
    background-color: $light-bg;
  } @else {
    background-color: $dark-bg;
  }
}


...

$red: #ff0000;

a:visited {
  color: darken($red, 25%);
}
```