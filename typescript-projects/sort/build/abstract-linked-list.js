"use strict";
// import { Sorter } from './Sorter';
// class Node {
//   // next PROPERTY GETS DEFINED WITH THE STAND ALONE NOTATION INSTEAD OF INSIDE THE CONSTRUCTOR
//   // BECAUSE WE DON'T WANT TO DEFINE THE NEXT NODE IN THE CHAIN WHEN WE CREATE A NODE. INSTEAD WE WANT TO BE
//   // ABLE TO CREATE A NODE FIRST AND THEN ASSOCIATE WITH SOME OTHER NODE IN THE CHAIN LATER ON. THAT'S WHY WE
//   // DON'T PUT next INSIDE THE CONSTRUCTOR
//   public next: Node | null = null;
//   constructor(public data: number) {}
// }
// export class LinkedList extends Sorter {
//   // head will reference a Node or be null
//   public head: Node | null = null; // linked list starts off empty
//   public add(data: number): void {
//     const node = new Node(data);
//     if (!this.head) {
//       this.head = node; // head is the container for the nodes list?
//       return; // we return immediately because head is the only node in the linked list
//     }
//     let tail = this.head;// this.head is a Node
//     while (tail.next) {
//       tail = tail.next;
//     }
//     tail.next = node; // This adds head to the end of the linked list. This is the argument passed to add method. This is now the last item in the linked list
//   }
//   get length(): number {
//     if (!this.head) { // list is empty so we return 0
//       return 0;
//     }
//     let length = 1;
//     let node = this.head;
//     while (node.next) {
//       length++;
//       node = node.next; // update the node reference here to point to the next node on the chain
//     }
//      // when the while loop ends, the length will reflect the total number of nodes that we've moved through
//     return length;
//   }
//   // at is used to retrieve a node at a specific index
//   public at(index: number): Node {
//     if (!this.head) {
//       throw new Error('Index out of bounds');
//     }
//     let counter = 0;
//     let node: Node | null = this.head; // this says that node can be either of type Node or null
//     while (node) {
//       if (counter === index) { // if counter equals index, that means we've found the node we were looking for
//         return node;
//       }
//       counter++; // increment counter to go to next node
//       node = node.next; // sets reference to next node in the chain
//     }
//     throw new Error('Index out of bounds'); // throw error if we never hit the node at the index given
//   }
//   public compare(leftIndex: number, rightIndex: number): boolean {
//     if (!this.head) {
//       throw new Error('List is empty');
//     }
//     return this.at(leftIndex).data > this.at(rightIndex).data; // left index is a reference to the Node there, and reference that Node's data property to find the number inside the actual Node
//   }
//   public swap(leftIndex: number, rightIndex: number): void {
//     const leftNode = this.at(leftIndex);
//     const rightNode = this.at(rightIndex);
//     const leftHand = leftNode.data;
//     leftNode.data = rightNode.data;
//     rightNode.data = leftHand;
//   }
//   public print(): void {
//     if (!this.head) {
//       return;
//     }
//     let node: Node | null = this.head;
//     while (node) {
//       console.log(node.data);
//       node = node.next; // updates node to be the next node in the chain
//     }
//   }
// }
