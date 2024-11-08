## How to type React props
Since React props are used to send transmit data between one React component to another, there are many types that you can use to type React props.

To write the types of your props, you need to add a colon and the object literal notation `(: {})` next to the destructuring assignment of the children prop at the component declaration

Here’s an example of typing a string and a number props:


```js
const App = ({ title, score }: { title: string, score: number }) => (
  <h1>{title} = {score}</h1>
)
```

### Creating a type alias for the props
Since the convention in React is to write one component in one .js or .jsx file, you can declare a type alias for the component props to make the code easier to read.

Here’s an example of creating a type alias for the App component props:

```js
type Props = {
  title: string,
  score: number
}
const App = ({ title, score }: Props) => (
  <h1>{title} = {score}</h1>
)
```

As you can see, the type object for component props will save you from having to include the prop types inline.

### Typing optional props
You can make a prop optional by adding the question mark `?` symbol after the prop name.

The following example makes the title prop optional:

```js
type Props = {
  title?: string,
  score: number
}
```

The optional prop means that you can render the component without passing the prop, but when you do pass the prop, it must be of the declared type.

### List of types for React component props

Now that you know how to check the props type, here’s a list of common types that you may want to use in your React application.

First, you have primitive types like string , number , and boolean as shown below:

```js
type Props = {
  // primitive types
  title: string,
  score: number,
  isWinning: boolean
}
```

You can also create an array of one type by adding the array literal notation `([])` after the type as follows:

```js
type Props = {
  title: string[], // an array of string
  score: number,
  isWinning: boolean
}
```

You can also write literal values to specify the exact values that can be accepted by the prop.

You need to separate the literals using a single pipe operator `|` as shown below:

```js
type Props = {
  priority: "high" | "normal" | "low",
  score: 5 | 9 | 10
}
```

TypeScript will throw a static error when the value of priority or score prop above doesn’t match any of the literal values.

Next, you can type an object prop as follows:


```js
type Props = {
  user: {
    username: string,
    age: number,
    isMember: boolean
  }
}
```

When you have an array of objects prop, just add the array literal notation at the end of the object declaration as follows:

```js
type Props = {
  user: {
    username: string,
    age: number,
    isMember: boolean
  }[] // right here
}
```

React props can also receive functions such as `onClick` and `onChange` , so you may need to type function props.

You can type the parameters accepted by the function or take an event object from the HTML as shown below:

```js
type Props = {
  // function that returns nothing
  onClick: () => void,
  // function accepts a parameter and has return type
  onChange: (target: string) => boolean,
  // function that takes an event
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}
```

If you’re declaring an onChange function in the component’s body, then you can immediately check the parameter and the return types of the function as shown below:

```js
const App = () => {
  const [message, setMessage] = useState("")
  
  const onChange = (e: React.FormEvent<HTMLInputElement>): void => 
    {
      setMessage(e.currentTarget.value);
    }
  
  // code omitted for clarity..
}
```

Finally, React components can accept another component as the `children` prop, so you need to use ReactNode to type these children props:

```js
type Props = {
  children: React.ReactNode
}
const App = ({ children }: Props) => (
  <div>{children}</div>
)
```

And those are the most common types you may use for React props.

Let’s learn how to type React function components next!

### How to type React function components

TypeScript’s Definitely Typed library include the `React.FunctionComponent` (or `React.FC` for short) that you can use to type React function components.

You can combine the `type Props` and the `React.FC` type to create a type-safe function component with props as follows:

```js
type Props = {
  title: string
}
const App: React.FC<Props> = ({title}) => {
  return (
      <h1>{title}</h1>
  )
}
```

When you call on the `App` component above, you will be required to specify the `message` prop with `string` type.

But since TypeScript is able to infer the type of your variable, you can remove typing the component with React.FC like this:

```js
type Props = {
  title: string
}
const App = ({ title }: Props) => <div>{title}</div>
// App type will be inferred
```

If you have only a few props for the component, you can even type the props inline, removing the need to create the `type Props` as shown below:

```js
const App = ({ title }: { title: string }) => <div>{title}</div>
```

Because of TypeScript’s inferred type feature, there’s no need for you to type React function components at all.


### How to type React hooks

React hooks are supported by `@types/react` library from version 16.8.

Generally, Typescript should be able to infer the type for your hooks unless you have specific cases where the type must be declared explicitly.

Let’s take a look at how to type React hooks one by one, starting from the `useState` hook


#### Typing `useState` hook

The `useState` value can be inferred from the initial value you set when you call the function.

For example, the following `useState()` call initialize the state with an empty string. When you call the setState function, you need to put a string or there will be an error:

```js
const App = () => {
  const [title, setTitle] = useState("") // type is string
  const changeTitle = () => {
    setTitle(9) // error: number not assignable to string!
  }
}
```

But when you need to initialize your state with values like `null` or `undefined` , then you need to add a generic when you initialize the state.

A generic allows you to use several types for the `useState` hook as shown below:

```js
// title is string or null
const [title, setTitle] = useState<string | null>(null)
// score is number or undefined
const [score, setScore] = useState<number | undefined>(undefined)
```

When you have a complex object as the state value, you can create an `interface` or a `type` for that object as follows:

```js
interface Member {
  username: string,
  age?: number
}
const [member, setMember] = useState<Member | null>(null)
```

And that’s how you can type `useState` hooks in your application.

#### Typing `useEffect` and `useLayoutEffect` hooks

You don’t need to type the `useEffect` and `useLayoutEffect` hooks because they don’t deal with returning values. The cleanup function for the `useEffect` hook is not considered a value that can be changed either.

You can write these hooks as normal.

#### Typing `useContext` hook

The `useContext` hook type is usually inferred from the initial value you passed into the `createContext()` function as follows:

```js
const AppContext = createContext({ 
  authenticated: true,
  lang: 'en',
  theme: 'dark'
})
const MyComponent = () => {
  const appContext = useContext(AppContext) //inferred as an object
  return <h1>The current app language is {appContext.lang}</h1>
}
```

The context value above will be inferred as the following object:

```js
{
  authenticated: boolean,
  lang: string,
  theme: string
}
```

Alternatively, you can also create a type that will serve as the generic for the `CreateContext` return value.

For example, suppose you have a `ThemeContext` that only has two values: `light` and `dark`.

Here’s how you type the context:

```js
type Theme = 'light' | 'dark'
const ThemeContext = createContext<Theme>('dark')
```

The type will be used when you set the value of the context using `ThemeContext.Provider` later in your code.

Then, the `useContext` hook will infer the type from the context object `ThemeContext` that you passed as its argument:


```js
const App = () => {
  const theme = useContext(ThemeContext)
  return <div>The theme is {theme}</div>
}
```


#### Typing `useRef` hook

Based on React documentation, the `useRef` hook is commonly used to reference an HTML input element as follows:

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

Following this use case, you can write a generic that accepts `HTMLInputElement` as shown below:

```js
const inputRef = useRef<HTMLInputElement>(null)
```

You don’t need to add `null` to the generic type because the `HTMLInputElement` accepts either an `HTMLInputElement | null` already.


#### Typing `useMemo` hook

The `useMemo` hook returns a memoized value, so the type will be inferred from the returned value:

```js
const num = 24
// inferred as a number from the returned value below
const result = useMemo(() => Math.pow(10, num), [num])
```


#### Typing `useCallback` hook

The `useCallback` hook returns a memoized callback function, so the type will be inferred from the value returned by the callback function:

```js
const num = 9
const callbackFn = useCallback(
  (num: number) => {
    return num * 2 // type inferred as a number
  }, 
[num])
```


#### Typing custom hooks
Since custom hooks are functions, you can add explicit types for its parameters while inferring its type from the returned value

```js
function useFriendStatus(friendID: number) {
  const [isOnline, setIsOnline] = useState(false);
  // code for changing the isOnline state omitted..
  return isOnline;
}
const status = useFriendStatus(9) // inferred type boolean
```

When you return an array similar to the `useState` hook, then you need to assert the returned value `as const` so that TypeScript doesn’t infer your type as a union:

```js
function useCustomHook() {
  return ["Hello", false] as const 
}
```

Without the `as const` assertion, TypeScript will infer the returned values `as (string | boolean)[]` instead of `[string, boolean]`

And that’s how you can type React hooks. Let’s learn how to type HTML events and forms next.


#### How to type HTML events and forms

Most HTML events types can be inferred correctly by TypeScript, so you don’t need to explicitly set the type.

For example, a `button` element `onClick` event will be inferred as `React.MouseEvent` by TypeScript:

```js
const App = () => (
  <button onClick={ (e) => console.log("Clicked")}>button</button>
  // ^^^ e inferred as React.MouseEvent<HTMLButtonElement, MouseEvent>
)
```

For HTML forms, you will need to type the `onSubmit` event as React.FormEvent because the default inference `any` will throw an error.

But the `onChange` events for your HTML inputs usually can be inferred from the event itself.

Here’s an example of a React form in TypeScript:

```js
const App = () => {
  const [email, setEmail] = useState("")
const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // handle submission here...
    alert(`email value: ${email}`)
  }
return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.currentTarget.value)}
            // ^^^ onChange inferred as React.ChangeEvent
          />
        </label>
      </div>
      <div>
        <input type="Submit" value="Submit" />
      </div>
    </form>
  )
}
```

#### Understanding different typings for React components

Although TypeScript could infer the return type of React function components as you code the components, you may have a project with a linting rule that requires the return type to be explicitly defined.

The `@types/react` library has several types that you can use to define the return type of React function components. They are:

- `ReactElement`

This section is dedicated to helping you understand these types and when to use them.

A `ReactElement` is an `interface` for an object with type, props, and key properties as shown below:

```js
type Key = string | number
interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
}
```

A `JSX.Element` is an extension of `ReactElement` that has the `type<T>` and `props<P>` implemented as `any` as you can see in the repository:

```js
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> { }
  }
}
```

The `type` for `ReactElement` is more strict than in `JSX.Element` , but they are essentially the same

Finally, `ReactNode` is a `type` that’s very loose as it includes anything that can be returned by the `render()` method of React class components.

In the repository, `ReactNode` is defined like this:


```js
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
```

This is why when your component has a `children` prop that can receive another component, it’s recommended to use `ReactNode` as its type because it can receive anything that can be rendered by React.

On the other hand, `ReactElement` and `JSX.Element` are more strict when compared with ReactNode as it doesn’t allow you to return values like `null`


#### When to use each type?

The `ReactNode` type is best used for typing a `children` prop that can receive another React component or JSX elements like this:

```js
const App = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}
// At index.tsx
<App>
  <Header/>
  <h2>Another title</h2>
</App>
```


This is because both `ReactElement` and JSX.`Element` types are more strict on the return type (doesn’t allow `null`) and they expect you to return a single element.

To accept both single and multiple children for these two types, you need to use `ReactElement | ReactElement[] or JSX.Element | JSX.Element[]` as the `children` type

The `ReactElement` and `JSX.Element` types are more suited for explicitly defining the return type of a React component like this:

```js
const App = () : React.ReactElement | JSX.Element => {
  return <div>hello</div>
}
```

But since we’re talking about best practices here, then I recommend you follow the definition of `FunctionComponent` interface in the types library, which uses `ReactElement<any, any> | null` :


```js
interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  propTypes?: WeakValidationMap<P> | undefined;
  contextTypes?: ValidationMap<any> | undefined;
  defaultProps?: Partial<P> | undefined;
  displayName?: string | undefined;
}
```

And because `JSX.Element` is exactly extending `ReactElement<any, any>` , you can define a React function component return type as follows:

```js
const App = () : JSX.Element | null => {
  return <div>hello</div>
}
```

This way, your component can still render nothing by returning `null` .

I hope this section has helped you to understand the different types that can be used for typing React components.


#### How to type (extend) HTML elements

Sometimes, you want to create a small, modular component that takes the attributes of a native HTML element as its props.

Some useful components that you may create for your application are `button` , `img` , or `input` elements.

The `@types/react` library ships with `ComponentPropsWithoutRef` type that you can use to grab all the native attributes of an HTML element as the props type of your component.

For example, the native `button` element knows about the `onClick` attribute already, but when you create a React `<Button>` component, you usually need to define the prop using an `interface` or a `type` like this:

```js
type ButtonProps = {
  children: React.ReactNode
  onClick: () => void
}
const Button = ({ children, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{children}</button>
}
```

With the above example, you need to keep adding another prop to the `ButtonProps` as you need them as follows:

```js
type ButtonProps = {
  children: React.ReactNode
  onClick: () => void
  disabled: boolean
  type: 'button' | 'submit' | 'reset' | undefined 
}
```

The `ComponentPropsWithoutRef` type can be used so that you don’t need to add these native HTML attributes to the `type` as you grow your application.

You can simply create a `type` that has all the native `button` attributes as props like this:

```js
type ButtonProps = React.ComponentPropsWithoutRef<"button">
const Button = ({ children, onClick, type }: ButtonProps) => {
  return (
    <button onClick={onClick} type={type}>
      {children}
    </button>
  )
}
```

The `ComponentPropsWithoutRef<"button">` type has all the props of a native HTML `button` element.

If you want to create an `<Img>` component, then you can use the `ComponentPropsWithoutRef<"img">` type:

```js
type ImgProps = React.ComponentPropsWithoutRef<"img">
const Img = ({ src, loading }: ImgProps) => {
  return <img src={src} loading={loading} />
}
```

You only need to change the generic type of `ComponentPropsWithoutRef<T>` to extend different HTML elements. For example:

- `ComponentPropsWithoutRef<'img'>` to extend `<img>` element
And so on.

When you need to add a custom prop that doesn’t exist in the native HTML element, you can create an `interface` that extends the native attributes as follows:

```js
interface ImgProps extends React.ComponentPropsWithoutRef<"img"> {
  customProp: string;
}
const Img = ({ src, loading, customProp }: ImgProps) => {
  // use the customProp here..
  return <img src={src} loading={loading} />;
}
```

This is particularly useful if you need a custom prop to determine the look of your component.

In the following example, the custom prop color is used to determine the `style: color` CSS attribute of the `<h1>` element:

```js
interface headerProps extends React.ComponentPropsWithoutRef<"h1"> {
  variant: "primary" | "secondary";
}
const Header = ({ children, variant }: headerProps) => {
  return (
    <h1 style={{color: variant === "primary" ? "black" : "red" }}>
      {children}
    </h1>
  );
};
```

The `ComponentPropsWithoutRef` type makes it easy to create a component that’s an extension of native HTML elements without having to type all possible prop parameters yourself.

You can even add additional props by extending the interface.

The `ComponentPropsWithoutRef` interface also has a twin called `ComponentPropsWithRef` that you can use when you need to forward a reference to the component’s children.

Learn more about ref forwarding here: https://reactjs.org/docs/forwarding-refs.html

#### `ComponentPropsWithoutRef` vs `[Element]HTMLAttributes`

If you have used TypeScript with React before, you may be familiar with the `[Element]HTMLAttributes` interface from `@types/react` library that you can use to extend HTML elements as follows:

```js
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>
```

These `[Element]HTMLAttributes` interfaces produce the same type as `ComponentPropsWithoutRef` interface, but they are more verbose since you need to use a different interface and generic for each HTML element.

On the other hand, `ComponentPropsWithoutRef` only requires you to change the generic type `<T>`. Both are fine for extending HTML elements in React components.

You can see an explanation from the library author here: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36505


#### When to use `type` vs `interface`?
Both `type` and `interface` from TypeScript can be used to define React props, components, and hooks.

From the TypeScript Handbook:

- `Type aliases` and interfaces are very similar, and in many cases you can choose between them freely. Almost all features of an interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.

When using interfaces, you can freely `extends` an interface as follows:

```js
interface HtmlAttributes {
  disabled: boolean
}
interface ButtonHtmlAttributes extends HtmlAttributes {
  type: 'Submit' | 'Button' | null
}
```

But types can’t be extended like interfaces. You need to use the intersection symbol (&) as follows:

```js
type HtmlAttributes = {
  disabled: boolean
}
type ButtonHtmlAttributes = HtmlAttributes & {
  type: 'Submit' | 'Button' | null
}
```

Next, an `interface` declaration is always an object, while a `type` declaration can be of primitive values as shown below:

```js
type isLoading = boolean
type Theme = "dark" | "light"
type Lang = "en" | "fr"
```

None of the above examples are possible with an `interface` , so a `type` might be preferred for simple Context object values.

The question is when to use one over the other? From the TypeScript Handbook again:

- If you would like a heuristic, use interface until you need to use features from type. 

The TypeScript code analyzer will tell you when you strictly need to use either an `interface` or a `type`.

When you’re not sure which one to use, always go with `interface` until you see a reason to use type .

If you need more details, here’s a StackOverflow answer comparing interfaces and types. https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript/65948871#65948871

#### Conclusion
Through this tutorial, you’ve learned the most common typings you may need when developing a React-TypeScript application.

I hope this cheat sheet will be useful for your next project 🙏