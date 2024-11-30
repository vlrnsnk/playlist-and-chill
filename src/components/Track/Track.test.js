import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import { Track } from "./Track";

describe('Track', () => {
  const track = {
    title: 'Track 1',
    artist: 'Artist 1',
    album: 'Album 1',
  };

  const action = 'add';
  const mockHandleActionButtonClick = jest.fn();

  it('should render track information (title, artist and album)', () => {
    render(
      <Track
        track={track}
        action={action}
        handleActionButtonClick={mockHandleActionButtonClick}
      />
    );

    expect(screen.getByText(track.title)).toBeInTheDocument();
    expect(screen.getByText(`${track.artist} | ${track.album}`)).toBeInTheDocument();
  });

  it('renders ActionButton with inner text set to "+" when action is "add"', () => {
    render(
      <Track
        track={track}
        action={action}
        handleActionButtonClick={mockHandleActionButtonClick}
      />
    );

    expect(screen.getByRole('button')).toHaveTextContent('+');

  });

  it('renders ActionButton with inner text set to "-" when action is not "add"', () => {
    render(
      <Track
        track={track}
        action="not add"
        handleActionButtonClick={mockHandleActionButtonClick}
      />
    );

    expect(screen.getByRole('button')).toHaveTextContent('-');

  });

  it('calls handleActionButtonClick when the action button is clicked', () => {
    render(
      <Track
        track={track}
        action={action}
        handleActionButtonClick={mockHandleActionButtonClick}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockHandleActionButtonClick).toHaveBeenCalledTimes(1);
  });
});
