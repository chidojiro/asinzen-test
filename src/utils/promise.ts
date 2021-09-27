const sleep = (timeAmount: number) => {
  return new Promise(res => {
    setTimeout(() => {
      res(null)
    }, timeAmount)
  })
}

const PromiseUtils = { sleep }

export default PromiseUtils
