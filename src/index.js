import React from 'react'
import ReactDOM from 'react-dom'
import { MessagesPage } from './pages/messages'
import { ThemeProvider } from '@material-ui/core'
import { theme } from './theme'
import { MessageProvider } from './context/Message'



ReactDOM.render(
  <ThemeProvider theme={theme}>
    <MessageProvider>
      <MessagesPage />
    </MessageProvider>
  </ThemeProvider>
  ,
  document.getElementById('root'))
;
