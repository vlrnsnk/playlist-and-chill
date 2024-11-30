import axios from 'axios';
import {
  isSpotifyAccessTokenExpired,
  requestSpotifyAccessToken,
  getUserId,
  createPlaylist,
  addTracksToPlaylist,
  createAndPopulatePlaylist,
  fetchSpotifyTracks,
} from './spotify';

jest.mock('axios');

describe('Spotify API functions', () => {
  describe('requestSpotifyAccessToken', () => {
    // it('should create the correct Spotify authorization URL and redirect', () => {
    //   const mockHref = jest.fn();
    //   global.window.location.href = mockHref;

    //   requestSpotifyAccessToken();

    //   const url = mockHref.mock.calls[0][0];

    //   expect(url).toContain('https://accounts.spotify.com/authorize');
    //   expect(url).toContain('response_type=token');
    //   expect(url).toContain('client_id=feb3091794be47a6a1f23f62b693c933');
    //   expect(url).toContain('scope=playlist-modify-public');
    //   expect(url).toContain('redirect_uri=http%3A%2F%2Flocalhost%3A3000');
    // });

    it('should store the generated state in localStorage', () => {
      const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
      requestSpotifyAccessToken();

      expect(mockSetItem).toHaveBeenCalledWith(
        'spotifyState',
        expect.any(String),
      );
    });
  });

  describe('isSpotifyAccessTokenExpired', () => {
    it('should return true if the access token has expired', () => {
      const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
      const expiredTimestamp = (new Date().getTime() - 100000).toString();

      mockGetItem.mockReturnValueOnce(expiredTimestamp);

      expect(isSpotifyAccessTokenExpired()).toBe(true);
    });

    it('should return false if the access token has not expired', () => {
      const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
      const futureTimestamp = (new Date().getTime() + 100000).toString();

      mockGetItem.mockReturnValueOnce(futureTimestamp);

      expect(isSpotifyAccessTokenExpired()).toBe(false);
    });

    it('should return true if no expiration date is found', () => {
      const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');

      mockGetItem.mockReturnValueOnce(null);

      expect(isSpotifyAccessTokenExpired()).toBe(true);
    });
  });

  describe('getUserId', () => {
    it('should return the user id when the request is successful', async () => {
      const mockResponse = {
        data: {
          id: 'testUserId',
        },
      };

      axios.get.mockResolvedValue(mockResponse);

      const userId = await getUserId('mockAccessToken');

      expect(userId).toBe('testUserId');
    });

    it('should throw an error when the request fails', async () => {
      axios.get.mockRejectedValue(new Error('Network Error'));

      await expect(getUserId('mockAccessToken')).rejects.toThrow('Error fetching user info: Network Error');
    });
  });

  describe('createPlaylist', () => {
    it('should create a playlist and return the response data', async () => {
      const mockResponse = {
        data: {
          id: 'playlistId',
          name: 'Test Playlist',
        },
      };

      axios.post.mockResolvedValue(mockResponse);

      const playlist = await createPlaylist('testUserId', 'Test Playlist', 'mockAccessToken');

      expect(playlist.id).toBe('playlistId');
      expect(playlist.name).toBe('Test Playlist');
    });

    it('should throw an error if creating the playlist fails', async () => {
      axios.post.mockRejectedValue(new Error('Failed to create playlist'));

      await expect(createPlaylist('testUserId', 'Test Playlist', 'mockAccessToken'))
      .rejects.toThrow('Error creating playlist: Failed to create playlist');
    });
  });

  describe('addTracksToPlaylist', () => {
    // it('should add tracks to the playlist successfully', async () => {
    //   const mockResponse = {
    //     data: {
    //       snapshot_id: 'abc123',
    //     },
    //   };

    //   axios.post.mockResolvedValue(mockResponse);

    //   const result = await addTracksToPlaylist('testUserId', 'playlistId', ['trackUri1'], 'mockAccessToken');

    //   expect(result.snapshot_id).toBe('abc123');
    // });

    // it('should throw an error if adding tracks to the playlist fails', async () => {
    //   axios.post.mockRejectedValue(new Error('Failed to add tracks'));

    //   await expect(addTracksToPlaylist('testUserId', 'playlistId', ['trackUri1'], 'mockAccessToken'))
    //   .rejects.toThrow('Error adding tracks to playlist: Failed to add tracks');
    // });
  });

  describe('createAndPopulatePlaylist', () => {
    // it('should create and populate the playlist successfully', async () => {
    //   getUserId.mockResolvedValue('testUserId');
    //   createPlaylist.mockResolvedValue({ id: 'playlistId', name: 'Test Playlist' });
    //   addTracksToPlaylist.mockResolvedValue({ snapshot_id: 'abc123' });

    //   const result = await createAndPopulatePlaylist('mockAccessToken', 'Test Playlist', ['trackUri1']);

    //   expect(result.id).toBe('playlistId');
    //   expect(result.name).toBe('Test Playlist');
    //   expect(addTracksToPlaylist).toHaveBeenCalledWith('mockAccessToken', 'Test Playlist', ['trackUri1']);
    // });

    // it('should throw an error if any part of the process fails', async () => {
    //   getUserId.mockResolvedValue('testUserId');
    //   createPlaylist.mockRejectedValue(new Error('Failed to create playlist'));

    //   await expect(createAndPopulatePlaylist('mockAccessToken', 'Test Playlist', ['trackUri1']))
    //   .rejects.toThrow('Failed to create playlist');
    // });
  });

  describe('fetchSpotifyTracks', () => {
    it('should return a list of tracks when the request is successful', async () => {
      const mockResponse = {
        data: {
          tracks: {
            items: [
              {
                name: 'Track 1',
                artists: [{ name: 'Artist 1' }],
                album: { name: 'Album 1' },
                uri: 'spotify:track:1',
              },
              {
                name: 'Track 2',
                artists: [{ name: 'Artist 2' }],
                album: { name: 'Album 2' },
                uri: 'spotify:track:2',
              },
            ],
          },
        },
      };

      axios.get.mockResolvedValue(mockResponse);

      const tracks = await fetchSpotifyTracks('test query', 'mockAccessToken');

      expect(tracks).toStrictEqual([
        { id: 0, title: 'Track 1', artist: 'Artist 1', album: 'Album 1', uri: 'spotify:track:1' },
        { id: 1, title: 'Track 2', artist: 'Artist 2', album: 'Album 2', uri: 'spotify:track:2' },
      ]);
    });

    it('should throw an error if the request fails', async () => {
      axios.get.mockRejectedValue(new Error('Failed to fetch tracks'));

      await expect(fetchSpotifyTracks('test query', 'mockAccessToken')).rejects
      .toThrow('Failed to fetch tracks');
    });
  });
});
