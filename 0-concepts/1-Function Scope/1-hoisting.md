# Hoisting

## Function declarations are read before the code executes

**Function declarations are read and added to the execution context before the code begins running through a process called function declaration hoisting**. As the code is being evaluated, the JavaScript engine does a first pass for function declarations and pulls them to the top of the source tree. So even though the function declaration appears after its usage in the actual source code, the engine changes this to hoist the function declarations to the top.

One of the key characteristics of function declarations is function declaration hoisting, whereby function declarations are read before the code executes. That means a function declaration may appear after code that calls it and still work:

```javascript
sayHi();

function sayHi() {
    alert(“Hi!”);
}
```

This example doesn’t throw an error because the function declaration is read first before the code begins to execute.

## Function expressions. Must be assigned before usage

The second way to create a function is by using a function expression. Function expressions have several forms. The most common is as follows:

```javascript
var functionName = function(arg0, arg1, arg2) {
    //function body
};
```

This pattern of function expression looks like a normal variable assignment. A function is created and assigned to the variable functionName. The created function is considered to be an anonymous function, because it has no identifier after the function keyword. (Anonymous functions are also sometimes called lambda functions.) This means the name property is the empty string.

Function expressions act like other expressions and, therefore, must be assigned before usage. The following causes an error:

```javascript
sayHi(); //error – function doesn’t exist yet var

sayHi = function() {
    alert(“Hi!”);
};
```

**Understanding function hoisting is key to understanding the differences between function declarations and function expressions**. For instance, the result of the following code may be surprising:

```javascript
//never do this!
if (true) {
    function sayHi() {
        window.alert("Hi!");
    }
} else {
    function sayHi() {
        window.alert("Yo!");
    }
}
sayHi();
```

The code seems to indicate that if condition is true, use one definition for sayHi(); otherwise, use a different definition. In fact, this is not valid syntax in ECMAScript, so JavaScript engines try to error correct into an appropriate state. The problem is that browsers don’t consistently error correct in this case. Most browsers return the second declaration regardless of condition; Firefox returns the first when condition is true but Safari returns the second one. This pattern is dangerous and should not be used. It is perfectly fine, however, to use function expressions in this way:

```javascript
//this is okay
var sayHi;
if (condition) {
    sayHi = function () {
        alert(“Hi!”);
    };
} else {
    sayHi = function () {
        alert(“Yo!”);
    };
}
```

This example behaves the way you would expect, assigning the correct function expression to the variable sayHi based on condition.
