import { useUnmount } from 'ahooks'
import classNames from 'classnames'
import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
  PropsWithChildren,
} from 'react'
import { isTruthy } from '../types/types'

type Ref = HTMLDivElement | null

export type MessageHolderProps = PropsWithChildren<{
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
   * 关闭时触发的回调函数
   */
  onClose?: () => void
}>

const MessageHolder = forwardRef<Ref, MessageHolderProps>((props, ref) => {
  const { prefixCls, className, style, children, onClose } = props
  const node = useRef<HTMLDivElement | null>(null)

  useUnmount(onClose)

  useImperativeHandle<Ref, Ref>(ref, () => node.current, [])

  const createClassName = useCallback(
    (value: string) => {
      if (isTruthy<string>(prefixCls)) {
        return `${prefixCls}-${value}`
      }
      return value
    },
    [prefixCls],
  )

  return (
    <div
      className={classNames(createClassName('item-wrap'), className)}
      style={style}
      ref={node}
    >
      {children}
    </div>
  )
})

MessageHolder.displayName = 'MessageHolder'

export default MessageHolder
