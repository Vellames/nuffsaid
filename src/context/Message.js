import React, { createContext, useContext, useState } from 'react'
import { Consts } from '../utils/consts';

export const initialMessagesState = {
  [Consts.PRIORITY.ERROR]: [],
  [Consts.PRIORITY.WARNING]: [],
  [Consts.PRIORITY.INFO]: []
}

const MessageContext = createContext()

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState(initialMessagesState);
  const [isApiStarted, setIsApiStarted] = useState(false)
  const [isSnackBarOpen, setSnackBarOpen] = useState(false);
  const [lastErrorMessage, setLastErrorMessage] = useState()

  const values = {
    messages, setMessages,
    isApiStarted, setIsApiStarted,
    isSnackBarOpen, setSnackBarOpen,
    lastErrorMessage, setLastErrorMessage
  }
  return (
    <MessageContext.Provider value={values}>
      { children }
    </MessageContext.Provider>
  )
}

export const useMessages = () => {
  const context = useContext(MessageContext)
  if (!context) {
    throw new Error('MessageProvider was not found')
  }

  return context
}