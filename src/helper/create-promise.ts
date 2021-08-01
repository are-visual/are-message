export interface ThenableArgument {
  (val: any): void
}

const createPromise = () => {
  let promiseResolve: (value?: unknown) => void = () => {}

  const promise = new Promise((resolve) => {
    promiseResolve = resolve
  })

  return { resolve: promiseResolve, instance: promise }
}

export default createPromise
