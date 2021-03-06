module.exports = {
  ghostify: ghostify,
  unghostify: unghostify,
  isGhost: isGhost,
  enable: enable,
  disable: disable
};

function ghostify(body) {
  body._ghost = {
    overlappingBodyCount: 0
  };
  return body;
}

function unghostify(body) {
  delete body._ghost;
  return body;
}

function isGhost(body) {
  return !!body._ghost;
}

function enable(world) {
  world.on('preSolve', preSolveListener);
  world.on('beginContact', beginContactListener);
  world.on('endContact', endContactListener);
}

function disable(world) {
  world.off('preSolve', preSolveListener);
  world.off('beginContact', beginContactListener);
  world.off('endContact', endContactListener);
}

function preSolveListener(event) {
  disableEquationsInvolvingGhosts(event.contactEquations);
  disableEquationsInvolvingGhosts(event.frictionEquations);
}

function disableEquationsInvolvingGhosts(equations) {
  equations.forEach(function(equation) {
    if (isGhost(equation.bodyA) || isGhost(equation.bodyB)) {
      equation.enabled = false;
    }
  });
}

function beginContactListener(event) {
  if (isGhost(event.bodyA)) {
    bodyEntered(event.bodyA, event.bodyB);
  }

  if (isGhost(event.bodyB)) {
    bodyEntered(event.bodyB, event.bodyA);
  }
}

function bodyEntered(ghostBody, enterer) {
  ghostBody._ghost.overlappingBodyCount += 1;

  var wasEmpty = ghostBody._ghost.overlappingBodyCount == 1;
  if (wasEmpty) {
    ghostBody.emit({
      type: 'populated',
      count: ghostBody._ghost.overlappingBodyCount,
      causedBy: enterer
    });
  }

  ghostBody.emit({
    type: 'bodyEntered',
    count: ghostBody._ghost.overlappingBodyCount,
    causedBy: enterer
  });
}

function endContactListener(event) {
  if (isGhost(event.bodyA)) {
    bodyExited(event.bodyA, event.bodyB);
  }

  if (isGhost(event.bodyB)) {
    bodyExited(event.bodyB, event.bodyA);
  }
}

function bodyExited(ghostBody, exiter) {
  ghostBody._ghost.overlappingBodyCount -= 1;

  var isNowEmpty = ghostBody._ghost.overlappingBodyCount == 0;
  if (isNowEmpty) {
    ghostBody.emit({
      type: 'emptied',
      count: ghostBody._ghost.overlappingBodyCount,
      causedBy: exiter
    });
  }

  ghostBody.emit({
    type: 'bodyExited',
    count: ghostBody._ghost.overlappingBodyCount,
    causedBy: exiter
  });
}