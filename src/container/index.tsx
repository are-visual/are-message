import React, {
  useReducer,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react'
import FlipMove from 'react-flip-move'
import MessageHolder from '../message/message-holder'
import useGenId from '../hooks/use-id'
import timeout from '../helper/timeout'
import { getDuration, getPrefixCls } from '../config'
import { MessageRef } from '../types/message-ref'
import reducer, { addAction, removeAction, clearAction } from './reducer'
import Message from '../message'

import { isTruthy } from '../types/types'
import { MessageKey } from '../types/message-shape'

const enterAnimation = {
  from: { transform: 'translate3d(0, -30px, 0)', opacity: '0' },
  to: { transform: 'translate3d(0, 0, 0)', opacity: '1' },
}

const leaveAnimation = {
  from: { transform: 'translate3d(0, 0, 0)', opacity: '1' },
  to: { transform: 'translate3d(0, -30px, 0)', opacity: '0' },
}

const MessageContainer = forwardRef<MessageRef>((props, ref) => {
  const [message, dispatch] = useReducer(reducer, [])

  const genId = useGenId()

  const beforeUpdate = useCallback(
    (key: MessageKey) => {
      const index = message.findIndex((item) => item.key === key)
      if (index > -1) {
        /** 更新 Message 时，清理原来的定时器 */
        const { timerId } = message[index]
        clearTimeout(timerId)
      }
    },
    [message],
  )

  const clearMessage = useCallback(() => {
    message.forEach((item) => {
      clearTimeout(item.timerId)
    })
    dispatch(clearAction())
  }, [message])

  const removeMessage: MessageRef['remove'] = useCallback((id) => {
    dispatch(removeAction(id))
  }, [])

  const addMessage: MessageRef['add'] = useCallback(
    (params, callback) => {
      const { duration: rawDuration, onClose: close } = params
      const duration = isTruthy<number>(rawDuration)
        ? rawDuration
        : getDuration()
      const key = genId(params.key)

      beforeUpdate(key)
      const timerId =
        duration === 0 ? undefined : timeout(() => removeMessage(key), duration)
      dispatch(
        addAction({
          ...params,
          duration,
          key,
          timerId,
          forwardCallback: callback,
          onClose: () => {
            window.clearTimeout(timerId)
            close?.()
          },
        }),
      )
    },
    [genId, removeMessage, beforeUpdate],
  )

  useImperativeHandle(
    ref,
    () => ({
      add: addMessage,
      remove: removeMessage,
      clear: clearMessage,
      createId: genId,
    }),
    [addMessage, removeMessage, clearMessage, genId],
  )

  return (
    <FlipMove
      enterAnimation={enterAnimation}
      leaveAnimation={leaveAnimation}
      duration={200}
      staggerDelayBy={20}
      typeName={null}
    >
      {message.map((item) => {
        const prefixCls = getPrefixCls()
        const { key, content, onClose, forwardCallback, ...otherProps } = item
        if (typeof forwardCallback === 'function') {
          return (
            <div key={key}>
              <MessageHolder
                prefixCls={prefixCls}
                onClose={onClose}
                ref={(node) => {
                  if (node) {
                    forwardCallback(node, {
                      key,
                      children: content,
                      className: item.className,
                      style: item.style,
                      prefixCls,
                    })
                  }
                }}
              />
            </div>
          )
        }

        return (
          <MessageHolder prefixCls={prefixCls} onClose={onClose} key={key}>
            <Message prefixCls={prefixCls} {...otherProps}>
              {content}
            </Message>
          </MessageHolder>
        )
      })}
    </FlipMove>
  )
})

MessageContainer.displayName = 'MessageContainer'

export default MessageContainer
