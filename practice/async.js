// Promies Example
const promise = new Promise(function (resolve, reject) {
    const x = 'This should succeed'
    if (x === 'This should succeed') {
        resolve()
    } else {
        reject()
    }
});

promise
.then(function () {
    console.log("Success");
})
.catch(function () {
    console.log("Fail");
});

// Asyn/Await Example
const awaitPromise = function () {
    const promise = new Promise(function (resolve, reject) {
        const x = 'This should succeed'
        if (x === 'This should succeed') {
            resolve("Success");
        } else {
            reject("Fail");
        }
});

return promise;
};

async function demoPromise() {
    try {
      let message = await awaitPromise();
      console.log(message);
    } catch (err) {
      console.log(err);
    }
}