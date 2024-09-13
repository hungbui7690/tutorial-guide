[URL](https://blog.appsignal.com/2024/04/03/how-to-implement-rate-limiting-in-express-for-nodejs.html)

	express-rate-limit: To block requests that exceed specified limits.

	express-slow-down: To slow down similar requests coming from the same actor.


### express-rate-limit

```js
const { rateLimit } = require("express-rate-limit");
```

```js
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 10, // each IP can make up to 10 requests per `windowsMs` (5 minutes)
  standardHeaders: true, // add the `RateLimit-*` headers to the response
  legacyHeaders: false, // remove the `X-RateLimit-*` headers from the response
});
```



Note that rateLimit accepts an options object and returns the rate limiting middleware. The options used in the example above are:

	windowMs: The time frame where requests are checked for rate limiting. The default value is 60000 (1 minute).
	limit: The maximum number of connections to allow during the windowMs time span. By default, it's 5.
	standardHeaders: To enable support for the RateLimit headers recommended by the IETF. The default value is false.
	legacyHeaders: To send the legacy rate limit X-RateLimit-* headers in the error responses. The value is true by default.
	Other useful parameters are:

	message: The response body to return when a request is rate limited. The default message is “Too many requests, please try again later.”
	statusCode: The HTTP status code to set in the rate limiting error responses. The default value is 429.
	skipFailedRequests: To avoid counting failed requests in limit. Set to false by default.
	skipSuccessfulRequests: To avoid counting successful requests in limit. The value is false by default.
	keyGenerator: The function that contains the logic used to uniquely identify users. By default, it checks the IP address of incoming requests.


```js
app.use(limiter);
```


If you instead want to rate limit APIs under a specific path, use the limiter middleware as below:
``` js
app.use("/public", limiter);
```

To protect only a certain endpoint, pass limiter as a parameter in the endpoint definition:
```js
app.get("/hello-world", limiter, (req, res) => {
	// ...
});
```


##### Inspect the response headers:
Note the RateLimit-* headers added to the responses by express-rate-limit. These are useful for the caller to understand how many more requests it can make before getting blocked.

On the eleventh API call within a 5-minute time frame, the request will fail, with the 429 HTTP error: “Too many requests, please try again later.”




### express-slow-down
Slows down the processing of incoming requests that exceed defined limits.

```js
const { rateLimit } = require("express-slow-down");
```

```js
const limiter = slowDown({
  windowMs: 15 * 60 * 1000, // 5 minutes
  delayAfter: 10, // allow 10 requests per `windowMs` (5 minutes) without slowing them down
  delayMs: (hits) => hits * 200, // add 200 ms of delay to every request after the 10th
  maxDelayMs: 5000, // max global delay of 5 seconds
});
```

The rateLimit function provided by express-slow-down works just like that of express-rate-limit. The main difference is that it supports the following additional options:

	delayAfter: The maximum number of incoming requests allowed during windowMs before the middleware starts delaying their processing. The default value is 1.
	delayMs: The requests-to-rate-limit delay. It can be the delay itself in milliseconds or a function that defines custom behavior. By default, it increases the delay by 1 second for every request over the limit.
	maxDelayMs: The absolute maximum value that delayMs can reach. It defaults to Infinity.

```js
app.use(limiter);
```


#### Test
For the first ten calls, the server will return the response “Hello, World!” immediately. Then, the responses will start to become slower and slower

Take a look at the response time. It went from 33ms to 2.23 seconds. This makes sense considering the slowing down logic
