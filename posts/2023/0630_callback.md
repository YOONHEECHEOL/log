---
title: "JS callback"
subtitle: "callback"
date: "2023-06-30"
tag: "Javascript callback"
---

- javascript 일급객체 개념 이해하기
- callback 개념 이해하기
- Promise 개념 이해하기
- Promise.all, Promise.race

---

## 일급객체

일급객체란? 변수에 할당할 수 있는 객체를 의미한다.  
아래 예시 코드를 보면 Number와 String은 선언된 변수에 할당이 가능하므로 일급객체이다.    
조건문(if)의 경우 변수에 할당이 불가하므로 일급객체가 아니다.  
javascript는 함수를 변수에 할당이 가능한 일급객체로 취급한다.

**javascript에서는 함수를 argument, return값으로 사용할 수 있다!**

```js
let val1 = 1;
let val2 = 'str';
let val3 = [1, 2, 3];
let val4 = {name: 'lee'};

// if 문의 경우 변수에 할당이 불가하므로 일급객체가 아니다
val = if() {
    ...
} // Error

// javascript에서는 함수를 변수에 할당할 수 있으므로 일급객체이다
val = function() {
    return ...
} // 가능
```

## callback

callback이란?     
함수가 선언된 후 다른 함수 안에서 나중에 실행되는 함수를 callback 함수라고 한다.

```js
let hello = function(name) {
    return name + '님, 안녕하세요';
}

function checkIn(arg) {
    const attendant = ['박진영', '박성준', '이우준'];

    for(let name of attendant) {
        console.log(arg(name));
    }
}

checkIn(hello); // 박진영님, 안녕하세요
                // 박성준님, 안녕하세요
                // 이우준님, 안녕하세요
```

hello라는 함수가 checkIn이라는 함수에 arg(argument)로 입력되어 checkIn 함수 내에서 실행되었다.    
그래서 hello 함수를 callback 함수라고 할 수 있다.

callback 함수를 이용한 customFilter 함수를 만들어보며 다시 확인해보자!

```js
// winnerTeam에 속하지 않은 인원을 loserTeam 배열로 분리해보자
const kids = ['철수', '훈이', '짱구', '유리', '맹구'];
const winnerTeam = ['철수', '짱구', '맹구'];
let loserTeam = [];

function customFilter(totalArray, callback) {
    let result = [];

    for (let element of totalArray) {
        if (callback(element)) {
            result.push(element)
        }
    }

    return result;
}

const callback = function (param) {
    if (!winnerTeam.includes(param)) {
        return true;
    } else {
        return false;
    }
}

loserTeam = customFilter(kids, callback);
console.log(loserTeam);
```

사실 javascript에는 filter 함수가 이미 있다.

```
// filter 함수의 구문은 다음과 같다

arr.filter(callback(element[, index[, array]])[, thisArg])
```

```js
const kids = ['철수', '훈이', '짱구', '유리', '맹구'];
const winnerTeam = ['철수', '짱구', '맹구'];

// winnerTeam에 속하지 않은 인원을 loserTeam 배열로 분리해보자
function callback(name) {
    // winnerTeam은 전역변수 처럼 사용되고 있다
    if (!winnerTeam.includes(name)) {
        return true;
    } else {
        return false;
    }
}

let loserTeam = kids.filter(function (name) {
    return callback(name);
});

console.log(loserTeam);
```

```js
// ES6
let loserTeam = kids.filter(name => !winnerTeam.includes(name));
```

## Promise

### Synchronous(동기) 와 Asynchronous(비동기)

```js
console.log(1);
console.log(2);
console.log(3);
console.log(4);

// 1
// 2
// 3
// 4

// 앞의 명령이 실행되고 다음 행이 실행된다(순차적)
// Synchronous(동기)
```

```js
console.log(1);
console.log(2);
// 3000ms(3sec) 뒤 callback 함수를 실행하는 setTimeout함수
setTimeout(function() { console.log(3) }, 3000);
console.log(4);

// 1
// 2
// 4
// 3

// 이처럼 앞의 명령이 실행되고 다음 행이 실행되는 것이 아닌 (동시적)
// 독립적으로(병렬적으로) 실행되는 것을 Asynchronous(비동기)라고 함
```

<img src="https://miro.medium.com/v2/1*V5syja2casc0gCuu9zKV5g.png" width="380px">

언제 비동기적으로 처리해야할까?  
- **실행할 작업이 언제 끝날지 예측하기 힘든 경우 (통신)**
- 우선 순위가 낮은 작업

#### 비동기 처리 해보기

점검은 긴급 > 정기 > 임시 순으로 진행되어야 한다.  

```js
let 임시점검 = function() {
    return setTimeout(function () {
        console.log('임시점검 완료!');
    }, 2000)
}
let 긴급점검 = function() {
    return setTimeout(function () {
        console.log('긴급점검 완료!');
    }, 6000)
}
let 정기점검 = function() {
    return setTimeout(function () {
        console.log('정기점검 완료!');
    }, 4000)
}

임시점검();
긴급점검();
정기점검();

// 임시점검 완료!
// 정기점검 완료!
// 긴급점검 완료!
```  
- callback을 이용하여 순서대로 출력하기  

```js
function 점검() {
    setTimeout(function() {
        console.log('긴급점검 완료!');
        setTimeout(function() {
            console.log('정기점검 완료!');
            setTimeout(function() {
                console.log('임시점검 완료!');
            }, 2000)
        }, 4000)
    }, 6000)
}
점검();

// 긴급점검 완료!
// 정기점검 완료!
// 임시점검 완료!
```  

만약 점검이 더 많이 증가한다면?  

```js
function 점검() {
    setTimeout(function() {
        console.log('긴급점검');
        setTimeout(function() {
            console.log('정기점검');
            setTimeout(function() {
                console.log('임시점검');
                setTimeout(function() {
                    console.log('통합점검')
                    setTimeout(function() {
                        console.log('기능점검')
                        setTimeout(function() {
                            console.log('연장점검')
                            setTimeout(function() {
                                console.log('교차점검')
                                // 계속 증가
                            }, 4000)
                        }, 5000)
                    }, 8000)
                }, 3000)
            }, 2000)
        }, 4000)
    }, 6000)
}
점검();
```

그래서 Promise 객체가 나왔습니다.

### Promise 객체란?  

**Promise 객체는 resolve되면, then(), reject되면, catch()가 실행된다!**

<img src="https://www.freecodecamp.org/portuguese/news/content/images/size/w1000/2022/06/Ekran-Resmi-2020-06-06-12.21.27.png" width="380px">

먼저 Promise 객체를 생성해보자.  

```js
let job = new Promise(); // Uncaught TypeError: Promise resolver undefined is not a function
```

```js
// Promise는, new 키워드와 Promise() 함수를 통해 생성되고,
// resolve, reject될 때 처리할 callback 함수를 argument로 받아야한다.

let job = new Promise(function(resolve, reject){});
```

```js
let 임시점검 = function(param = '') {
    console.log(param)
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve('임시점검 완료!');
        }, 2000)
    })
}
let 긴급점검 = function(param = '') {
    console.log(param)
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve('긴급점검 완료!');
        }, 6000)
    })
}
let 정기점검 = function(param = '') {
    console.log(param)
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve('정기점검 완료!');
        }, 4000)
    })
}

// nest 방식
// 긴급점검().then(function(긴급점검_resolve_값) {
//     정기점검(긴급점검_resolve_값).then(function(정기점검_resolve_값) {
//         임시점검(정기점검_resolve_값).then(function(임시점검_resolve_값) {
//             console.log(임시점검_resolve_값)
//         })
//     })
// })

긴급점검()
    .then(긴급점검_resolve_값 => 정기점검(긴급점검_resolve_값))
    .then(정기점검_resolve_값 => 임시점검(정기점검_resolve_값))
    .then(임시점검_resolve_값 => console.log(임시점검_resolve_값))

//
// 긴급점검 완료!
// 정기점검 완료!
// 임시점검 완료!
```  

Promise로 비동기 처리를 하면, 코드 가독성도 좋고 처리순서를 지정하기에도 편하다!  
비동기 통신 api인 fetch()를 이용한 방문객 리스트를 출력하는 getUserList 함수를 완성해보며 한번 더 이해해보자.  
fetch()는 Promise를 반환한다.

```js
let fetched = fetch('https://jsonplaceholder.typicode.com/users');

console.log(fetched); // Promise {<pending>}
```
- fetch()를 통해 데이터를 받아와서 출력 (*fetch의 자세한 동작은 아래에서 다시 설명*)  

#### callback을 이용하여 회원 리스트 출력하기

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
    <button onclick="print()">회원 조회</button>
    <button onclick="init()">초기화</button>
</body>
<script>
    const root = document.querySelector('#root');

    function print() {
        // 시작 메세지 출력        
        root.innerHTML += `=========================<br />
                    회원 리스트를 출력합니다..<br />
                    =========================<br />
                    `;

        // 데이터 요청
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(res => {
                let list = [];
                res.forEach(function(user) {
                    list.push(user.name + '<br />');
                })                
                // 리스트 출력
                root.innerHTML += list;

                fetch('https://jsonplaceholder.typicode.com/todos')
                    .then(res => res.json())
                    .then(res => {
                        root.innerHTML += `-----------------------------<br />
                                            ${res.length}개의 할일이 있습니다.<br />
                                            ----------------------------<br />
                                            `
                        
                        fetch('https://jsonplaceholder.typicode.com/posts')
                            .then(res => res.json())
                            .then(res => {
                                root.innerHTML += `-----------------------------<br />
                                                    ${res.length}개의 게시글이 있습니다.<br />
                                                    ----------------------------<br />
                                                    `;

                                // 끝 메세지 출력
                                root.innerHTML += `=========출력완료=========<br /><br /><br />`;
                            })
                    })
            });
    }
    function init() {root.innerHTML = ''}
    </script>
</html>
```  
#### Promise를 이용하여 회원 리스트 출력하기  

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
    <button onclick="print()">회원 조회</button>
    <button onclick="init()">초기화</button>
</body>
<script>
    const root = document.querySelector('#root');

    const start = function() {
        return new Promise(function(resolve, reject) {
            resolve(`=========================<br />
                    회원 리스트를 출력합니다..<br />
                    =========================<br />
                    `);
        })
    }

    const getUserList = function(param) {
        root.innerHTML += param;

        return new Promise(function(resolve, reject) {
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(res => {
                let list = [];
                res.forEach(function(user) {
                    list.push(user.name + '<br />');
                })                
                resolve(list);
            });
        })
    }

    const getTodoList = function(param) {
        root.innerHTML += param;

        return new Promise(function(resolve, reject) {
            fetch('https://jsonplaceholder.typicode.com/todos')
            .then(res => res.json())
            .then(res => {                              
                resolve(`-----------------------------<br />
                        ${res.length}개의 할일이 있습니다.<br />
                        ----------------------------<br />
                        `);
            });
        })
    }

    const getPostList = function(param) {
        root.innerHTML += param;

        return new Promise(function(resolve, reject) {
            fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(res => {                              
                resolve(`-----------------------------<br />
                        ${res.length}개의 게시글이 있습니다.<br />
                        ----------------------------<br />
                        `);
            });
        })
    }

    const end = function(param) {
        root.innerHTML += param;

        return new Promise(function(resolve, reject) {
            resolve(`=========출력완료=========<br /><br /><br />`)
        })
    }

    function print() {
        start()
            .then(res => getUserList(res))
            .then(res => getTodoList(res))
            .then(res => getPostList(res))
            .then(res => end(res))
            .then(res => root.innerHTML += res)

    }
    function init() {root.innerHTML = ''}
    </script>
</html>
```  
**boilerplate가 너무 많다!**  

## async / await

async / await를 이용하면 Promise를 수정하기  

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
    <button onclick="print()">회원 조회</button>
    <button onclick="init()">초기화</button>
</body>
<script>
    const root = document.querySelector('#root');

    async function print() {
        root.innerHTML += `=========================<br />
                    회원 리스트를 출력합니다..<br />
                    =========================<br />
                    `;

        const userList = await fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(res => {
                let list = [];
                res.forEach(function(user) {
                    list.push(user.name + '<br />');
                })                
                return list;
            });
        root.innerHTML += userList;

        const todoList = await fetch('https://jsonplaceholder.typicode.com/todos')
            .then(res => res.json())
            .then(res => {
                return `-----------------------------<br />
                        ${res.length}개의 할일이 있습니다.<br />
                        ----------------------------<br />
                        `
            });
        root.innerHTML += todoList;

        const postList = await fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(res => {
                return `-----------------------------<br />
                        ${res.length}개의 게시글이 있습니다.<br />
                        ----------------------------<br />
                        `
            });
        root.innerHTML += postList;

        root.innerHTML += `=========출력완료=========<br /><br /><br />`;
    }
    function init() {root.innerHTML = ''}
    </script>
</html>
```  
async/await와 callback을 함께 사용하여 수정해보기  

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
    <button onclick="print()">회원 조회</button>
    <button onclick="init()">초기화</button>
</body>
<script>
    const root = document.querySelector('#root');

    const fetchUrl = (url) => fetch(url).then(res => res.json());

    const fetchCallback = async (url, callback) => callback(await fetchUrl(url));

    async function print() {
        root.innerHTML += `=========================<br />
                    회원 리스트를 출력합니다..<br />
                    =========================<br />
                    `;

        const userList = await fetchCallback('https://jsonplaceholder.typicode.com/users', function(args) {
            return args.map(person => person.name + '<br />');
        });
        root.innerHTML += userList;

        const todoList = await fetchCallback('https://jsonplaceholder.typicode.com/todos', function(args) {           
            return `-----------------------------<br />
                    ${args.length}개의 할일이 있습니다.<br />
                    ----------------------------<br />
                    `;
        });
        root.innerHTML += todoList;

        const postList = await fetchCallback('https://jsonplaceholder.typicode.com/posts', function(args) {
            return `-----------------------------<br />
                    ${args.length}개의 게시글이 있습니다.<br />
                    ----------------------------<br />
                    `;
        });
        root.innerHTML += postList;

        root.innerHTML += `=========출력완료=========<br /><br /><br />`;
    }
    function init() {root.innerHTML = ''}
    </script>
</html>
```

***

*번외) 왜 then을 두번 거칠까?*

fetch로 반환받은 Promise는 resolve되면서 Response 객체를 반환한다.

```js
fetch('https://jsonplaceholder.typicode.com/todos/')
    .then(res => console.log(res))

// Response { ... }
```

Response 객체 안에는

```js
Response {
    body: (...), // 응답 본문 내용의 ReadableStream
    bodyUsed: false, // 응답의 본문이 사용되었는지 여부
    headers: Headers {}, // 응답과 관련된 Header 객체
    ok: true, // 응답의 성공 여부
    redirected: false, // 응답이 리디렉션의 결과인지 여부, 즉 URL 목록이 두 개 이상의 항목인지 여부
    status: 200, // 200, 400, 500 ...
    statusText: "", // status에 해당하는 상태 메세지
    type: "cors", // 응답 유형, basic, cors ...
    url: "https://jsonplaceholder.typicode.com/todos/" // 응답 URL
    [[Prototype]]: Response { ... }
}
```

```js
Response {
    ...,
    [[Prototype]]: Response {
        arrayBuffer: ƒ arrayBuffer(), // Response.body를 ArrayBuffer로 resolve되는 Promise 객체 반환
        blob: ƒ blob(), // Response.body를 Blob으로 resolve되는 Promise 객체 반환
        clone: ƒ clone(), // Response 객체의 복사본을 생성
        formData: ƒ formData(), // Response.body를 FromData로 resolve되는 Promise 객체 반환
        json: ƒ json(), // Response.body를 JSON으로 resolve되는 Promise 객체 반환
        text: ƒ text(), // Response.body를 문자열로 resolve되는 Promise 객체 반환
        body: (...),
        bodyUsed: (...),
        headers: (...),
        ok: (...),
        redirected: (...),
        status: (...),
        statusText: (...),
        type: (...),
        url: (...),
        constructor: ƒ Response(),
        Symbol(Symbol.toStringTag): "Response",
        ...
    }    
}
```

따라서 fetch api를 이용하여 네트워크 통신을 할 경우,

```js
fetch('https://jsonplaceholder.typicode.com/todos/') // Response 객체로 resolve되는 Promise 객체 반환
    .then(function(responseResolve) { // fetch를 통해 전달받은 Promise가 resolve되며 Response 객체를 전달
        console.log(responseResolve) // Response {}
        return response.json(); // JSON으로 resolve되는 Promise 객체를 반환
    })
    .catch(function(responseReject) { // fetch를 통해 전달받은 Promise가 reject됨
        console.log(responseReject) // Uncaught (in promise) TypeError: Failed to fetch
    })
    .then(function(resolve)) { // Response를 통해 전달받은 Promise가 resolve된 경우
        return resolve; // Response.json()을 통해 JSON으로 resolve되는 Promise를 전달받음
    }
    .catch(function(reject)) { // Response를 통해 전달받은 Promise가 reject된 경우
        console.log(reject);
    }
```

즉, fetch api를 사용하여 네트워크 통신을 할 경우  
Promise > Promise > Promise 두단계에 걸쳐 비동기 처리된 후 결과값을 받게 되는 것을 알 수 있다.

- [Response 객체 알아보기](https://developer.mozilla.org/ko/docs/Web/API/Response)

***


```js
// Promise를 resolve하는 방법은
// nested방식 혹은 메소드체이닝 등이 있다.

// nested
fetch('https://jsonplaceholder.typicode.com/todos/') 
    .then(function(responseResolve) {         
        responseResolve.json()
            .then(function(response) {
                console.log(response);
                return response;
            })                
    })
```