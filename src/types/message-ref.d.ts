import { MessageOptions, MessageId, ForwardCallback } from './message-shape'

export interface MessageCloseFunc extends PromiseLike<unknown> {
  (): () => void
}

export interface MessageRef {
  add: (params: MessageOptions, callback?: ForwardCallback) => void
  remove: (id: MessageId) => void
  clear: () => void
  createId: (value?: MessageId) => MessageId
}
