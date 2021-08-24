import React, { Component, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Api from '../api'

export const MessageList = () => {
  const [messages, setMessages] = useState([])
  const messageCallback = (message) => {
    console.log(message)
  }
  const api = new Api({ messageCallback })

  const renderButton = () => {
    const isApiStarted = api.isStarted()
    return (
      <Button
        variant="contained"
        onClick={() => {
          if (isApiStarted) {
            api.stop()
          } else {
            api.start()
          }
        }}
      >
        {isApiStarted ? 'Stop Messages' : 'Start Messages'}
      </Button>
    )
  }

  useEffect(() => {
    api.start()
  }, [])

  return renderButton()
}
