class ResponseError extends Error {
  constructor(status, message) {
    super(message);
  }
}
class rResponseError extends Error {
  constructor(status, message) {
    super(message);
  }
}

export { ResponseError, rResponseError };
