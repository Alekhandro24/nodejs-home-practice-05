// /**
//  ВимогиЖ
//  1. Отримати рік у вигляді цілого числа
//  2. Повертає true, якщо рік високосний(в році - 366 днів, а в лютому - 29) и false - якщо рій невисокосний
//  3. Викидає помилку з відповідним текстом, якщо  отримує не вірний аргумент

// Критерії високосного рокуЖ
// - діліться без залишку на 4;
// - не ділиться без залишка на 100;
// - може ділитись без залишку на 400;
// - від 42 та більше ;

// 2008 - true
// 2003 - false
// 2000 - true
// 1900 - false

// 41  - помилка - 'Year must be 42 or more'
// 2008.42 - помилка - 'Year must be integer'
// "2008" -  помилка - 'Year must be number'
// () - помилка - 'Year must be exist'
// null -  помилка - 'Year must be number'
// true -  помилка - 'Year must be number'
// false -  помилка - 'Year must be number'
// [] -  помилка - 'Year must be number'
// {} -  помилка - 'Year must be number'
// */
// const isLeapYear = require("./isLeapYear");

// describe("test isLeapYear", () => {
//   test("2008 - true", () => {
//     const result = isLeapYear(2008);
//     expect(result).toBe(true);
//   });

//   test("2003 - false", () => {
//     expect(isLeapYear(2003)).toBe(false);
//   });

//   test("2000 - true", () => {
//     expect(isLeapYear(2000)).toBe(true);
//   });

//   test("1900- false", () => {
//     expect(isLeapYear(1900)).toBe(false);
//   });
//   test("41 - error'Year must be 42 or more'", () => {
//     expect(() => isLeapYear(41)).toThrow("Year must be 42 or more");
//   });
//   test("2008.4 - error'Year must be integer'", () => {
//     expect(() => isLeapYear(2008.4)).toThrow("Year must be integer");
//   });
//   test("() - error'Year must be exist'", () => {
//     expect(() => isLeapYear()).toThrow("Year must be exist");
//   });
//   test("'2008' - error'Year must be number'", () => {
//     expect(() => isLeapYear("2008")).toThrow("Year must be number");
//   });
//   test("null - error'Year must be number'", () => {
//     expect(() => isLeapYear(null)).toThrow("Year must be number");
//   });
//   test("true - error'Year must be number'", () => {
//     expect(() => isLeapYear(true)).toThrow("Year must be number");
//   });
//   test("false - error'Year must be number'", () => {
//     expect(() => isLeapYear(false)).toThrow("Year must be number");
//   });
//   test("()=>{} - error'Year must be number'", () => {
//     expect(() => isLeapYear(() => {})).toThrow("Year must be number");
//   });
//   test("[] - error'Year must be number'", () => {
//     expect(() => isLeapYear([])).toThrow("Year must be number");
//   });
//   test("{}- error'Year must be number'", () => {
//     expect(() => isLeapYear({})).toThrow("Year must be number");
//   });
// });
