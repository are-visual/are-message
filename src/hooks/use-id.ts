import { useCallback, useRef } from 'react'
import { MessageKey } from '../types/message-shape'
import { isTruthy } from '../types/types'

function genId(value?: MessageKey) {
  if (isTruthy<MessageKey>(value)) {
    return value
  }
  return null
}

export default function useGenId() {
  const index = useRef(0)

  const gen = useCallback((value?: MessageKey) => {
    index.current += 1
    const id = genId(value) || index.current
    return id
  }, [])

  return gen
}
