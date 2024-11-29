import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import { Playlist } from "./Playlist";

describe('Playlist Component', () => {
  const mockSetPlaylistName = jest.fn();
  const mockHandleRemoveTrack = jest.fn();
  const mockHandleSavePlaylist = jest.fn();

  const tracks = [
    { id: 1, title: 'Track 1', artist: 'Artist 1', album: 'Album 1', uri: 'uri 1' },
    { id: 2, title: 'Track 2', artist: 'Artist 2', album: 'Album 2', uri: 'uri 2' },
  ];

  it('renders the Playlist component correctly', () => {
    render(
      <Playlist
        playlistName="My Playlist"
        setPlaylistName={mockSetPlaylistName}
        savePlaylistButtonText="Save Playlist"
        isSavePlaylistButtonActive={true}
        tracks={tracks}
        handleRemoveTrack={mockHandleRemoveTrack}
        handleSavePlaylist={mockHandleSavePlaylist}
      />
    );

    const playlistInput = screen.getByRole('textbox');
    expect(playlistInput).toHaveValue('My Playlist');

    const tracklist = screen.getByText('Track 1');
    expect(tracklist).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    const saveButton = buttons.find(button => button.textContent === 'Save Playlist');

    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toHaveTextContent('Save Playlist');
  });

  it('calls handleSavePlaylist when save button is clicked', () => {
    render(
      <Playlist
        playlistName="My Playlist"
        setPlaylistName={mockSetPlaylistName}
        savePlaylistButtonText="Save Playlist"
        isSavePlaylistButtonActive={true}
        tracks={tracks}
        handleRemoveTrack={mockHandleRemoveTrack}
        handleSavePlaylist={mockHandleSavePlaylist}
      />
    );

    const buttons = screen.getAllByRole('button');
    const saveButton = buttons.find(button => button.textContent === 'Save Playlist');

    fireEvent.click(saveButton);

    expect(mockHandleSavePlaylist).toHaveBeenCalledTimes(1);
  });

  it('enables the save button when there are tracks and it is active', () => {
    render(
      <Playlist
        playlistName="My Playlist"
        setPlaylistName={mockSetPlaylistName}
        savePlaylistButtonText="Save Playlist"
        isSavePlaylistButtonActive={true}
        tracks={tracks}
        handleRemoveTrack={mockHandleRemoveTrack}
        handleSavePlaylist={mockHandleSavePlaylist}
      />
    );

    const buttons = screen.getAllByRole('button');
    const saveButton = buttons.find(button => button.textContent === 'Save Playlist');

    expect(saveButton).not.toBeDisabled();
  });

  it('disables the save button when there are no tracks or it is inactive', () => {
    render(
      <Playlist
        playlistName="My Playlist"
        setPlaylistName={mockSetPlaylistName}
        savePlaylistButtonText="Save Playlist"
        isSavePlaylistButtonActive={false}
        tracks={[]}
        handleRemoveTrack={mockHandleRemoveTrack}
        handleSavePlaylist={mockHandleSavePlaylist}
      />
    );

    const buttons = screen.getAllByRole('button');
    const saveButton = buttons.find(button => button.textContent === 'Save Playlist');

    expect(saveButton).toBeDisabled();
  });

  it('disables the save button when there are no tracks but isSavePlaylistButtonActive is true', () => {
    render(
      <Playlist
        playlistName="My Playlist"
        setPlaylistName={mockSetPlaylistName}
        savePlaylistButtonText="Save Playlist"
        isSavePlaylistButtonActive={false}
        tracks={[]}
        handleRemoveTrack={mockHandleRemoveTrack}
        handleSavePlaylist={mockHandleSavePlaylist}
      />
    );

    const buttons = screen.getAllByRole('button');
    const saveButton = buttons.find(button => button.textContent === 'Save Playlist');

    expect(saveButton).toBeDisabled();
  });

  it('calls setPlaylistName when input value changes', () => {
    render(
      <Playlist
        playlistName="My Playlist"
        setPlaylistName={mockSetPlaylistName}
        savePlaylistButtonText="Save Playlist"
        isSavePlaylistButtonActive={true}
        tracks={tracks}
        handleRemoveTrack={mockHandleRemoveTrack}
        handleSavePlaylist={mockHandleSavePlaylist}
      />
    );

    const inputField = screen.getByRole('textbox');

    fireEvent.change(inputField, { target: { value: 'New Playlist Name' } });

    expect(mockSetPlaylistName).toHaveBeenCalledTimes(1);
    expect(mockSetPlaylistName).toHaveBeenCalledWith('New Playlist Name');
  });

  it('calls handleRemoveTrack when a track is removed from the tracklist', () => {
    const tracks = [
      { id: 1, title: 'Track 1', artist: 'Artist 1', album: 'Album 1', uri: 'uri 1' },
    ];

    render(
      <Playlist
        playlistName="My Playlist"
        setPlaylistName={mockSetPlaylistName}
        savePlaylistButtonText="Save Playlist"
        isSavePlaylistButtonActive={true}
        tracks={tracks}
        handleRemoveTrack={mockHandleRemoveTrack}
        handleSavePlaylist={mockHandleSavePlaylist}
      />
    );

    const removeButton = screen.getByRole('button', { name: /-/i });

    fireEvent.click(removeButton);

    expect(mockHandleRemoveTrack).toHaveBeenCalledTimes(1);
  });
});
