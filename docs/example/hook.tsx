import React from 'react'
import { useMessage } from 'are-message'
import '../../assets/index.less'

const Context = React.createContext('default')
const { Provider, Consumer } = Context

const key = 'HOOK_LOADING_MESSAGE_KEY'

const HookDemo = () => {
  const [msg, MessageHolder] = useMessage()
  const showHookMessage = () => {
    msg.open(<Consumer>{(value) => value}</Consumer>)
  }
  const manualShutdown = () => {
    const close = msg.open('Hook Message can be closed manually.', 0)
    setTimeout(close, 1000)
  }
  const clearAllMessage = () => {
    msg.clearAll()
  }
  const hookUpdate = () => {
    msg.open({
      key,
      content: 'Hook Loading...',
      duration: 0,
    })

    // update
    setTimeout(() => {
      msg.open({
        key,
        content: 'Hook Loaded!',
        duration: 300,
      })
    }, 2000)
  }
  const chain = () => {
    msg
      .open('Hook First message.')
      .then(() => {
        return msg.open({
          content: (
            <p
              style={{
                margin: 0,
                textTransform: 'uppercase',
                fontWeight: 'bold',
                color: '#f00',
              }}
            >
              Hook Second message.
            </p>
          ),
          duration: 2000,
        })
      })
      .then(() => {
        msg.open('Hook Promise chain call completed :)', 2000)
      })
  }

  return (
    <Provider value="This's the message from the hook.">
      <button onClick={showHookMessage}>Hook Message</button>
      <button onClick={manualShutdown}>Manual shutdown</button>
      <button onClick={hookUpdate}>Hook Update</button>
      <button onClick={chain}>Hook Promise</button>
      <button onClick={clearAllMessage}>Hook ClearAll</button>
      {MessageHolder}
    </Provider>
  )
}

export default HookDemo
