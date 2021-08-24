import { Message } from './index'
import { Consts } from '../../utils/consts'

import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Message Component', () => {
  it('Should show the message correctly', () => {
    const testMessage = 'lalala lelele'
    render(
      <Message
        message={testMessage}
        index={0}
        priority={Consts.PRIORITY.ERROR}
      />
    )

    expect(screen.queryByText(testMessage)).toBeInTheDocument()
  })

  it('Should show the clear button', () => {
    const testMessage = 'lalala lelele'
    const index = 0
    const priority = Consts.PRIORITY.ERROR
    render(
      <Message
        message={testMessage}
        index={index}
        priority={priority}
      />
    )

    expect(screen.queryByTestId(`message-clear-button-${priority}-${index}`)).toBeInTheDocument()
  })

  it('Should show trigger onClearMessage', () => {
    const testMessage = 'lalala lelele'
    const index = 0
    const priority = Consts.PRIORITY.ERROR
    const onClearMessage = jest.fn();

    const testId = `message-clear-button-${priority}-${index}`
    render(
      <Message
        message={testMessage}
        index={index}
        priority={priority}
        onClearMessage={onClearMessage}
      />
    )

    userEvent.click(screen.queryByTestId(testId))
    expect(onClearMessage).toHaveBeenCalled();
  })
})