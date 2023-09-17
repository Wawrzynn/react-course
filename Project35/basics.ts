//Primitives
let age: number = 23;
let userName: string = "Max";
let isInstructor: boolean = false;

//More complex types
let hobbies: string[] = ["Sports", "Cooking"];
type Person = { name: string; age: number }; //Type alias
let person: Person = {
  name: "Max",
  age: 32,
};

//Type inference
let course: string | number = "React - The Complete Guide";
course = 12341;

//Functions & types
function add(a: number, b: number): number {
  return a + b;
}
function printOutput(value: any) {
  console.log(value);
}

//Generics
function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}
const demoArray = [1, 2, 3];
const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
const stringArray = insertAtBeginning(["a", "b", "c"], "d");

