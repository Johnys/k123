class Utils{
  static bindCatch(promise, done){
    return promise.catch((err) => {
      done(err);
    });
  }

  static bind(promise, done, success){
    return Utils.bindCatch(promise, done)
      .then(success).then(() => done());
  }

  static promiseWithError(){
    return new Promise((resolve, reject) => {
      reject(new Error('Fake error'));
    });
  }
}

export default Utils;
