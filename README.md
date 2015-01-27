# ghost-body

[p2.js](https://schteppe.github.io/p2.js/) add-on for bodies that detect collision but have no collision response.

## What this does

A ghost body will not bounce off of or have friction with other bodies. You can still react to a ghost overlapping other bodies via World's [beginContact](http://schteppe.github.io/p2.js/docs/classes/World.html#event_beginContact) event.

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

## Install

    npm install ghost-body

## License

MIT
