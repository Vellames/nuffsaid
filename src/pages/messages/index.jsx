import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Api from '../../api'
import { MessagesPageContainer } from './container'

import { initialMessagesState, useMessages } from '../../context/Message' 
import { Consts } from '../../utils/consts'

export const MessagesPage = () => {
  const {
    messages, setMessages,
    isApiStarted, setIsApiStarted,
    setSnackBarOpen,
    setLastErrorMessage
  }  = useMessages()

  const messageCallback = useCallback((message) => {
    if (message.priority === Consts.PRIORITY.ERROR) {
      setSnackBarOpen(true)
      setLastErrorMessage(message.message)
    }
    setMessages((prevValue) => ({
      ...prevValue,
      [message.priority]: [[message.message], ...prevValue[message.priority]]
    }))
  }, [setMessages]);
  const api = useMemo(() => new Api({ messageCallback }), []);

  const onClearMessage = (priority, index) => {
    setMessages({
      ...messages,
      [priority]: messages[priority].filter((_, i) => i !== index)
    })
  }

  const onClearMessagesClicked = () => {
    setMessages(initialMessagesState)
  }

  const onChangeApiStatusClicked = () => {
    if (isApiStarted) {
      api.stop()
    } else {
      api.start()
    }

    setIsApiStarted(!isApiStarted)
  }

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
  }
  
  useEffect(() => {
    api.start()
    setIsApiStarted(true)
  }, [])

  return (
    <MessagesPageContainer
      onClearMessage={onClearMessage}
      onClearMessagesClicked={onClearMessagesClicked}
      onChangeApiStatusClicked={onChangeApiStatusClicked}
      handleSnackBarClose={handleSnackBarClose}
    />
  )
}