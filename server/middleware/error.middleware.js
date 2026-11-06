

export function handleErrorFallback (req, res, next) {
  const err = new Error('Invalid URL request')
  err.status = 400 
  next(err)
}

export function handleFinalError (err, req, res, next) {
  if (err.name === 'CastError') {
    err.status = 400
    err.message = `Invalid ID in url Request: ${err.value}`
  }

  const status = err.status || 500 
  console.log(err)

  res.status(status).json({
    error: true,
    name: err.name,
    status,
    type: status === 500 ? 'Internal Server Error' : 'Client Error',
    message: err.message,
  })

  void req
  void res
  void next

}