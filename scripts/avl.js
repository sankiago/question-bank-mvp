export class Node {
  constructor({ key = null, height = 1, left, right }) {
    this.key = key;
    this.height = height;
    this.left = left;
    this.right = right;
  }

  getBalanceFactor() {
    const lHeight = this.left ? this.left.height : 0;
    const rHeight = this.right ? this.right.height : 0;
    return rHeight - lHeight;
  }

  fixHeight() {
    const lHeight = this.left ? this.left.height : 0;
    const rHeight = this.right ? this.right.height : 0;
    this.height = (lHeight > rHeight ? lHeight : rHeight) + 1;
  }
}

export class Tree {
  constructor() {
    this.root = undefined;
  }

  rotateLeft(node) {
    const root = node.right;

    const left = node;
    left.right = root.left;
    root.left = left;

    left.fixHeight();
    root.fixHeight();

    return root;
  }

  rotateRight(node) {
    const root = node.left;

    const right = node;
    right.left = root.right;
    root.right = right;

    right.fixHeight();
    root.fixHeight();

    return root;
  }

  balance(node) {
    node.fixHeight();

    if (node.getBalanceFactor() === 2) {
      if (node.right.getBalanceFactor() < 0) {
        node.right = this.rotateRight(node.right);
      }
      return this.rotateLeft(node);
    }

    if (node.getBalanceFactor() === -2) {
      if (node.left.getBalanceFactor() > 0) {
        node.left = this.rotateLeft(node.left);
      }
      return this.rotateRight(node);
    }

    return node;
  }

  insert(node) {
    if (!this.root) {
      this.root = node;
      return;
    }
    this.root = this._insert(this.root, node);
  }

  _insert(vertex, node) {
    if (node.key === vertex.key) {
      return vertex;
    }
    if (node.key.lessThan(vertex.key)) {
      if (!vertex.left) {
        vertex.left = node;
      } else {
        vertex.left = this._insert(vertex.left, node);
      }
    } else {
      if (!vertex.right) {
        vertex.right = node;
      } else {
        vertex.right = this._insert(vertex.right, node);
      }
    }

    return this.balance(vertex);
  }

  findMin(node) {
    return node.left ? this.findMin(node.left) : node;
  }

  removeMin(node) {
    if (!node.left) {
      return node.right;
    }
    node.left = this.removeMin(node.left);
    return this.balance(node);
  }

  remove(k) {
    this.root = this._remove(this.root, k);
    return this.root;
  }

  _remove(node, k) {
    if (!node) {
      return;
    }

    if (k.lessThan(node.key)) {
      node.left = this._remove(node.left, k);
    } else if (k.greaterThan(node.key)) {
      node.right = this._remove(node.right, k);
    } else {
      const left = node.left;
      const right = node.right;

      if (!right) {
        return left;
      }

      const min = this.findMin(right);
      min.left = left;
      min.right = this.removeMin(right);

      node = this.balance(min);
    }

    return node;
  }

  find(k, node) {
    if (!node) {
      node = this.root;
    }

    if (k === node.key) {
      return node;
    } else if (k.lessThan(node.key)) {
      if (!node.left) {
        return;
      }
      return this.find(k, node.left);
    } else if (k.greaterThan(node.key)) {
      if (!node.right) {
        return;
      }
      return this.find(k, node.right);
    }
  }

  // Returns count of nodes in BST in
  // range [low, high]
  getCount(node, low, high) {
    // Base Case
    if (!node) return 0;

    // If current node is in range, then
    // include it in count and recur for
    // left and right children of it
    if (
      (node.key.greaterThan(low) || node.key.reviewDate.getTime() == low) &&
      (node.key.lessThan(high) || node.key.reviewDate.getTime() == high)
    )
      return (
        1 +
        this.getCount(node.left, low, high) +
        this.getCount(node.right, low, high)
      );
    // If current node is smaller than low,
    // then recur for right child
    else if (node.data.lessThan(low))
      return this.getCount(node.right, low, high);
    // Else recur for left child
    else return this.getCount(node.left, low, high);
  }

  getAvailableCards(node, low, high, result = []) {
    if (!node) return result;
    if (
      node.key.reviewDate.getTime() >= low &&
      node.key.reviewDate.getTime() <= high
    )
      return [node.key]
        .concat(this.getAvailableCards(node.left, low, high))
        .concat(this.getAvailableCards(node.right, low, high));
    else if (node.key.reviewDate.getTime() < low)
      return this.getAvailableCards(node.right, low, high);
    else return this.getAvailableCards(node.left, low, high);
  }

  inorder(node, result = []) {
    if (!node) {
      return result;
    }
    this.inorder(node.left, result);
    result.push(node.key);
    this.inorder(node.right, result);
    return result;
  }
}

export default { Node, Tree };
