import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { createAndPopulatePlaylist, fetchSpotifyTracks, isSpotifyAccessTokenExpired, requestSpotifyAccessToken } from 'utils/spotify';

jest.mock('utils/spotify.js', () => ({
  requestSpotifyAccessToken: jest.fn(),
  fetchSpotifyTracks: jest.fn(),
  createAndPopulatePlaylist: jest.fn(),
  isSpotifyAccessTokenExpired: jest.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders the component with child elements', () => {
    render(<App />);

    expect(screen.getByText('Playlist & Chill')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Save to Spotify')).toBeInTheDocument();
    expect(screen.getByText('vlrnsnk')).toBeInTheDocument();
  });

  it('handles search functionality correctly', async () => {
    const mockTracks = [
      { id: 1, title: 'Track 1', artist: 'Artist 1', album: 'Album 1', uri: 'uri 1' },
      { id: 2, title: 'Track 2', artist: 'Artist 2', album: 'Album 2', uri: 'uri 2' },
    ];

    fetchSpotifyTracks.mockResolvedValue(mockTracks);

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Enter a title, album, or artist'), { target: { value: 'test' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => expect(fetchSpotifyTracks).toHaveBeenCalled());
    await screen.findByText('Track 1');

    expect(screen.getByText('Track 1')).toBeInTheDocument();
  });

  it('handles adding tracks to the playlist', async () => {
    const mockTrack = { id: 1, title: 'Track 1', artist: 'Artist 1', album: 'Album 1', uri: 'uri 1' };
    const mockTracks = [mockTrack];

    fetchSpotifyTracks.mockResolvedValue(mockTracks);

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Enter a title, album, or artist'), { target: { value: 'test' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => expect(fetchSpotifyTracks).toHaveBeenCalled());
    await screen.findByText('Track 1');

    fireEvent.click(screen.getAllByText('+')[0]);

    expect(screen.getAllByText('Track 1')[1]).toBeInTheDocument();
  });

  it('handles removing tracks from the playlist', async () => {
    const mockTrack = { id: 1, title: 'Track 1', artist: 'Artist 1', album: 'Album 1', uri: 'uri 1' };
    const mockTracks = [mockTrack];

    fetchSpotifyTracks.mockResolvedValue(mockTracks);

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Enter a title, album, or artist'), { target: { value: 'test' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => expect(fetchSpotifyTracks).toHaveBeenCalled());
    await screen.findByText('Track 1');

    fireEvent.click(screen.getAllByText('+')[0]);
    fireEvent.click(screen.getAllByText('-')[0]);

    expect(screen.queryByText('-')).not.toBeInTheDocument();
  });

  it('handles saving playlist to Spotify', async () => {
    const mockAccessToken = 'mockAccessToken';
    const mockTrack = { id: 1, title: 'Track 1', artist: 'Artist 1', album: 'Album 1', uri: 'uri 1' };
    const mockPlaylist = { name: 'My Playlist', description: 'My Playlist', id: '12345' };

    fetchSpotifyTracks.mockResolvedValue([mockTrack]);
    createAndPopulatePlaylist.mockResolvedValue(mockPlaylist);

    localStorage.setItem('spotifyAccessToken', mockAccessToken);

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Enter a title, album, or artist'), { target: { value: 'test' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => expect(fetchSpotifyTracks).toHaveBeenCalled());
    await screen.findByText('Track 1');

    fireEvent.click(screen.getAllByText('+')[0]);
    fireEvent.click(screen.getByText('Save to Spotify'));

    await waitFor(() => expect(createAndPopulatePlaylist).toHaveBeenCalledWith(mockAccessToken, 'Name Your Playlist', [mockTrack.uri]));

    const saveButton = await screen.findByRole('button', { name: /playlist saved!/i });
    expect(saveButton).toBeInTheDocument();
  });

  it('requests Spotify access token when needed', async () => {
    isSpotifyAccessTokenExpired.mockReturnValue(true);

    render(<App />);

    // Trigger the action that requires the access token (e.g., clicking Search)
    await act(async () => {
      fireEvent.click(screen.getByText('Search'));
    });

    await waitFor(() => expect(requestSpotifyAccessToken).toHaveBeenCalled());
    // Verify that the requestSpotifyAccessToken function was called
    expect(requestSpotifyAccessToken).toHaveBeenCalled();
  });

});
