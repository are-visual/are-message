import React, { useCallback, PropsWithChildren } from 'react'
import classNames from 'classnames'
import ReactDOM from 'react-dom'
import { isTruthy } from '../types/types'

export type MessageProps = PropsWithChildren<{
  /**
   * 设置类名
   */
  className?: string
  /**
   * 设置行内样式
   */
  style?: React.CSSProperties
  /**
   * 类名前缀
   */
  prefixCls?: string
  /**
   * 目标渲染容器
   */
  holder?: HTMLElement
}>

const Message: React.VFC<MessageProps> = (props) => {
  const { prefixCls, className, style, holder, children } = props

  const createClassName = useCallback(
    (value: string) => {
      if (isTruthy<string>(prefixCls)) {
        return `${prefixCls}-${value}`
      }
      return value
    },
    [prefixCls],
  )

  const messageNode = (
    <div
      className={classNames(createClassName('item'), className)}
      style={style}
    >
      {children}
    </div>
  )

  if (holder instanceof HTMLElement) {
    return ReactDOM.createPortal(messageNode, holder)
  }

  return messageNode
}

export default Message
