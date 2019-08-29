# Scoping and functions

When we declare a function, not only do we need to be concerned with the scope within which that function is available, but also with what scopes the function itself creates and how declarations within the function are affected by those scopes.

Scopes in JavaScript act somewhat differently than in most other languages whose syntax is influenced by C; namely, those that use braces ({ and }) as block delimiters. In most such languages, each block creates its own scope; not so in JavaScript!

In JavaScript, **scopes are declared by functions, and not by blocks**. The scope of a declaration that’s created inside a block isn’t terminated (as it is in other languages) by the end of the block.

Consider the following code:

```javascript
if (window) {
    var x = 213;
}

alert(x);
```

In most other languages, one would expect the scope of the declaration for x to terminate at the end of the block created by the if statement, and for the alert to fail with an undefined value. But if we were to run the preceding code in a page, the value 213 would be alerted because **JavaScript doesn’t terminate scopes at the end of blocks**.

That seems simple enough, but there are a few **nuances to the scoping rules** that depend upon what is being declared. Some of these nuances may come as a bit of a surprise:

- Variable declarations are in scope from their point of declaration to the end of the function within which they’re declared, regardless of block nesting(Except when using `const` and `let`).
- Named functions are in scope within the entire function within which they’re declared, regardless of block nesting. (Some call this mechanism hoisting.)
- For the purposes of declaration scopes, the global context acts like one big function encompassing the code on the page.
