import React from 'react'
import Alert from '@material-ui/lab/Alert';
import { Message } from '../../components/Message'
import { Typography, Container, Grid, Box, Button, Snackbar, ButtonGroup } from '@material-ui/core';

import { useMessages } from '../../context/Message' 
import { Consts } from '../../utils/consts';

export const MessagesPageContainer = (props) => {
  const { messages, isSnackBarOpen, isApiStarted, lastErrorMessage }  = useMessages()

  const getPriorityNameTitle = (priority) => {
    const obj = {
      [Consts.PRIORITY.ERROR]: 'Error Type 1',
      [Consts.PRIORITY.WARNING]: 'Warning Type 2',
      [Consts.PRIORITY.INFO]: 'Info Type 3'
    }
    return obj[priority]
  }

  return (
    <Container fixed>
      <Box display='flex' alignItems='center' flexDirection='column'>
        <Typography variant='h1'>
          Messages
        </Typography>
        <Box marginTop={1} marginBottom={3}>
          <ButtonGroup>
            <Button
              variant='contained'
              color='primary'
              onClick={props.onChangeApiStatusClicked}
              data-testid='MessagesPage_StartStopButton'>
                {isApiStarted ? 'Stop': 'Start'}
            </Button>
            <Button
              variant='contained'
              color='secondary'
              onClick={props.onClearMessagesClicked}
              data-testid='MessagesPage_ClearButton'>
                Clear
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      <Grid container spacing={3}>
        {
          Object.keys(messages).map((priority) => (
            <Grid item xs={12} md={4} key={priority}>
              <React.Fragment>
                <Typography variant='h2' >
                  { getPriorityNameTitle(priority) }
                </Typography>
                <Typography>
                  Count: {messages[priority].length}
                </Typography>

                {
                  messages[priority].map((message, i) => (
                    <Message
                      key={i}
                      message={message}
                      priority={priority}
                      index={i}
                      onClearMessage={props.onClearMessage}
                    />
                  ))
                }
              </React.Fragment>
            </Grid>
          ))
        }
      </Grid>

      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={2000}
        onClose={props.handleSnackBarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={props.handleSnackBarClose} severity="error">
          { lastErrorMessage }
        </Alert>
      </Snackbar>
    </Container>
  )
}