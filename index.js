module.exports = {
  ghostify: ghostify,
  unghostify: unghostify,
  isGhost: isGhost,
  enable: enable,
  disable: disable
};

function ghostify(body) {
  body.ghost = true;
  return body;
}

function unghostify(body) {
  delete body.ghost;
  return body;
}

function isGhost(body) {
  return body.ghost === true;
}

function enable(world) {
  world.on('preSolve', preSolveListener);
}

function disable(world) {
  world.off('preSolve', preSolveListener);
}

function preSolveListener(event) {
  disableEquationsInvolvingGhosts(event.contactEquations);
}

function disableEquationsInvolvingGhosts(equations) {
  equations.forEach(function(equation) {
    if (isGhost(equation.bodyA) || isGhost(equation.bodyB)) {
      equation.enabled = false;
    }
  });
}
