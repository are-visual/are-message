import React, { useMemo, useState } from 'react'
import createInstance from '../helper/create-instance'
import createOptions from '../helper/create-options'
import Message from '../message'
import { MessageKey } from '../types/message-shape'
import createPromise from '../helper/create-promise'
import { MessageApiShape } from '../types/api-shape'

type MessageHook = [MessageApiShape, React.ReactNode]

export interface ThenableArgument {
  (val: any): void
}

/**
 * 提供一个保存在当前上下文中的 message hook
 */
function useMessage(): MessageHook {
  const [elements, setElements] = useState(
    () => new Map<MessageKey, React.ReactElement>(),
  )

  const holder = useMemo(() => [...elements.values()], [elements])

  const messageHook = useMemo(() => {
    const msg: MessageApiShape = {
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
            setElements((el) => {
              const list = new Map(el)
              list.delete(currentKey)
              return list
            })
          }
          instance.add(params, (container, props) => {
            const message = <Message {...props} holder={container} />
            setElements((el) => {
              const list = new Map(el)
              list.set(props.key, message)
              return list
            })
          })
        })
        return result
      },
      destroy: (key) => {
        createInstance((instance) => {
          instance.remove(key)
        })
        return msg
      },
      clearAll: () => {
        createInstance((instance) => {
          instance.clear()
        })
        return msg
      },
    }
    return msg
  }, [])

  return [messageHook, <>{holder}</>]
}

export { useMessage }
