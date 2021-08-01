import createInstance from '../helper/create-instance'
import { MessageApiShape } from '../types/api-shape'
import { MessageKey } from '../types/message-shape'
import createOptions from '../helper/create-options'
import createPromise from '../helper/create-promise'

export interface ThenableArgument {
  (val: any): void
}

const message: MessageApiShape = {
  open: (value, duration, options) => {
    let currentKey: MessageKey
    const promise = createPromise()
    const result: any = () => {
      createInstance((instance) => {
        instance.remove(currentKey)
      })
    }
    result.then = (resolve: ThenableArgument, reject: ThenableArgument) => {
      return promise.instance.then(resolve, reject)
    }
    createInstance((instance) => {
      const params = createOptions(instance, value, duration, options)
      const { onClose, key } = params
      currentKey = key
      params.onClose = () => {
        promise.resolve()
        onClose?.()
      }
      instance.add(params)
    })
    return result
  },
  destroy: (key: MessageKey) => {
    createInstance((instance) => {
      instance.remove(key)
    })
    return message
  },
  clearAll: () => {
    createInstance((instance) => {
      instance.clear()
    })
    return message
  },
}

export default message
