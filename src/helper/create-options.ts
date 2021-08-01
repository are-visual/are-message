import { ContentOrOptions } from '@/types/api-shape'
import { MessageRef } from '@/types/message-ref'
import { MessageOptions, PropsWithMsgKey } from '@/types/message-shape'
import { isPlainObject } from 'lodash-es'
import React from 'react'

type OtherOptions = Omit<MessageOptions, 'content' | 'duration'>

function createOptions(
  instance: MessageRef,
  value: ContentOrOptions,
  duration?: number,
  options?: OtherOptions,
): PropsWithMsgKey<MessageOptions> {
  let params: MessageOptions = {
    content: '',
  }
  if (
    React.isValidElement(value) ||
    typeof value === 'number' ||
    typeof value === 'string'
  ) {
    params = {
      ...options,
      content: value,
      duration,
      key: instance.createId(options?.key),
    }
  } else if (isPlainObject(value)) {
    params = {
      ...(value as MessageOptions),
      key: instance.createId((value as MessageOptions)?.key),
    }
  }
  return params as PropsWithMsgKey<MessageOptions>
}

export default createOptions
