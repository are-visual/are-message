import { messageConfig } from './config/set'
import msg from './function'

export const message = { ...msg, config: messageConfig }
export { useMessage } from './hooks/use-message'
