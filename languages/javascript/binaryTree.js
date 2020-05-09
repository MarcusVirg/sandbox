class Node {
    constructor(val) {
        this.value = val
        this.left = null
        this.right = null
    }
}

class BTree {
    constructor() {
        this.root = new Node(null)
    }

    insert(val) {
        if(!this.root) {
            this.root = new Node(val)
            return
        }

        let currNode = this.root
        let newNode = new Node(val)

        while(currNode) {
            if(val < currNode) {
                if(!currNode.left) {
                    currNode.left = newNode
                    break
                } else {
                    currNode = currNode.left
                }
            } else {
                if(!currNode.right) {
                    currNode.right = newNode
                    break
                } else {
                    currNode = currNode.right
                }
            }
        }
    }

    dfs(node) {
        if(node) {
            console.log(node.value)
            this.dfs(node.left)
            this.dfs(node.right)
        }
    }
}

let bst = new BTree()
bst.insert(3)
bst.insert(2)
bst.insert(4)
bst.insert(1)
bst.insert(5)

bst.dfs(5)