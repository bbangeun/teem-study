import '@testing-library/jest-dom'
import { fireEvent, getByRole, getByText, render, screen } from '@testing-library/svelte'

import InitPage from '../InitPage.svelte'

it('Button works', async () => {
    const { getByText, getByTestId } = render(InitPage)

    const login = getByText('로그인')
    const counter = getByTestId('counter-value')

    await fireEvent.click(login)
    expect(counter.textContent).toBe('1')
    expect(counter).toHaveTextContent('1')

    await fireEvent.click(login)
    expect(counter.textContent).toBe('2')
    expect(counter).toHaveTextContent('2')
})