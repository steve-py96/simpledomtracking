# mockElement

this thing called `mockElement` may sound like development only stuff but... no! :o <br />
mock in this case is an actual very minimalistic HTMLElement mock, it's an object to mirror only a partial of an htmlelement which the factory requires<br /><br />
"why not just use createElement?" - well I also played with that thought and I also tried some hacky shortcode stuff (such as this failure: `Object.assign(document.createElement('a'), data)`) but in the end I prefered this own solution since it provides all in a short and readable manner (better code is ofc always welcome if provided :p) <br /><br />
"why use this if you're on DOM elements anyway?" - sometimes you might not be able to work with pure DOM sadly, imagine sending data **AFTER** a **SUCCESSFUL** form submit, tracking by DOM would allow you to track the submit click but you have no control over the success/failure state of the submission, therefore it's sometimes useful to just lie to the whole system to keep things pretty unified everywhere, a usecase would be therefore:

```js
submit = () => {
  // your submit logic
  // ...
  // send your data to the server
  fetch(...).then(() => {
    // here we reached the point of a positive feedback aka tracking time
    yourTracking( // f.e. dataLayer.push(...)
      simpleTracker.getTrackingData(
        mockElement(
          simpleTracker.create(keys => ({
            [keys.category]: 'form submit',
            [keys.location]: window.location.pathname,
            ... // whatever your heart desires
          }))
        )
      )
    )
  })
}
```

if we'd add the data to the DOM directly again we'd track the click by delegation already (unless we start big filter lists to exclude specific elements, don't start this, it's a misery) so we keep it in the background only for this case <br />
also notable: no need to check if the mocked element is tracked since it exists specially for this case, it'll always be tracked \<3
