# ghost-body

[p2](https://schteppe.github.io/p2.js/) add-on for bodies that detect collision but have no collision response.

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

## Events fired by ghost bodies

### bodyEntered

Fired when a body enters a ghost body.

### populated

Fired when a body enters a ghost body that was empty.

### bodyExited

Fired when a body leaves a ghost body.

### emptied

Fired when the last body leaves a ghost body.

## Install

    npm install ghost-body

## License

MIT
