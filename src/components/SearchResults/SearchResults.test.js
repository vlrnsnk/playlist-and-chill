import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import { SearchResults } from "./SearchResults";

describe('SearchResults', () => {
  const mockHandleAddTrack = jest.fn();

  const tracks = [
    { id: 1, title: 'Track 1', artist: 'Artist 1', album: 'Album 1', uri: 'uri 1' },
    { id: 2, title: 'Track 2', artist: 'Artist 2', album: 'Album 2', uri: 'uri 2' },
  ];

  it('should render the search results header correctly', () => {
    render(<SearchResults tracks={tracks} handleAddTrack={mockHandleAddTrack} />);

    const header = screen.getByText('Search Results');

    expect(header).toBeInTheDocument();
  });

  it('should render the Tracklist component with tracks', () => {
    render(<SearchResults tracks={tracks} handleAddTrack={mockHandleAddTrack} />);

    const trackItems = screen.getAllByRole('listitem');

    expect(trackItems).toHaveLength(tracks.length);
  });

  it('should call handleAddTrack when an action button is clicked', () => {
    render(<SearchResults tracks={tracks} handleAddTrack={mockHandleAddTrack} />);

    const actionButtons = screen.getAllByText('+');

    fireEvent.click(actionButtons[0]);

    expect(mockHandleAddTrack).toHaveBeenCalledTimes(1);
    expect(mockHandleAddTrack).toHaveBeenCalledWith(tracks[0]);
  });

  it('should pass the correct props to the Tracklist component', () => {
    render(<SearchResults tracks={tracks} handleAddTrack={mockHandleAddTrack} />);

    const trackItems = screen.getAllByRole('listitem');

    expect(trackItems[0]).toHaveTextContent('Track 1');
    expect(trackItems[1]).toHaveTextContent('Track 2');
  });
});
