# ghost-body

[p2](https://schteppe.github.io/p2.js/) add-on for bodies that detect collision but have no collision response.

## What this does

A ghost body will not bounce off of or have friction with other bodies. You can still react to a ghost overlapping other bodies via World's [beginContact event](http://schteppe.github.io/p2.js/docs/classes/World.html#event_beginContact).

Ghost bodies fire [events](#events) when other bodies enter/exit them.

## API

### ghostBody.enable(World)

Enables a World to have ghost bodies. Call this once per World.

### ghostBody.disable(World)

Disables ghost bodies in a World.

### ghostBody.ghostify(Body)

Turn on ghost mode for a Body. Call this once on every Body that needs ghost treatment.

### ghostBody.unghostify(Body)

Turn off ghost mode for a Body.

### ghostBody.isGhost(Body)

See if Body is a ghost.

## Events

Events are fired by ghost bodies using [p2's built-in event system](http://schteppe.github.io/p2.js/docs/classes/EventEmitter.html).

### bodyEntered

Fired when a body enters a ghost body.

```js
ghost.on('bodyEntered', function(event) {
  // number of bodies currently overlapping ghost
  event.count
  // body that entered
  event.causedBy
});
```

### populated

Fired when a body enters a ghost body that was empty. Fired before coinciding bodyEntered event.

```js
ghost.on('populated', function(event) {
  // number of bodies currently overlapping ghost
  event.count
  // body that entered
  event.causedBy
});
```

### bodyExited

Fired when a body leaves a ghost body.

```js
ghost.on('bodyExited', function(event) {
  // number of bodies currently overlapping ghost
  event.count
  // body that exited
  event.causedBy
});
```

### emptied

Fired when the last body leaves a ghost body. Fired before coinciding bodyExited event.

```js
ghost.on('emptied', function(event) {
  // number of bodies currently overlapping ghost
  event.count
  // body that exited
  event.causedBy
});
```

## Install

    npm install ghost-body

## License

MIT
