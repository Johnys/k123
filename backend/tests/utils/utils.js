class Utils{
  static bindCatch(promise, done){
    return promise.catch((err) => {
      done(err);
    });
  }

  static bind(promise, done, success){
    promise = Utils.bindCatch(promise, done)
    if (success) promise.then(success);
    promise.then(() => done());
  }

  static promiseWithError(){
    return new Promise((resolve, reject) => {
      reject(new Error('Fake error'));
    });
  }
}

export default Utils;
