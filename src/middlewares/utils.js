/**
 * Removes extension from file
 * @param {string} file - filename
 */
exports.removeExtensionFromFile = file => {
    return file
        .split('.')
        .slice(0, -1)
        .join('.')
        .toString()
}
exports.buildErrObject = (code, message) => {
    return {
        code,
        message
    }
}
exports.buildSuccObject = message => {
    return {
        msg: message
    }
}
exports.itemNotFound = (err, item, reject, message) => {
    if (err) {
        reject(this.buildErrObject(422, err.message))
        // reject(this.buildErrObject(422, err))
    }
    if (!item) {
        reject(this.buildErrObject(404, message))
    }
}
/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
exports.handleError = (res, err) => {
    // Prints error in console
    if (process.env.NODE_ENV === 'development') {
      console.log(err)
    }
    // Sends error to user
    res.status(err.code).json({
      errors: {
        msg: err.message
      }
    })
  }
