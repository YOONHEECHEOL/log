---
title: "함수 선언식과 함수 표현식"
subtitle: "function declarations(함수 선언식) | function expressions(함수 표현식)"
date: "2023-07-06"
tag: "js function"
--- 

- 함수 선언식 이해하기
- 함수 표현식 이해하기

---

## 함수 선언식

```js
function func() {
    // 구현로직
}
```  

```js
function funcDeclarations() {
    return '함수 선언식';
}
funcDeclarations();
```  

## 함수 표현식

```js
var funcVal = function() {
    // 구현로직
}
```  

```js
var funcExpression = function() {
    return '함수 표현식';
}
funcExpression();
```  

## 함수 선언식과 함수 표현식의 차이점

- 호이스팅

함수 선언식은 호이스팅에 영향을 받지만, 함수 표현식은 호이스팅에 영향을 받지 않음.  

```js
message();
tel();

function message() {
    return 'Send Message!';
}

var tel = function() {
    return 'Tel!';
}
```  

```js
// 위 코드를 실행 시 아래와 같이 동작
function message() {
    return 'Send Message!';
}

var tel;

message(); // Send Message!
tel(); // Uncaught TypeError: tel is not a function

tel = function() {
    return 'Tel!';
}

// 호이스팅으로 인해 자바스크립트 해석기는 
// function message() {} 와 var tel 이 위로 끌려올라 가서 실행됨
```  

## 함수 표현식의 장점

- 호이스팅에 영향을 받지 않음
- 클로져로 활용
- 콜백으로 활용(다른 함수의 인자로 넘길 수 있음)

### 함수 표현식으로 클로져 생성하기

