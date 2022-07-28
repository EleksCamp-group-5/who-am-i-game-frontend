import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Victory from './victory-screen';

describe('Victory', () => {
  const victory = (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Victory />} />
      </Routes>
    </MemoryRouter>
  );

  test('Must have a message', () => {
    render(victory);

    screen.getByText('CONGRATULATIONS. YOU HAVE WON THE GAME');
  });

  test('Must have an option to leave the page', () => {
    render(victory);

    screen.getByText('GO TO MAIN MENU');
  });
});
