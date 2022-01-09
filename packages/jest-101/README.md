# Get Start with Jest

1. learn some concepts & features about jest like `matchers`, `expect` `mock`
2. how to using `ES6`

--------------------------------------------------------------------------------

## Set up
```shell
$ mkdir jest-101
$ cd jest-101
$ npm init
$ npm install --save-dev jest
```

you can specify some default testing setting by

```shell
$ jest --init
```

you can run tests via

```shell
$ jest
```

then jest recognize the file ends with `*.test.js` and run the test

--------------------------------------------------------------------------------

## Using with ES6
you can use babel to translate & compile the `ES6` code into `ES5`

### Installing & Config Babel
install `babel-jest`, `babel-core` `@babel/preset-env` `regenerator-runtime`

```shell
$ npm isntall --save-dev babel-jest babel-core regenerator-runtime @babel/preset-env
```

if you need some typescript support, then install `@babel/preset-typescript` too.

```shell
$ npm install --save-dev @babel/preset-typescript
```

--------------------------------------------------------------------------------

## Basic concepts
Use `describe` to define a test block and arrange different test case together as a group.   
Use `it` to define test cases within it.

```javascript
describe("calculator", () => {
  describe("should perform addition", () => {
    it("add two positive numbers", () => {})
    it("add two negative numbers", () => {})
    it("add two positive and negative numbers", () => {})
  })
  it("should perform subtraction", () => {})
  it("should perform multiplication", () => {})
  it("should perform division", () => {})
})
```

The basic idea is to ensure **relevant tests are grouped together**,   
So that the **test description makes more sense** for people who maintain them.   

It's more helpful if you can describe the `description` within the business context,   
by using domain language like this:

```javascript
describe("Hotel Jest", () => {
  describe("Reservation", () => {
    it("should make a reservation when there are enough rooms", () => {})
    it("should warn the administrator when there are only 5 available rooms left", () => {})
  })
  describe("Checkout", () => {
    it("should check if any appliance is broken", () => {})
    it("should refund guest when checkout is earlier then planned", () => {})
  })
})
```

--------------------------------------------------------------------------------

## Matchers in jest

### Equality
`toEqual` and `toBe` are used to assert whether values are equal to each other.   

```javascript
describe("equality", () => {
  it(".toEqual", () => {
    expect(1 + 1).toEqual(2)  // PASS
    expect("hello world!").toEqual("hello world!")  // PASS
    expect({ name: "kim" }).toEqual({ name: "kim" })  // PASS
  })
  
  it(".toBe", () => {
    expect(1 + 1).toBe(2)  // PASS
    expect("hello world!").toBe("hello world!")  // PASS
    expect({ name: "kim" }).toBe({ name: "kim" })  // FAIL!!
  })
})
```

`toBe` compares objects by memory address, while `toEqual` compares the value.   
So if you want to make sure all fields are matching, use `toEqual`

### Opposite Matching
you can use `.not` to assert the opposite value:

```javascript
it(".not", () => {
  expect(1 + 2).not.toEqual(2)
})
```

### Matchers for Array and Object
`toContainEqual` and `toContain` can test if an element is **contained in an array**:

```javascript
const users = [
  { name: "kim" },
  { name: "lee" },
  { name: "son" }
]

it("match array", () => {
  expect(users).toContainEqual({ name: "kim" })  // PASS
  expect(users).toContain(users[0])  // PASS
  expect(users).toContain({ name: "kim" })  // FAIL
})
```

Basically, `toContain` checks if the item is in the list by **strict comparison** using `===`.
On the other hand, `toContainEqual` checks the value.   

You can test **existence of the fields in an object** by `toBeDefined`

```javascript
const user = {
  name: "kim",
  adress: "Seoul, Korea"
}

it("match object", () => {
  expect(user.name).toBeDefined()
  expect(user.age).not.toBeDefined()
})
```

### Powerful `expect` function
Helper functions attached to the `expect` are:

- `expect.stringContaining`
- `expect.arrayContaining`
- `expect.objectContaining`

You can define your own mather by using those helpers. 

```javascript
it("string containing", () => {
  const givenName = expect.stringContaining("kim")
  expect("hyunsu kim").toEqual(givenName)
})

it("array containing", () => {
  const users = [ "kim", "lee", "son" ]
  const userSubset = expect.arrayContaining([ "kim", "son" ])
  expect(users).toEqual(userSubset)
})

it("object containing", () => {
  const user = {
    name: "kim",
    address: "Seoul, Korea",
    books: [
      { name: "Test-Driven Development with React" },
      { name: "Micro-Frontend with React" }
    ]
  }
  
  // you can describes matcher by combination of expect helper functions! 
  const matcher = expect.objectContaining({
    name: expect.stringContaining("kim"),
    books: expect.arrayContaining([ { name: "Test-Driven Development with React" } ])
  })
  expect(user).toEqual(matcher)
})
```

### Build custom matcher
you can define a mather by extend the `expect` function.

```javascript
import jsonpath from "jsonpath"

expect.extend({
  toMatchJsonPath(received, argument) {
    const result = jsonpath.query(received, argument)
    if (result.length > 0) {
      return {
        pass: true,
        message: () => "matched"
      }
    }
    return {
      pass: false,
      message: () => `expected ${JSON.stringify(received)} to match jsonpath ${argument}`
    }
  }
})
```

Once it defined, you can use it in your test just like any other built-in matchers.

```javascript
describe("jsonpath", () => {
  it("matches jsonpath", () => {
    const user = { name: "kim" }
    expect(user).toMatchJsonPath("$.name")
  })
  
  it("doesn't match jsonpath", () => {
    const user = {
      name: "kim",
      address: "Seoul, Korea"
    }
    expect(user).not.toMatchJsonPath("$.age")
  })
})
```

--------------------------------------------------------------------------------

## Mock & Stub

### `jest.fn` for spying
You can use `jest.fn` to create function that could be invoked just like other functions.   
A mock function created by `jest.fn` can track all the invocations to it.   
It can record invoke times, parameter passed in for each invoke and so on.

```javascript
describe("jest.fn", () => {
  it("create a callable function", () => {
    const mock = jest.fn()
    mock("kim")
    expect(mock).toHaveBeenCalled()
    expect(mock).toHaveBeenCalledWith("kim")
    expect(mock).toHaveBeenCalledTimes(1)
  })
})
```

### Mock implementation
You can define an implementation by yourself too.

```typescript
describe("mock implementation", () => {
  it("create a fake add function", () => {
    type AddFn = (a: number, b: number) => number
    const fakeAdd: AddFn = jest.fn().mockImplementation((a, b) => a + b)
    expect(fakeAdd(1, 2)).toBe(3)
    expect(fakeAdd).toHaveBeenCalledTimes(1)
    expect(fakeAdd).toHaveBeenCalledWith(1, 2)
  })
})
```
