import React, { useState, useEffect } from 'react'
import Api from '../../api'
import { MessagesPageContainer } from './container'

export const MessagesPage = () => {
  const [messages, setMessages] = useState([])
  const messageCallback = (message) => {
    console.log(message)
  }
  const api = new Api({ messageCallback })

  useEffect(() => {
    api.start()
  }, [])

  return (
    <MessagesPageContainer />
  )
}