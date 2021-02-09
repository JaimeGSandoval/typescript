export interface INinja {
  firstName: string;
  lastName: string;
  rank: string;
  age: number;
  textDescription: () => string;

  kageNumber?: number;
  sageMode?: boolean;
  eightGates?: boolean;
}
