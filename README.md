# ghost-body

[p2.js](https://schteppe.github.io/p2.js/) add-on for bodies that detect collision but have no collision response.

## What this does

A ghost body will not collide with or bounce off of other bodies. You can still react to a ghost overlapping other bodies via World's [beginContact](http://schteppe.github.io/p2.js/docs/classes/World.html#event_beginContact) event.

## API

### .enable(World)

Hooks into a p2 World. Call this once per World.

### .disable(World)

Unhooks from a p2 World.

### .ghostify(Body)

Mark a p2 Body as a ghost. Call this once on every Body that needs ghost treatment.

### .unghostify(Body)

Remove ghost marking.

### .isGhost(Body)

See if Body has been marked as ghost.

## Install

    npm install ghost-body

## License

MIT
