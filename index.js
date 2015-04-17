module.exports = {
  ghostify: ghostify,
  unghostify: unghostify,
  isGhost: isGhost,
  enable: enable,
  disable: disable
};

function ghostify(body) {
  body.ghost = {
    overlappingBodyCount: 0
  };
  return body;
}

function unghostify(body) {
  delete body.ghost;
  return body;
}

function isGhost(body) {
  return !!body.ghost;
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
    bodyEntered(event.bodyA);
  }

  if (isGhost(event.bodyB)) {
    bodyEntered(event.bodyB);
  }
}

function bodyEntered(ghostBody) {
  ghostBody.ghost.overlappingBodyCount += 1;

  var wasEmpty = ghostBody.ghost.overlappingBodyCount == 1;
  if (wasEmpty) {
    ghostBody.emit({
      type: 'populated'
    });
  }

  ghostBody.emit({
    type: 'bodyEntered'
  });
}

function endContactListener(event) {
  if (isGhost(event.bodyA)) {
    bodyExited(event.bodyA);
  }

  if (isGhost(event.bodyB)) {
    bodyExited(event.bodyB);
  }
}

function bodyExited(ghostBody) {
  ghostBody.ghost.overlappingBodyCount -= 1;

  var isNowEmpty = ghostBody.ghost.overlappingBodyCount == 0;
  if (isNowEmpty) {
    ghostBody.emit({
      type: 'emptied'
    });
  }

  ghostBody.emit({
    type: 'bodyExited'
  });
}