import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import { Tracklist } from "./Tracklist";

describe('Tracklist component', () => {
  const tracks = [
    { id: 1, title: 'Track 1', artist: 'Artist 1', album: 'Album 1', uri: 'uri 1' },
    { id: 2, title: 'Track 2', artist: 'Artist 2', album: 'Album 2', uri: 'uri 2' },
  ];
  const action = 'add';
  const mockHandleActionButtonClick = jest.fn();

  beforeEach(() => {
    mockHandleActionButtonClick.mockClear();
  });

  it('renders a list of Track components when tracks are provided', () => {
    render(
      <Tracklist
        tracks={tracks}
        action={action}
        handleActionButtonClick={mockHandleActionButtonClick}
      />
    );

    tracks.forEach(track => {
      expect(screen.getByText(track.title)).toBeInTheDocument();
    });

    expect(screen.getAllByRole('button')).toHaveLength(tracks.length);
  });

  it('displays "No Tracks" when the tracks array is empty', () => {
    render(
      <Tracklist
        tracks={[]}
        action={action}
        handleActionButtonClick={mockHandleActionButtonClick}
      />
    );

    expect(screen.getByText('No Tracks')).toBeInTheDocument();
  });

  it('calls handleActionButtonClick when an action button is clicked', () => {
    render(
      <Tracklist
        tracks={tracks}
        action={action}
        handleActionButtonClick={mockHandleActionButtonClick}
      />
    );

    const firstTrackButton = screen.getAllByRole('button')[0];
    fireEvent.click(firstTrackButton);

    expect(mockHandleActionButtonClick).toHaveBeenCalledTimes(1);

    const secondTrackButton = screen.getAllByRole('button')[1];
    fireEvent.click(secondTrackButton);

    expect(mockHandleActionButtonClick).toHaveBeenCalledTimes(2);
  });
});
