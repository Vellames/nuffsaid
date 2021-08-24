import React from 'react'
import classNames from 'classnames'
import { Button, Card, Typography, Box } from '@material-ui/core'
import { useStyles } from './styles';

export const Message = ({ message, priority, index, onClearMessage }) => {
  const priorityClasses = {
    1: 'errorMessage',
    2: 'warningMessage',
    3: 'infoMessage'
  }
  const classes = useStyles()
  return (
    <Card className={classNames(classes[priorityClasses[priority]], classes.root)} data-testid='MessageComponent'>
      <Typography>{ message }</Typography>
      <Box display="flex" flexDirection="row-reverse">
        <Button
          onClick={() => onClearMessage(priority, index)}
          data-testid={`message-clear-button-${priority}-${index}`}
        >
          Clear
        </Button>
      </Box>
    </Card>
  )
}