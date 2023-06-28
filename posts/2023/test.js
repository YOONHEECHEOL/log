// function step1(param) {
//     return param(1);
// }
// function step2(param, fnc) {
//     console.log('step1');
//     return fnc(param);
// }
// function step3(param, fnc) {
//     console.log('step2');
//     return fnc(param);
// }
// function step4(param, fnc) {
//     console.log('step3');
//     return fnc(param);
// }
// function step5(param, fnc) {
//     console.log('step4');
//     return fnc(param);
// }

// step1(function (value1) {
//     value1 + 1;
//     step2(value1, function (value2) {
//         value2 = value2 + 1;
//         step3(value2, function (value3) {
//             value3 = value3 + 1;
//             step4(value3, function (value4) {
//                 value4 = value4 + 1;
//                 step5(value4, function (value5) {
//                     value5 = value5 + 1;
//                     // value5를 사용하는 처리
//                     console.log(value5);
//                 });
//             });
//         });
//     });
// });

// async function fnc() {
//     return 1;
// }

// console.log()

async function f() {

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("완료!"), 1000)
    });

    console.log('실행될까요1?'); // 1초뒤 출력됨
    let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)

    console.log('실행될까요2?'); // 1초뒤 출력됨
    console.log(result); // "완료!"
}

f();