import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Button, Card, Typography, Box } from '@material-ui/core'
import { useStyles } from './styles'

const Message = ({ message, priority, index, onClearMessage }) => {
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

Message.propTypes = {
  message: PropTypes.string.isRequired,
  priority: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  index: PropTypes.number.isRequired,
  onClearMessage: PropTypes.func.isRequired
}

export default Message
