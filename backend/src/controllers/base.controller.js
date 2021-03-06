class BaseController {
  filterParams(params, whitelist) {
    const filtered = {};
    Object.keys(params).map((key) => {
      if (whitelist.indexOf(key) > -1) {
        filtered[key] = params[key];
      }
    });
    return filtered;
  }

  formatApiError(err) {
    if (!err) {
      throw new Error('Provide an error');
    }
    const formatted = { error: true };

    if (err.message) {
      formatted.message = err.message;
    }

    if (err.errors) {
      formatted.errors = {};
      Object.keys(err.errors).map((type) => {
        formatted.errors[type] = {
          message: err.errors[type].message,
          type: err.errors[type].kind,
        };
      });
    }
    return formatted;
  }

  processResponseModel(res, models, resultEmpty = []) {
    if (models.docs) {
      const docs = models.docs.map(doc => doc.toJSON());
      models.docs = docs;
      res.json(models);
    } else if (models instanceof Array) {
      res.json(models.map(model => model.toJSON()));
    } else {
      res.json(models ? (models.toJSON() || resultEmpty) : resultEmpty);
    }
  }

  bindResultModel(promise, res, then = null) {
    if (then) {
      promise.then(then);
    }
    promise.then((result) => {
      this.processResponseModel(res, result, []);
    }).catch((err) => {
      res.json(this.formatApiError(err));
    });
  }

  makeRegexFilter(query, fields = []) {
    const newQuery = { $or: [] };
    Object.keys(query).map((key) => {
      if (fields.length === 0 || fields.indexOf(key) >= 0) {
        newQuery.$or.push({ [key]: new RegExp(`.*${query[key]}.*`, 'i') });
      } else {
        newQuery[key] = query[key];
      }
    });
    if (newQuery.$or.length === 0) {
      delete newQuery.$or;
    }
    return newQuery;
  }
}

export default BaseController;
