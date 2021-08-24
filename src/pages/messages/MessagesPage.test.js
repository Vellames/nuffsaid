import { MessagesPage } from './index'
import { Consts } from '../../utils/consts'

import '@testing-library/jest-dom'
import { screen, render, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MessageProvider } from '../../context/Message'

beforeAll(() => {
  jest.useFakeTimers()
})

afterAll(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

describe('MessagesPage', () => {
  it('Should show the clear button', async () => {
    render(
      <MessageProvider>
        <MessagesPage/>
      </MessageProvider>
    )

    expect(screen.queryByTestId('MessagesPage_ClearButton')).toBeInTheDocument()
    expect(screen.queryByTestId('MessagesPage_ClearButton')).toContainHTML('Clear')
  })

  it('Should show the start button', async () => {
    render(
      <MessageProvider>
        <MessagesPage/>
      </MessageProvider>
    )

    expect(screen.queryByTestId('MessagesPage_StartStopButton')).toBeInTheDocument()
    expect(screen.queryByTestId('MessagesPage_StartStopButton')).toContainHTML('Start')
  })

  it('Should show the stop button', async () => {
    render(
      <MessageProvider>
        <MessagesPage/>
      </MessageProvider>
    )

    await act(async () => jest.advanceTimersByTime(5000))

    expect(screen.queryByTestId('MessagesPage_StartStopButton')).toBeInTheDocument()
    expect(screen.queryByTestId('MessagesPage_StartStopButton')).toContainHTML('Stop')
  })

  it('Should find at least one message', async () => {
    render(
      <MessageProvider>
        <MessagesPage/>
      </MessageProvider>
    )

    await act(async () => jest.advanceTimersByTime(5000))

    expect(screen.queryByTestId('MessageComponent')).toBeInTheDocument()
  })

  it('Should find no messages after user click on clear all messages', async () => {
    render(
      <MessageProvider>
        <MessagesPage/>
      </MessageProvider>
    )

    await act(async () => jest.advanceTimersByTime(5000))
    userEvent.click(screen.queryByTestId('MessagesPage_ClearButton'))

    expect(screen.queryByTestId('MessageComponent')).not.toBeInTheDocument()
  })
})
