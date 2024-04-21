const sum = require('./sum');
const classlist = require('../classList.js');
const exp = require('constants');



test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('Add an element in the classlist', ()=>{
  classlist.add("Irfaan");
  expect(classlist.getList().length).toBe(1);
});

test('Add multiple elements', ()=>{
  classlist.add("Irfaan");
  classlist.add("Irfaan");
  expect(classlist.getList().length).toBe(3);
});

test('Delete an element in the classlist', ()=>{
  classlist.delete(0); 
  expect(classlist.getList().length).toBe(2);
});

test('Edit an element in the classlist', ()=>{
  classlist.edit("n", 0);
  expect(classlist.get(0)).toBe("n");
});