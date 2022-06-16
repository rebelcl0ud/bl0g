---
title: "Code Test In... Java?"
date: "2019-02-14"
---

So I get an opportunity to do a code test for a company that peaked my interest, but the catch is since I'm self-taught I have to do it in Java. They threw out a few reasons for this, one being it will show how well I pick up a language I have no experience with... I don't know how someone else may have felt about it, but I thought it would be interesting to try even if they decide not to bring me on.

I did somewhat of a crash course to get the basics down-- I used Codecademy and some YouTube and got a good start on the application. I did have some hiccups with what methods/ syntax I could use, but I used what I knew about JavaScript to guide me some when doing searches.

I have a few pages of notes as I went, but here's some things off the top of me head...

A few things:

1. declaring variables by type, ie: `int age;`.

1(a) speaking of declaring variables-- `final` is like `const` where the variable will not be reassigned, ie: `final int PIE = 3.14`.

1(b) Casting- converting from one data type to another, ideally from smaller to larger:

```
double cDbl = 1.234;
int cInt = (int)cDbl;
```

2. `System.out.println()` is like `console.log()`.
3. It's all about the `" "` instead of `' '`, and don't forget to end with `;`.
4. When you set up your class and constructor, code to be executed goes in the following: `public static void main(String[] args) {}`. With that said, there must be atleast _one_ class in a Java application and _one_ main method (per application, not class).
5. When you look to return from a method you declare the data type as with a variable (as stated above), if the method will not be returning anything you use `void`.
6. When method returning an Integer, using an if/else statement and if condition calls for it, `return 0;`-- it must return something since it was declared.
7. When using a simple file `MyClass.java`, script title will match `class MyClass {}`.
8. To compile: `javac MyClass.java`; To run: `java MyClass`.

I wanted to incorporate testing as well. The testing setup was a bit time consuming, the popular thing seems to be to set everything up using Eclipse or something similar, but I really wanted to try and keep things simple using my normal editor and the terminal. Thankfully I found a few things where I was able to piece it together. The gist:

1. Make a test file, ie: `MyClassTest.java`, I kept it in the same folder as my `MyClass.java` file.
2. [jUnit - Console Launcher](https://junit.org/junit5/docs/current/user-guide/#running-tests-console-launcher)
3. Snagged executable [junit-platform-console-standalone-1.4.0.jar](https://repo1.maven.org/maven2/org/junit/platform/junit-platform-console-standalone/1.4.0/), threw it in my folder where my files were.
4. To compile: `javac -cp .:junit-platform-console-standalone-1.4.0.jar MyClassTest.java`.
5. To run tests: `java -jar junit-platform-console-standalone-1.4.0.jar --class-path . -c MyClassTest`

This post doesn't document _everything_ I came across or my final output, but I wanted to (at the very least) document the gist of this little side quest I found myself on...

note: to future self, you never touched Java, yet got something set up; correct output and with passing tests-- by no means a Java expert, but you got something going and working, _good for you_ :D
