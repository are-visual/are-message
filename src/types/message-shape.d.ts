import React from 'react'
import { MessageProps } from '../message'

export type MessageKey = React.Key

export type PropsWithMsgKey<T> = T & {
  /**
   * 唯一标识符
   */
  key: MessageKey
}

/**
 * 节点渲染回调函数
 */
export type ForwardCallback = (
  element: HTMLElement,
  props: PropsWithMsgKey<MessageProps>,
) => void

/**
 * message props
 */
export interface MessageOptions extends MessageProps {
  /**
   * 唯一标识符
   */
  key?: MessageKey
  /**
   * 提示消息内容
   */
  content: React.ReactNode
  /**
   * 显示时长
   */
  duration?: number
  /**
   * 关闭时触发的回调函数
   */
  onClose?: () => void
}

/**
 * 单条 message 数据
 */
export type MessageShape = PropsWithMsgKey<MessageOptions> & {
  /**
   * @private clear timeoutId
   * 内部使用，记录定时器 id
   */
  timerId?: number
  /**
   * @private
   * 内部使用，节点渲染容器
   */
  forwardCallback?: ForwardCallback
}
