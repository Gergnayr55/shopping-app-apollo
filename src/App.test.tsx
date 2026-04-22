import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login page', async () => {
  render(<App />);
  const linkElement = await screen.findByText(/don't have an account/i);
  expect(linkElement).toBeInTheDocument();
});
