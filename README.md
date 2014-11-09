# ghost-body

p2.js add-on for bodies that detect collision but have no collision response.

## Usage

### Create World and Body

(nothing new here)

    var p2 = require('p2');
    var world = new p2.World();
    
    var body = new p2.Body({...});
    body.addShape(new p2.Circle());
    
    world.addBody(body);

### Hook ghost-body into world

    var ghostBody = require('ghost-body');
    
    ghostBody.enable(world);
    
### Mark body as ghost
    
    ghostBody.ghostify(body);
    
    
Now add more bodies to world and start calling world#step like usual. Ghosted bodies will not collide with regular bodies but world still fires beginContact event for it.

## Install

    npm install ghost-body

## License

MIT
