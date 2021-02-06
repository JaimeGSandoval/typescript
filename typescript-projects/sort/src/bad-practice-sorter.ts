class BadSorter {
  // USE A TYPE GUARD ANYTIME YOU WANT TO RESTORE A SET OF PROPERTIES WHEN USING UNION TYPE
  constructor(public collection: number[] | string) {// UNION TYPE
    }
  sort(): void {
    const { length } = this.collection;



    // ALL OF THIS ONLY WORKS IF COLLECTION IS number[]
    // IF COLLECTION IS AN ARRAY OF NUMBERS
    for(let i = 0; i < length; i++) {
      for(let j = 0; j < length - i - 1; j++) {
        // TYPE GUARD CHECKS FOR TYPE SO IT CAN OFFER THAT TYPE ALL OF THE BUILT IN METHODS AND PROPERTIES
        // FOR THAT TYPE
        if(this.collection instanceof Array) {
          if(this.collection[j] > this.collection[j + 1]) {
            const leftHand = this.collection[j]; // temp is greater than
            this.collection[j] = this.collection[j + 1];
            this.collection[j + 1] = leftHand;
          }
        }

        // ONLY GOING TO WORK IF COLLECTION IS  STRING
        // IF COLLECTION IS A STRING, DO THIS LOGIC INSTEAD
         // TYPE GUARD CHECKS FOR TYPE SO IT CAN OFFER THAT TYPE ALL OF THE BUILT IN METHODS AND PROPERTIES
        // FOR THAT TYPE
        if(typeof this.collection === 'string') {

        }
      }
    }
  }
}

const sorter = new BadSorter([10, 3, -5, 0]);
sorter.sort();
console.log(sorter.collection);
