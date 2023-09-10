
export const catchAsyncError = (passedFunction) => (req, resp, next) => {
    Promise.resolve(passedFunction(req, resp, next)).catch(next)
}