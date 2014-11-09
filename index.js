module.exports = {
  ghostify: ghostify,
  unghostify: unghostify,
  isGhost: isGhost,
  enable: enable,
  disable: disable
};

function ghostify(body) {
  body.ghost = true;
}

function unghostify(body) {
  delete body.ghost;
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
  event.contactEquations.forEach(function(equation) {
    if (isGhost(equation.bodyA) || isGhost(equation.bodyB)) {
      equation.enabled = false;
    }
  });
}
