class ResponseHandler {
  static success(res, message = 'Success', data = {}, statusCode = 200) {
    const response = {
      statusCode,
      message,
      data,
    };

    if (res.locals.token) {
      response.token = res.locals.token; 
    }

    return res.status(statusCode).json(response);
  }

  static fail(res, message = 'Fail', data = {}, statusCode = 400) {
    const response = {
      statusCode,
      message,
      data,
    };

    return res.status(statusCode).json(response);
  }

  static error(res, error = {}, message = 'Internal Server Error', statusCode = 500) {
    const response = {
      statusCode,
      message,
      data: {
        error: error?.message || error || 'Unknown error',
      },
    };

    return res.status(statusCode).json(response);
  }
}

export default ResponseHandler;
