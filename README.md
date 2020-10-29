# simpledomtracking

> tracking via DOM made simple (hopefully? 👀)

## examples

1. generate a tracker:

```js
const simpleTracker = trackingFactory(
  {
    keyForTracking: 'keyInDOM',
    otherKeyForTracking: 'otherKeyInDOM',
  },
  { detectionKey: 'keyForTracking' }
)
```

2. use it, examples of how to use:

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

3. start tracking!:

```js
// yourTracking might be google analytics f.e. (const yourTracking = data => window.dataLayer.push(data))
document.addEventListener('click', ({ target }) => {
  if (simpleTracker.isTracking(target)) {
    yourTracking(simpleTracker.getTrackingData(target))
  }
})
```

<br />

---

<br />

## how does this tracking think(/work)?

1. I need to bundle the keys
2. I need to use those keys on elements
3. I need to track those elements

pretty straight forward this is the thought behind the library, what it does is also pretty simple:

1. it takes key-value entries bundled in an object from you
   - keys = tracking keys, those will be used later on when sending the data to any server
   - values = tracking keys for the DOM, these can be important but in general you'll have a straight forward naming in mind and therefore this library doesn't wanna be in your way there
2. it gives you functions based on your previously defined object
3. you push those tracking keys on elements with values you define meanwhile to spread your tracking
4. the user clicks and you pull the data from the DOM into your request

<br />

## more documentation (linked from the `/docs` directory)

### functionality

- [trackingFactory](docs/trackingFactory.md)
- [mock](docs/mock.md)
- [setAttributes](docs/setAttributes.md)

### other

- [typescript](docs/typescript.md)

<br />

## ups and downs

this thing can be pretty useful if you're controlling the delegation well (in theory and practically), it's even pretty useful in projects with element-binded event handling (since tracking is much different compared to normal user interactivity it's also nice to keep it out of the casual logic tbh), but as everything also this has it's negative points: it can become pretty complex with all the bubbling and other existing listeners etc, therefore it's always a good idea to read around a bit, besides the [MDN-articles](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events) there's are plenty of blogs about this topic like this one from [jasonformat](https://jasonformat.com/event-delegation-vs-direct-binding/) for example

<br />

## hacky hacks

- it is possible to reduce logic at spots by using the CSS-line `pointer-events: none` on specific children, I'm not sure tbh if that "hint" should be given even tho but it's a possibility for quickfixes (and quickfixes can lead to quickbugs, so use with caution)
