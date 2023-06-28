---
title: "TIL - 230627"
subtitle: "Today I Leared / Javascript 복습"
date: "2023-06-27"
tag: "JS"
---

- JS 역사(프론트엔드 발전의 맥락을 이해하기)
  - 1995, 브라우저에서 HTML을 동적으로 사용을 원함 > 프로그래밍 언어 개발(브렌던 아이크 씨) > 자바스크립트 개발
  - 여러가지 브라우저에서 각자 자바스크립트를 따로 씀 > 표준화 필요 > ECMA 인터내셔널(표준화기구) 요청
    - ECMAScript로 표준화 작업(줄여서 ES-)
    - ECMAScript6 (ES6, ECMAScript 2015)
      - let/const, 화살표 함수, 클래스, 모듈 등 도입 > 현대화
      - ECMAScript8 (ES8, ECMAScript 2017)
        - async/await 도입
  - 1999, 비동기적 통신 ajax 도입
    - 새로고침 없이, 전체 재렌더링 없이, 필요한 부분만 재렌더링
  - 2006, jquery 등장
    - DOM 접근 편리성 증대
  - 2008, 구글 V8 Javascript 엔진 출시
    - javascript 웹 어플리케이션 구축 요구 부합
    - 웹서버에서 수행하던 많은 부분이 브라우저 단으로 이동
    - 프론트엔드의 부각
  - 2009, Node.js 등장
    - javascript를 브라우저 이외의 환경에서 실행할 수 있는 환경 제공
    - javascript로 프론트엔드/백엔드 역할 모두 가능
    - like JVM
- Node.js, npm
  - Node.js
    - 라이언 달 개발
    - Chrome V8 Javascript Engine으로 빌드된 Javascript Runtime Environment
    - 브라우저 밖에서 Javasciprt 사용할 수 있게 해줌
    - 주로 서버 사이드 애플리케이션 개발에 사용
    - 모듈(각종 편리한 기능), 파일 시스템(내컴퓨터 문서읽기), HTTP(네트워크)에 필요한 빌트인API 제공
    - 데이터 실시간 처리하여 빈번한 I/O가 발생하는 Single Page Application에 적합
      - I/O : input/output 입출력
    - cpu 사용률이 높은 어플리케이션에는 부적합
      - 단일 스레드의 단점
  - npm(node package manager)
    - Node.js에서 사용할 수 있는 모듈들을 패키지화하여 모아둔 저장소 역할
    - 패키지 관리를 위한 CLI 제공
    - yarn
      - 구 페이스북 현 메타에서 개발한 Node.js 모듈(패키지) 매니저
      - npm 보다 속도, 안정성, 보안성 높음
  - yarn
  - deno
    - 라이언 달 개발
    - rust
- [브라우저 동작 원리](https://poiemaweb.com/js-browser)
  - 동기적으로 파싱됨
- 값
  - 리터럴
    - 숫자
    - 문자열
    - 불리언
    - null
    - undefined
    - 객체
    - 배열
    - 정규표현식
    - 함수
  
    ```js
    // 숫자 리터럴
    10.50
    1001

    // 문자열 리터럴
    'Hello'
    "World"

    // 불리언 리터럴
    true
    false

    // null 리터럴
    null

    // undefined 리터럴
    undefined

    // 객체 리터럴
    { name: 'Lee', gender: 'male' }

    // 배열 리터럴
    [ 1, 2, 3 ]

    // 정규표현식 리터럴
    /ab+c/

    // 함수 리터럴
    function() {}
    ```
    
- 데이터타입
  
  ```js
  // Number
  var num1 = 1001;
  var num2 = 10.50;

  // String
  var string1 = 'Hello';
  var string2 = "World";

  // Boolean
  var bool = true;

  // null
  var foo = null;

  // undefined
  var bar;

  // Object
  var obj = { name: 'Lee', gender: 'male' };

  // Array
  var array = [ 1, 2, 3 ];

  // function
  var foo = function() {};

  // 심볼 key는 이름의 충돌 위험이 없는 유일한 객체의 프로퍼티 키
  var key = Symbol('key');
  console.log(typeof key); // symbol

  var obj = {};
  obj[key] = 'value';
  console.log(obj[key]); // value
  ```

- [연산자](https://poiemaweb.com/js-operator)
- 변수
  - 값의 저장, 참조에 사용
  - var
    - 함수 레벨 스코프(Function-level-scope)
    - var 키워드 생략 허용(전역변수화)
    - 중복 선언 허용
    - 변수 호이스팅
      - 변수 선언하기 전 참조 가능
    - 이제 잘 안씀(ES6 사용하면 쓰지마시오)
  - let
    - ES6에서 도입
    - 변하는 값을 할당할 때 사용
    - 블록 레벨 스코프
      - 대부분의 프로그래밍 언어는 블록 레벨 스코프
      - 
      ```js
      var a = 1;
      let b = 2;

      {
        var a = 11;
        let b = 22;
        let c = 33;
      }

      console.log(a); // 11
      console.log(b); // 2
      console.log(c); // ReferenceError: c is not defined
      ```

    - 변수 중복 선언 안됨
  - const
    - ES6에서 도입
    - 상수(변하지 않는 값)을 할당할 때 사용

    ```js
    const A = 123;

    A = 456; // TypeError: Assignment to constant variable.

    // 선언과 동시에 할당이 이루어져야 함.
    const B; // SyntaxError: Missing initializer in const variable.
    ```

    - 가독성과 유지보수를 위해 적극적으로 활용하면 좋음
    - const와 객체
      - 객체에 대한 참조를 변경할 수 없지만, 프로퍼티는 보호되지 않음

      ```js
      const user = {name: 'lee'};

      user = {age: 9}; // TypeError: Assingment to constant variable.

      user.name = 'kim';

      consoel.log(user.name); // 'kim'
      ```

  - 객체 타입 변수 할당에는 const를 사용하는 것도 좋은 방법
  - [let/const 변수동작 자세히보기](https://poiemaweb.com/es6-block-scope)
- 타입변환
  - 명시적 타입 변환(Exlicit coercion) 또는 타입 캐스팅(Type casting)
  
  ```js
  var x = 10;

  // 명시적 타입 변환
  var str = x.toString(); // 숫자를 문자열로 타입 캐스팅한다.
  console.log(typeof str); // string
  ```

  - 암묵적 타입 변환(Implicit coercion) 또는 타입 강제 변환(Type coercion)

  ```js
  var x = 10;

  // 암묵적 타입 변환
  // 숫자 타입 x의 값을 바탕으로 새로운 문자열 타입의 값을 생성해 표현식을 평가한다.
  var str = x + '';

  console.log(typeof str, str); // string 10

  // 변수 x의 값이 변경된 것은 아니다.
  console.log(x); // 10

  // 표현식이 모두 문자열 타입이여야 하는 컨텍스트
  '10' + 2               // '102'
  `1 * 10 = ${ 1 * 10 }` // "1 * 10 = 10"

  // 표현식이 모두 숫자 타입이여야 하는 컨텍스트
  5 * '10' // 50

  // 표현식이 불리언 타입이여야 하는 컨텍스트
  !0 // true
  if (1) { }

  // 이 외에도 여러가지 알아서 찾아보도록
  ```

- 객체
  - 원시타입을 제외한 모든 것은 객체
  - javascript 객체
    - key와 value로 구성된 프로퍼티(데이터)
    - 함수
  - 객체생성
    - 함수

    ```js
    // 생성자 함수
    function Person(name, gender) {
    this.name = name;
    this.gender = gender;
    this.sayHello = function(){
        console.log('Hi! My name is ' + this.name);
    };
    }

    // 인스턴스의 생성
    var person1 = new Person('Lee', 'male');
    var person2 = new Person('Kim', 'female');

    console.log('person1: ', typeof person1);
    console.log('person2: ', typeof person2);
    console.log('person1: ', person1);
    console.log('person2: ', person2);

    person1.sayHello();
    person2.sayHello();
    ```

    ```js
    function Person(name, gender) {
    var married = true;         // private
    this.name = name;           // public
    this.gender = gender;       // public
    this.sayHello = function(){ // public
        console.log('Hi! My name is ' + this.name);
    };
    }

    var person = new Person('Lee', 'male');

    console.log(typeof person); // object
    console.log(person); // Person { name: 'Lee', gender: 'male', sayHello: [Function] }

    console.log(person.gender);  // 'male'
    console.log(person.married); // undefined
    ```

    this는 생성자 함수가 생성할 인스턴스 가르킴

    - 프로퍼티 값 읽기

    ```js
    var person = {
        name: 'kim',
        'age': 9
    }

    console.log(person.name) // 'kim'
    console.log(person.age) // 9
    console.log(person['age']) // 9

    console.log(person[age]) //  ReferenceError: gender is not defined
    ```

    - 프로퍼티 값 갱신

    ```js
    var person = {
        name: 'kim'
    }

    person[name] = 'lee'    
    // 또는
    // person.name = 'lee'

    console.log(person.name) // 'lee'
    ```

    - 프로퍼티 값 동적 생성

    ```js
    var person = {
        name: 'kim'
    }

    person.age = 9
    // 또는
    // person[age] = 9

    console.log(person.age) // 9
    ```

    - 프로퍼티 값 삭제

    ```js
    var person = {
        name: 'kim'
        age: 9
    }

    delete person.age;
    console.log(person.age) // undefined

    delete person;
    console.log(person) // {name: 'kim'}
    ```

    - 반복문과 프로퍼티

    ```js
    var person = {
        name: 'kim',
        age: 9,
        married: true
    }

    // for...in
    for(var prop in person) {
        console.log(prop + ' : ' + person[prop]);
    }

    // array for...of
    var people = ['kim', 'lee', 'park'];
    for(var index of people) {
        console.log(people[index]);
    }
    ```

  - pass-by-reference 와 pass-by-value
    - 객체는 pass-by-reference
      - 변경 가능(mutable)하기 때문
    - 원시타입은 pass-by-value
      - [변경불가성](https://poiemaweb.com/js-immutability)

- 함수
  - 함수 정의하기
    - 함수 선언문
    - 함수 표현식
    - Function 생성자 함수
  - <details>
    <summary>함수 선언문</summary>

    ```js
        function square(number) {
            return number * number;
        }
    ```

    </details>
  - <details>
    <summary>함수 표현식</summary>

    ```js
        // 익명 함수 표현식
        var square = function (number) {
            return number * number;
        }

        // 기명 함수 표현식(잘 안씀)
        var add = function addFnc(number) {
            return number + 1;
        }
    ```

    </details>
  - <details>
    <summary>Function 생성자 함수</summary>

    ```js
    var square = new Function('number', 'return number * number');
    console.log(square(10)); // 100
    ```

    </details>
    
  - [함수 자세히 알아보기](https://poiemaweb.com/js-function)
- protoType
  - JS는 프로토타입 기반 객체지향 프로그래밍 언어
    - ES6에서 class 추가됨
    - 자바스크립트의 모든 객체는 자신의 부모와 연결되어 있음
  - java는 클래스 기반 객체지향 프로그래밍 언어
  - [protoType 자세히보기](https://poiemaweb.com/js-prototype)
- javascript 스코프(scope)
  - var는 함수 레벨 스코프

  ```js
    var a = 10;     // 전역변수

    (function () {
    var b = 20;   // 지역변수
    })();

    console.log(a); // 10
    console.log(b); // "b" is not defined
  ```

  - 렉시컬 스코프

  ```js
    var x = 1;

    function foo() {
    var x = 10;
    bar();
    }

    function bar() {
    console.log(x);
    }

    foo(); // ?
    bar(); // ?

    // 정답은
    // 1
    // 1

    // 렉시컬 스코프는 함수를 어디서 호출하는지가 아니라 어디에 선언하였는지에 따라 결정된다
    // 반대는 정적 스코프
  ```

- [strict 모드](https://poiemaweb.com/js-strict-mode)
- [this](https://poiemaweb.com/js-this)
- [closure 클로저](https://poiemaweb.com/js-closure)
  - 함수가 선언됐을 때 렉시컬 환경

    ```js
    function outerFunc() {
        var x = 10;
        var innerFunc = function () { console.log(x); };
        innerFunc();
    }

    outerFunc(); // 10
    ```

  - 자신을 포함하고 있는 외부함수보다 내부함수가 더 오래 유지되는 경우, 외부 함수 밖에서 내부함수가 호출되더라도 외부함수의 지역 변수에 접근할 수 있는데 이러한 함수를 클로저(Closure)라고 부름</br>
  ==> 자신이 생성될 때의 환경(Lexical environment)을 기억하는 함수

  - [js로 객체지향프로그래밍 하기](https://poiemaweb.com/js-object-oriented-programming)
  - 빌트인 객체
    - Native object
      - Object, String, Number, Function, Array, RegExp, Date, Math... 
    - Host object
      - [전역객체](https://poiemaweb.com/js-global-object) : window
        - BOM(Browser Object Model)
          - document
          - history
          - location
          - navigator
          - screen
        - DOM(Document Object Model)
          - < html >
            - < head >
            - < body >
              - ...
      - XMLHttpRequest, fetch (ajax)
      - HTML5 APIs : Blob, File, Canvas, Ceolocaion, Drag&Drop, Web storage ...
    - User-defined object
- [Event](https://poiemaweb.com/js-event)
  - this

  ```html
    <!DOCTYPE html>
    <html>
    <body>
    <button onclick="foo()">Button</button>
    <script>
        // 인라인 이벤트 핸들러 방식의 경우,
        // 이벤트 핸들러는 일반 함수로서 호출되므로
        // 이벤트 핸들러 내부의 this는 전역 객체 window를 가리킨다.

        function foo () {
            console.log(this); // window
        }
    </script>
    </body>
    </html>
  ```

  ```html
  <!DOCTYPE html>
    <html>
    <body>
    <button class="btn">Button</button>
    <script>
        // 이벤트 핸들러는 메소드이므로
        // 이벤트 핸들러 내부의 this는 이벤트에 바인딩된 요소를 가리킨다

        const btn = document.querySelector('.btn');

        btn.onclick = function (e) {
            console.log(this); // <button id="btn">Button</button>
            console.log(e.currentTarget); // <button id="btn">Button</button>
            console.log(this === e.currentTarget); // true
        };
    </script>
    </body>
    </html>
  ```

- [비동기식 처리 모델과 ajax](https://poiemaweb.com/js-ajax)
  - JSON
    - JSON.stringify
    - JSON.parse
  - ajax request
    - XMLHttpRequest - 생략
    - fetch
  - REST API
    - HTTP Method
      - GET : 모든/특정 리소스를 조회
      - POST : 리소스를 생성
      - PUT : 리소스의 전체를 교체
      - PATCH : 리소스의 일부를 수정
      - DELETE : 모든/리소스를 삭제
    - REST API의 구성
      - 
      |구성요소|내용|표현방법|
      |---|---|---|
      |Resource|자원|HTTP URI|
      |Verb|자원에 대한 행위|HTTP Method|
      |Representations|자원에 대한 행위의 내용|HTTP Message Pay Load|
- SPA(Single Page Application)
  - 모던 웹 패러다임
  - 배포가 간단
  - 네이티브 앱과 유사한 사용자경험
    - 새로고침 없이
    - 모바일 퍼스트
  - 단일 페이지이므로 최초 한번만 다운로드
  - 초기구동속도 낮음, SEO(검색엔진 최적화) 이슈
  - Routing
    - SPA 페이지 전환
- ES6 추가본
  - 템플릿 리터럴
    - ```js
      const A = 21;

      console.log(`he is ${A} years old.`); // he is 21 years old.
      ```
  - Arrow Function(화살표 함수)
    - function 키워드 대체제
    - ```js
      // ES5
      var fnc = function(x) {
        return x * x;
      }
      console.log(fnc(10)); // 100

      // ES6
      const arrowFnc = (x) => {
        return x * x;
      }
      console.log(arrowFnc(10)); // 100
      
      const arrowFnc2 = (x) => x * x; // return 생략 시
      ```
    - [Arrow Function과 this 키워드](https://poiemaweb.com/es6-arrow-function#3-this)
    - 사용을 피해야할 경우
      - 메소드(객체 안 함수)
        ```js
        const person = {
          name: 'lee',
          sayHi: () => console.log(`Hi ${this.name}`),
          sayHello: () {
            console.log(`Hello ${this.name}`);
          }
        };

        person.sayHi(); // Hi undefined
        // 화살표 함수 내부의 this는 메소드를 보유한 객체의 상위 컨텍스트인 전역 객체 window를 가르킴
        person.sayHello(); // Hello lee
        ```
      - protoType 할당
        - Arrow Function은 protoType 프로퍼티를 가지고 있지 않음.
      - 생성자 함수
        - protoType이 없어 constructor() 사용 불가
      - addEventListener 함수의 콜백 함수
        ```js
        // Bad
        var button = document.getElementById('myButton');

        button.addEventListener('click', () => {
          console.log(this === window); // => true
          this.innerHTML = 'Clicked button';
        });

        // Good
        var button = document.getElementById('myButton');

        button.addEventListener('click', function() {
          console.log(this === button); // => true
          this.innerHTML = 'Clicked button';
        });
        ```
  - Default Parameter Value (매개변수 기본값)
    ```js
    function sum(x, y) {
      return x + y;
    }

    console.log(sum(1,2)) // 3
    console.log(sum(2))   // NaN
    
    // 깔끔하게 parameter 체크 해결하기
    function sumSetDefault(x = 0, y = 0) {
      return x + y;
    }
    console.log(sumSetDefault(1, 2)) // 3
    console.log(sumSetDefault(2))    // 2
    // parameter가 없을 경우만 0 으로 적용

    ```
    ```js
    // 매개변수 기본값은 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 length 프로퍼티와 arguments 객체에 영향을 주지 않는다.
    function foo(x, y = 0) {
      console.log(arguments);
    }

    console.log(foo.length); // 1

    sum(1);    // Arguments { '0': 1 }
    sum(1, 2); // Arguments { '0': 1, '1': 2 }
    ```
  - rest parameter
    ```js
    function check(...rest) {
      console.log(Array.isArray(rest));
      console.log(...rest);
    }

    check(1, 2, 3); // true
                    // [1, 2, 3]

    function check2(param1, param2, ...rest) {
      console.log(param1);
      console.log(param2);
      console.log(rest);
    }

    check2(1, 2, 3, 4, 5); // 1
                           // 2
                           // [3, 4, 5]

    // ...rest는 항상 끝에 사용
    function check3(...rest, param1) {
      console.log(rest);
      console.log(param1);
    }

    check3(1, 2, 3); // SyntaxError: Rest parameter must be last formal parameter
    ```
  - spread
    ```js
    // Spread 문법의 대상은 이터러블이어야 한다.
    // ...[1, 2, 3]는 [1, 2, 3]을 개별 요소로 분리한다(→ 1, 2, 3)
    console.log(...[1, 2, 3]) // 1, 2, 3

    // 문자열은 이터러블이다.
    console.log(...'Hello');  // H e l l o

    // Map과 Set은 이터러블이다.
    console.log(...new Map([['a', '1'], ['b', '2']]));  // [ 'a', '1' ] [ 'b', '2' ]
    console.log(...new Set([1, 2, 3]));  // 1 2 3

    // 이터러블이 아닌 일반 객체는 Spread 문법의 대상이 될 수 없다.
    console.log(...{ a: 1, b: 2 });
    // TypeError: Found non-callable @@iterator
    ```
    ```js
    // ES6
    function foo(x, y, z) {
      console.log(x); // 1
      console.log(y); // 2
      console.log(z); // 3
    }

    // 배열을 foo 함수의 인자로 전달하려고 한다.
    const arr = [1, 2, 3];

    /* ...[1, 2, 3]는 [1, 2, 3]을 개별 요소로 분리한다(→ 1, 2, 3)
      spread 문법에 의해 분리된 배열의 요소는 개별적인 인자로서 각각의 매개변수에 전달된다. */
    foo(...arr);

    ```
    - 배열과 spread
      ```js
      // concat
      const arr = [1, 2, 3];
      // ...arr은 [1, 2, 3]을 개별 요소로 분리한다
      console.log([...arr, 4, 5, 6]); // [ 1, 2, 3, 4, 5, 6 ]

      const arr1 = [1, 2, 3];
      const arr2 = [4, 5, 6];

      // ...arr2는 [4, 5, 6]을 개별 요소로 분리한다
      arr1.push(...arr2); // == arr1.push(4, 5, 6);

      console.log(arr1); // [ 1, 2, 3, 4, 5, 6 ]

      // splice
      const arr1 = [1, 2, 3, 6];
      const arr2 = [4, 5];

      // ...arr2는 [4, 5]을 개별 요소로 분리한다
      arr1.splice(3, 0, ...arr2); // == arr1.splice(3, 0, 4, 5);

      console.log(arr1); // [ 1, 2, 3, 4, 5, 6 ]

      // 배열 복사하기, 얕은 복사
      const arr = [1, 2, 3];
      // ...arr은 [1, 2, 3]을 개별 요소로 분리한다
      const copy = [...arr];

      console.log(copy); // [ 1, 2, 3 ]

      // copy를 변경한다.
      copy.push(4);

      console.log(copy); // [ 1, 2, 3, 4 ]
      // arr은 변경되지 않는다.
      console.log(arr);  // [ 1, 2, 3 ]
      ```
      - [얕은 복사 vs 깊은 복사](https://velog.io/@th0566/Javascript-%EC%96%95%EC%9D%80-%EB%B3%B5%EC%82%AC-%EA%B9%8A%EC%9D%80-%EB%B3%B5%EC%82%AC)
        - Shllow Copy (얕은 복사)
          - Object.assign()
          - 전개연산자(spread)
        - Deep Copy (깊은 복사)
          - 재귀함수를 이용한 복사
          - JSON.stringify()
            - JSON 객체를 이용한 깊은복사는 의도하지 않은 결과를 불러올 수 있습니다.<br/>
              JSON에서 사용 가능한 자료형은 number, string, boolean, object, array, null 입니다.<br/>
              객체의 프로퍼티의 타입이 function일때 JSON.stringify를 쓸 때 undefined로 변환이이 되고, NaN은 null로 변환이 이루어집니다. 마찬가지로 다른 타입의 자료들도 변환이 되기때문에 유의해야합니다
          - 라이브러리(lodash)
    - 프로퍼티 축약 표현
      ```js
      let x = 1, y = 2;

      const obj = { x, y };

      console.log(obj); // { x: 1, y: 2 }
      ```
    -  