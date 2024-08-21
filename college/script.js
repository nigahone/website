// Array methods exercises:

// 1.Using splice to Modify Array: Create an array with the following elements: ["apple", "banana",
//     "cherry", "date", "elderberry"]. Use the splice method to remove the element "cherry" and add
//     "fig" and "grape" in its place. Display the modified array.

let fruits = ["apple", "banana", "cherry", "date", "elderberry"];

// Remove "cherry" and add "fig" and "grape"
fruits.splice(2, 1, "fig", "grape");

console.log(fruits);


// 2. Combining push and slice: Initialize an array with the numbers [1, 2, 3, 4]. Use the push
// method to add two more numbers to the array. Then, use the slice method to create a new array
// that contains only the last three elements from the updated array. Display the new array.

let numbers = [1, 2, 3, 4];

numbers.push(5, 6);

// Create a new array with the last three elements
let lastThree = numbers.slice(-3);

console.log(lastThree);



// 3. Using shift and unshift: Start with an array of three different animal names. Use the shift
// method to remove the first animal and then use the unshift method to add a new animal at the
// beginning of the array. Display the updated array.
let animals = ["lion", "tiger", "bear"];

// Remove the first animal
animals.shift();

// Add a new animal at the beginning
animals.unshift("elephant");

console.log(animals);





// 4. Using pop and splice: Create an array with the numbers [10, 20, 30, 40, 50]. Use the pop
// method to remove the last number from the array. Then, use the splice method to replace the
// 2nd and 3rd numbers with the numbers 60 and 70. Display the final array.

let numbers = [10, 20, 30, 40, 50];

// Remove the last number
numbers.pop();

// Replace the 2nd and 3rd numbers with 60 and 70
numbers.splice(1, 2, 60, 70);

console.log(numbers);





// 5. Using slice to Extract a Portion: Initialize an array with the names of several books. Use the
// slice method to extract a portion of the array starting from the 2nd index and ending at the 5th
// index. Display the extracted portion of the array.

let books = ["Book1", "Book2", "Book3", "Book4", "Book5", "Book6"];

// Extract a portion from the 2nd to the 5th index
let extractedBooks = books.slice(2, 5);

console.log(extractedBooks);














