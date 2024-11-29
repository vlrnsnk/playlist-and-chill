import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { ActionButton } from "./ActionButton";

describe('ActionButton', () => {
  const mockHandleActionButtonClick = jest.fn();
  const mockTrack = {
    id:1,
    title: 'Test Title',
    artist: 'Test Artist',
    album: 'Test Album',
    uri: 'spotify:test:1'
  };

  it('renders with a "+" when action is "add', () => {
    render(
      <ActionButton
        action="add"
        track={mockTrack}
        handleActionButtonClick={mockHandleActionButtonClick}
      />
    );

    const buttonText = screen.getByText('+');
    expect(buttonText).toBeInTheDocument();
  });

  it('renders with a "-" when action is not "add"', () => {
    render(
      <ActionButton
        action="remove"
        track={mockTrack}
        handleActionButtonClick={mockHandleActionButtonClick}
      />
    );

    const buttonText = screen.getByText('-');
    expect(buttonText).toBeInTheDocument();
  });

  it('calls handleActionButtonClick when button is clicked', () => {
    render(
      <ActionButton
        action="add"
        track={mockTrack}
        handleActionButtonClick={mockHandleActionButtonClick}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockHandleActionButtonClick).toHaveBeenCalledTimes(1);
    expect(mockHandleActionButtonClick).toHaveBeenCalledWith(mockTrack);
  });

});
