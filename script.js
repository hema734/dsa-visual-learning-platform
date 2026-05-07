// Binary Search Tree Node
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Binary Search Tree Class
class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {

    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;

    while (true) {

      if (value === current.value) return;

      if (value < current.value) {

        if (!current.left) {
          current.left = newNode;
          return;
        }

        current = current.left;

      } else {

        if (!current.right) {
          current.right = newNode;
          return;
        }

        current = current.right;
      }
    }
  }
}

const bst = new BST();

// Insert Node
function insertNode() {

  const input = document.getElementById("node-value");

  const value = parseInt(input.value);

  if (!value && value !== 0) return;

  bst.insert(value);

  input.value = "";

  displayTree();
}

// Display Tree
function displayTree() {

  const svg = document.getElementById("tree");

  svg.innerHTML = "";

  svg.setAttribute("viewBox", "0 0 1200 600");
  svg.setAttribute("preserveAspectRatio", "xMidYMin meet");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "600");

  if (!bst.root) return;

  const levelSpacing = 100;

  function drawNode(node, x, y, angle, depth) {

    const radius = 20;

    // Draw Circle
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", "#4CAF50");

    // IMPORTANT FOR SEARCH
    circle.dataset.value = node.value;

    svg.appendChild(circle);

    // Draw Text
    const text = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );

    text.setAttribute("x", x);
    text.setAttribute("y", y + 5);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "white");
    text.setAttribute("font-size", "14");

    text.textContent = node.value;

    svg.appendChild(text);

    // Child Positions
    const childY = y + levelSpacing;

    const offset = 300 / Math.pow(2, depth);

    // LEFT CHILD
    if (node.left) {

      const childX = x - offset;

      const angleLeft = Math.atan2(
        childY - y,
        childX - x
      );

      const offsetXLeft =
        radius * Math.cos(angleLeft);

      const offsetYLeft =
        radius * Math.sin(angleLeft);

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );

      line.setAttribute(
        "x1",
        x + offsetXLeft
      );

      line.setAttribute(
        "y1",
        y + offsetYLeft
      );

      line.setAttribute(
        "x2",
        childX - offsetXLeft
      );

      line.setAttribute(
        "y2",
        childY - offsetYLeft
      );

      line.setAttribute("stroke", "#555");

      svg.appendChild(line);

      drawNode(
        node.left,
        childX,
        childY,
        angle - 20,
        depth + 1
      );
    }

    // RIGHT CHILD
    if (node.right) {

      const childX = x + offset;

      const angleRight = Math.atan2(
        childY - y,
        childX - x
      );

      const offsetXRight =
        radius * Math.cos(angleRight);

      const offsetYRight =
        radius * Math.sin(angleRight);

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );

      line.setAttribute(
        "x1",
        x + offsetXRight
      );

      line.setAttribute(
        "y1",
        y + offsetYRight
      );

      line.setAttribute(
        "x2",
        childX - offsetXRight
      );

      line.setAttribute(
        "y2",
        childY - offsetYRight
      );

      line.setAttribute("stroke", "#555");

      svg.appendChild(line);

      drawNode(
        node.right,
        childX,
        childY,
        angle + 20,
        depth + 1
      );
    }
  }

  drawNode(bst.root, 600, 50, 0, 1);
}

// Inorder Traversal
function inorder(node, result = []) {

  if (!node) return result;

  inorder(node.left, result);

  result.push(node.value);

  inorder(node.right, result);

  return result;
}

// Preorder Traversal
function preorder(node, result = []) {

  if (!node) return result;

  result.push(node.value);

  preorder(node.left, result);

  preorder(node.right, result);

  return result;
}

// Postorder Traversal
function postorder(node, result = []) {

  if (!node) return result;

  postorder(node.left, result);

  postorder(node.right, result);

  result.push(node.value);

  return result;
}

// Traversal Handlers
function inorderTraversal() {

  const result = inorder(bst.root);

  document.getElementById("output").innerHTML =
    "Inorder Traversal: " +
    result.join(" → ");
}

function preorderTraversal() {

  const result = preorder(bst.root);

  document.getElementById("output").innerHTML =
    "Preorder Traversal: " +
    result.join(" → ");
}

function postorderTraversal() {

  const result = postorder(bst.root);

  document.getElementById("output").innerHTML =
    "Postorder Traversal: " +
    result.join(" → ");
}

// SEARCH FUNCTION
function search(node, value, path = []) {

  if (!node) return path;

  path.push(node);

  if (node.value === value) {
    return path;
  }

  if (value < node.value) {
    return search(
      node.left,
      value,
      path
    );
  } else {
    return search(
      node.right,
      value,
      path
    );
  }
}

// SEARCH NODE
async function searchNode() {

  const value = parseInt(
    document.getElementById(
      "search-value"
    ).value
  );

  const path = search(
    bst.root,
    value
  );

  await animateSearch(
    path,
    value
  );
}

// SEARCH ANIMATION
async function animateSearch(
  path,
  target
) {

  const svg =
    document.getElementById("tree");

  const circles =
    svg.querySelectorAll("circle");

  // Reset Colors
  circles.forEach(circle => {
    circle.setAttribute(
      "fill",
      "#4CAF50"
    );
  });

  for (let node of path) {

    const currentCircle =
      [...circles].find(
        c =>
          parseInt(
            c.dataset.value
          ) === node.value
      );

    if (currentCircle) {

      currentCircle.setAttribute(
        "fill",
        "#f59e0b"
      );

      await new Promise(resolve =>
        setTimeout(resolve, 700)
      );

      if (
        node.value === target
      ) {

        currentCircle.setAttribute(
          "fill",
          "#22c55e"
        );

        document.getElementById(
          "output"
        ).innerHTML =
          `Node ${target} Found ✅`;

      } else {

        currentCircle.setAttribute(
          "fill",
          "#ef4444"
        );
      }
    }
  }
}
async function searchNode() {
  const value = parseInt(
    document.getElementById("search-value").value
  );

  const path = search(bst.root, value);

  await animateSearch(path, value);
}
async function animateSearch(path, target) {

  const svg = document.getElementById("tree");

  const circles = svg.querySelectorAll("circle");

  circles.forEach(circle => {
    circle.setAttribute("fill", "#4CAF50");
  });

  for (let node of path) {

    const currentCircle = [...circles].find(
      c => parseInt(c.dataset.value) === node.value
    );

    if (currentCircle) {

      currentCircle.setAttribute("fill", "#f59e0b");

      await new Promise(resolve =>
        setTimeout(resolve, 700)
      );

      if (node.value === target) {
        currentCircle.setAttribute("fill", "#22c55e");

        document.getElementById("output").innerHTML =
          `Node ${target} Found ✅`;

      } else {
        currentCircle.setAttribute("fill", "#ef4444");
      }
    }
  }
}
