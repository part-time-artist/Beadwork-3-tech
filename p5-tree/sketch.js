// A chill tree 🌳
//
// The idea: a tree is just a branch that splits into two smaller
// branches... and each of those splits again... and again.
// Doing "the same thing inside itself" is called RECURSION.
// One function, branch(), draws the whole tree by calling itself.

let sway = 0; // how much the wind pushes the tree right now

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(235, 240, 235); // soft pale green-grey sky

  // A slow breeze: sin() smoothly goes -1 → +1 → -1 forever.
  // frameCount goes up by 1 every frame, so this drifts gently.
  sway = sin(frameCount * 0.01) * 0.05;

  // Move to the bottom-middle of the canvas — that's where the trunk starts.
  translate(width / 2, height);

  // Draw the whole tree: start with a branch 120 pixels long.
  branch(120);
}

// Draws one branch, then two smaller branches on top of it.
function branch(len) {
  // Thicker stroke for long branches, thin for twigs.
  strokeWeight(map(len, 10, 120, 1, 12));
  stroke(90, 70, 60); // warm brown

  // Draw this branch: a line going straight up.
  line(0, 0, 0, -len);

  // Walk to the end of the branch we just drew,
  // so the next branches grow from its tip.
  translate(0, -len);

  if (len > 10) {
    // Still long enough — split into two smaller branches.
    // push()/pop() save and restore our position + rotation,
    // so the left branch doesn't mess up the right one.

    push();
    rotate(0.4 + sway); // lean right (angles are in radians)
    branch(len * 0.7);  // a 70%-size copy of this whole process
    pop();

    push();
    rotate(-0.4 + sway); // lean left
    branch(len * 0.7);
    pop();
  } else {
    // Too small to split — put a leaf here instead.
    noStroke();
    fill(120, 160, 90, 180); // soft green, a bit transparent
    circle(0, 0, 12);
  }
}
