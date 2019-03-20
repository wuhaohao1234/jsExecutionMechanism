console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
    Promise.resolve(1).then((a) => {
        console.log(a+'setTimeout里面的promise')
    })
}, 0);

new Promise((resolve,reject) => {
    console.log('promise执行')
    resolve(1)
}).then((resolve) => {
    console.log(resolve + '第一次.then')
}).then(() => {
    console.log('第二次.then')
})

console.log('script end');