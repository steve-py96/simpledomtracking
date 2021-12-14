![GitHub package.json version](https://img.shields.io/github/package-json/v/steve-py96/simpledomtracking?style=flat-square&color=000000)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/simpledomtracking?style=flat-square&color=000000)
![npms score](https://img.shields.io/npms-io/final-score/simpledomtracking)

# simpledomtracking

> tracking via DOM made simple (hopefully? 👀)

## quick examples

first generate a tracker:

```js
const simpleTracker = trackingFactory(
  {
    keyInCode: 'keyInDOM',
    otherKeyInCode: 'otherKeyInDOM',
  },
  keys => keys.keyInCode
)
```

then use it, examples of how to add tracking to your DOM:

```jsx
// JSX
const Component = () => (
  <div
    id="wow"
    class="noway"
    {...simpleTracker.create(keys => ({
      [keys.keyForTracking]: 'you clicked wow!!',
    }))}
  />
)
```

```js
// vanilla js (with custom setAttributes or simpledomtracking/setAttributes to "attach all attributes in one call")
const wow = document.querySelector('#wow')
setAttributes(
  wow,
  simpleTracker.create(keys => ({
    [keys.keyForTracking]: 'you clicked wow!!',
  }))
)
```

finally start tracking!:

```js
// yourTracking might be google analytics f.e. (const yourTracking = data => window.dataLayer.push(data))
document.addEventListener('click', ({ target }) => {
  if (simpleTracker.isTracking(target)) yourTracking(simpleTracker.getTrackingData(target))
})
```

<br />

### just looking for some more code? check out...

- [the jsx example](./examples/jsx.html)
- [the vanilla example](./examples/vanilla.html)

---

<br />

## so, what does this tracking do?

1. it takes key-value entries bundled in an object from you
   - keys = tracking keys, those will be used later on when sending the data to any server
   - values = tracking keys which appear on the DOM-Element
2. it gives you some functions based on your previously defined tracking-configuration of 1.
3. you push those tracking keys on elements (which allows you to add dynamic keys etc)
4. the user clicks and you pull the data from the DOM-Elements into your request, done

The main purpose of this library is to add a quick and easy possiblity to spread tracking thru a whole project and leave you the possiblities of how to deal with the data itself (you can have tracking which relies on the DOM-keys, but also you might have your own tracking which relies on the keys inside the code ¯\\\_(ツ)\_\/¯).

<br />

## more documentation (linked from the `/docs` directory)

### functionality

- [trackingFactory](docs/trackingFactory.md)
- [mockElement](docs/mockElement.md)
- [setAttributes](docs/setAttributes.md)

### other

- [typescript](docs/typescript.md)

<br />

## ups and downs

this thing can be very useful if you're controlling the delegation well (in theory and practically), it's even pretty useful in projects with element-binded event handling (since tracking is much different compared to normal user interactivity it's also nice to keep it out of the casual logic imho), but as everything also this has its negative points: it can become pretty complex with all the bubbling and other existing listeners etc, therefore it's always a good idea to read around a bit, besides the [MDN-articles](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events) there's are plenty of blogs about this topic like this one from [jasonformat](https://jasonformat.com/event-delegation-vs-direct-binding/) for example, and also check if your project is qualified for delegating (many preventDefaults might kill this approach f.e.)

<br />

## hacky hacks

- it is possible to quickly reduce logic at spots by using the CSS-line `pointer-events: none` on specific children (not recommending, just mentioning! as alternative: use `Element.closest(..)`)
