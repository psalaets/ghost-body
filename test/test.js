var assert = require('assert');
var p2 = require('p2');
var ghostBodyModule = require('..');

describe('.ghostify(Body)', function () {
  var body;

  beforeEach(function() {
    body = new p2.Body();
  });

  it('marks Body as ghost', function() {
    ghostBodyModule.ghostify(body);

    assert(ghostBodyModule.isGhost(body));
  });

  it('returns the Body', function() {
    var ghost = ghostBodyModule.ghostify(body);

    assert.strictEqual(ghost, body);
  });
});

describe('.unghostify(Body)', function () {
  var body;

  beforeEach(function() {
    body = new p2.Body();
  });

  it('removes Body\'s ghost-ness', function() {
    ghostBodyModule.ghostify(body);

    ghostBodyModule.unghostify(body);

    assert(!ghostBodyModule.isGhost(body));
  });

  it('returns the Body', function() {
    ghostBodyModule.ghostify(body);

    var nonGhost = ghostBodyModule.unghostify(body);

    assert.strictEqual(nonGhost, body);
  });
});

describe('World collisions', function() {
  var world;
  var body1;
  var body2;

  beforeEach(function() {
    world = new p2.World({
      gravity: [0, 0]
    });

    body1 = circleBody(0, 0);
    world.addBody(body1);

    body2 = circleBody(25, 0);
    world.addBody(body2);
  });

  describe('enabled on a World', function() {
    beforeEach(function() {
      ghostBodyModule.enable(world);
    });

    it("ghost passes through non-ghost", function() {
      var ghost1 = ghostBodyModule.ghostify(body1);

      // send bodies towards eachother
      ghost1.velocity = [10, 0];
      body2.velocity = [-10, 0];

      // listen for contact event
      var beginContactFired = false;
      world.on('beginContact', function(event) {
        if (involves(event, ghost1) && involves(event, body2)) {
          beginContactFired = true;
        }
      });

      // run some physics
      tenSteps(world);


      // ghost1 is now on the right of body2
      assert(ghost1.position[0] > body2.position[0]);
      assert(beginContactFired, 'beginContact should have fired for the bodies');
    });

    it("ghost passes through ghost", function() {
      var ghost1 = ghostBodyModule.ghostify(body1);
      var ghost2 = ghostBodyModule.ghostify(body2);

      // send bodies towards eachother
      ghost1.velocity = [10, 0];
      ghost2.velocity = [-10, 0];

      // listen for contact event
      var beginContactFired = false;
      world.on('beginContact', function(event) {
        if (involves(event, ghost1) && involves(event, ghost2)) {
          beginContactFired = true;
        }
      });

      // run some physics
      tenSteps(world);

      // ghost 1 is now on right of ghost 2
      assert(ghost1.position[0] > ghost2.position[0]);
      assert(beginContactFired, 'beginContact should have fired for the bodies');
    });

    it("non-ghost runs into non-ghost", function() {
      // send bodies towards eachother
      body1.velocity = [10, 0];
      body2.velocity = [-10, 0];

      // listen for contact event
      var beginContactFired = false;
      world.on('beginContact', function(event) {
        if (involves(event, body1) && involves(event, body2)) {
          beginContactFired = true;
        }
      });

      // run some physics
      tenSteps(world);

      // body1 is still on left of body2
      assert(body1.position[0] < body2.position[0]);
      assert(beginContactFired, 'beginContact should have fired for the bodies');
    });

    it("ghost has no friction against non-ghost", function() {
      var ghost1 = ghostBodyModule.ghostify(body1);

      // move bodies a little further apart for this one
      body2.position = [40, 0];
      var oldBodyPosition = body2.position.slice();

      // send ghost1 towards body2 so it skims the edge of body2
      // which would move body2 a little bit if there was friction
      ghost1.velocity = [10, 5];

      // listen for contact event
      var beginContactFired = false;
      world.on('beginContact', function(event) {
        if (involves(event, ghost1) && involves(event, body2)) {
          beginContactFired = true;
        }
      });

      // run some physics
      tenSteps(world);

      // body2 should not have moved
      assert.equal(body2.position[0], oldBodyPosition[0]);
      assert.equal(body2.position[1], oldBodyPosition[1]);

      assert(beginContactFired, 'beginContact should have fired for the bodies');
    });
  });

  describe('disabled off a World', function() {
    beforeEach(function() {
      ghostBodyModule.enable(world);
      ghostBodyModule.disable(world);
    });

    it("ghost runs into non-ghost", function() {
      var ghost1 = ghostBodyModule.ghostify(body1);

      // send bodies towards eachother
      ghost1.velocity = [10, 0];
      body2.velocity = [-10, 0];

      // listen for contact event
      var beginContactFired = false;
      world.on('beginContact', function(event) {
        if (involves(event, ghost1) && involves(event, body2)) {
          beginContactFired = true;
        }
      });

      // run some physics
      tenSteps(world);

      // ghost1 is still on left of body2
      assert(ghost1.position[0] < body2.position[0]);
      assert(beginContactFired, 'beginContact should have fired for the bodies');
    });

    it("ghost runs into ghost", function() {
      var ghost1 = ghostBodyModule.ghostify(body1);
      var ghost2 = ghostBodyModule.ghostify(body2);

      // send bodies towards eachother
      ghost1.velocity = [10, 0];
      ghost2.velocity = [-10, 0];

      // listen for contact event
      var beginContactFired = false;
      world.on('beginContact', function(event) {
        if (involves(event, ghost1) && involves(event, ghost2)) {
          beginContactFired = true;
        }
      });

      // run some physics
      tenSteps(world);

      // ghost1 is still on left of body2
      assert(ghost1.position[0] < ghost2.position[0]);
      assert(beginContactFired, 'beginContact should have fired for the bodies');
    });

    it("non-ghost runs into non-ghost", function() {
      // send bodies towards eachother
      body1.velocity = [10, 0];
      body2.velocity = [-10, 0];

      // listen for contact event
      var beginContactFired = false;
      world.on('beginContact', function(event) {
        if (involves(event, body1) && involves(event, body2)) {
          beginContactFired = true;
        }
      });

      // run some physics
      tenSteps(world);

      // body1 is still on left of body2
      assert(body1.position[0] < body2.position[0]);
      assert(beginContactFired, 'beginContact should have fired for the bodies');
    });
  });
});

function circleBody(x, y) {
  var body = new p2.Body({
    mass: 1,
    position: [x, y]
  });
  body.addShape(new p2.Circle(10));
  return body;
}

function involves(beginContactEvent, body) {
  return beginContactEvent.bodyA.id === body.id ||
         beginContactEvent.bodyB.id === body.id;
}

function tenSteps(world) {
  var steps = 10;
  for (var i = 0; i < steps; i++) {
    world.step(1);
  }
}
