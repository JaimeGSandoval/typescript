"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
var Node = /** @class */ (function () {
    function Node(data) {
        this.data = data;
        // next PROPERTY GETS DEFINED WITH THE STAND ALONE NOTATION INSTEAD OF INSIDE THE CONSTRUCTOR
        // BECAUSE WE DON'T WANT TO DEFINE THE NEXT NODE IN THE CHAIN WHEN WE CREATE A NODE. INSTEAD WE WANT TO BE
        // ABLE TO CREATE A NODE FIRST AND THEN ASSOCIATE WITH SOME OTHER NODE IN THE CHAIN LATER ON. THAT'S WHY WE
        // DON'T PUT next INSIDE THE CONSTRUCTOR
        this.next = null;
    }
    return Node;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        // head will reference a Node or be null
        this.head = null; // linked list starts off empty
    }
    LinkedList.prototype.add = function (data) {
        var node = new Node(data);
        if (!this.head) {
            this.head = node; // head is the container for the nodes list?
            return; // we return immediately because head is the only node in the linked list
        }
        var tail = this.head; // this.head is a Node
        while (tail.next) {
            tail = tail.next;
        }
        tail.next = node; // This adds head to the end of the linked list. This is the argument passed to add method. This is now the last item in the linked list
    };
    Object.defineProperty(LinkedList.prototype, "length", {
        get: function () {
            if (!this.head) { // list is empty so we return 0
                return 0;
            }
            var length = 1;
            var node = this.head;
            while (node.next) {
                length++;
                node = node.next; // update the node reference here to point to the next node on the chain
            }
            // when the while loop ends, the length will reflect the total number of nodes that we've moved through
            return length;
        },
        enumerable: false,
        configurable: true
    });
    // at is used to retrieve a node at a specific index
    LinkedList.prototype.at = function (index) {
        if (!this.head) {
            throw new Error('Index out of bounds');
        }
        var counter = 0;
        var node = this.head; // this says that node can be either of type Node or null
        while (node) {
            if (counter === index) { // if counter equals index, that means we've found the node we were looking for
                return node;
            }
            counter++; // increment counter to go to next node
            node = node.next; // sets reference to next node in the chain
        }
        throw new Error('Index out of bounds'); // throw error if we never hit the node at the index given
    };
    LinkedList.prototype.compare = function (leftIndex, rightIndex) {
        if (!this.head) {
            throw new Error('List is empty');
        }
        return this.at(leftIndex).data > this.at(rightIndex).data; // left index is a reference to the Node there, and reference that Node's data property to find the number inside the actual Node
    };
    LinkedList.prototype.swap = function (leftIndex, rightIndex) {
        var leftNode = this.at(leftIndex);
        var rightNode = this.at(rightIndex);
        var leftHand = leftNode.data;
        leftNode.data = rightNode.data;
        rightNode.data = leftHand;
    };
    LinkedList.prototype.print = function () {
        if (!this.head) {
            return;
        }
        var node = this.head;
        while (node) {
            console.log(node.data);
            node = node.next; // updates node to be the next node in the chain
        }
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
