import { clearUrlParams } from "./helpers";

describe('clearUrlParams', () => {
  const replaceStateMock = jest.fn();

  beforeAll(() => {
    delete global.window.location;

    global.window.location = {
      origin: 'https://example.com',
      pathname: '/path/to/page',
      search: '?foo=bar&baz=qux',
      hash: '',
    };

    global.window.history.replaceState = replaceStateMock;
  });

  beforeEach(() => {
    replaceStateMock.mockClear();
  });

  it('should clear query parameters from the URL', () => {
    clearUrlParams();

    expect(replaceStateMock).toHaveBeenCalledWith(
      {},
      document.title,
      'https://example.com/path/to/page',
    );
  });

  it('should not modify the origin and pathname', () => {
    clearUrlParams();

    const newUrl = `${window.location.origin}${window.location.pathname}`;

    expect(newUrl).toBe('https://example.com/path/to/page');
  });

  it('should handle an empty query string gracefully', () => {
    global.window.location.search = '';

    clearUrlParams();

    expect(replaceStateMock).toHaveBeenCalledWith(
      {},
      document.title,
      'https://example.com/path/to/page',
    );
  });

  it('should handle a URL with only a hash fragment', () => {
    global.window.location.search = '';
    global.window.location.hash = '#section1';

    clearUrlParams();

    expect(replaceStateMock).toHaveBeenCalledWith(
      {},
      document.title,
      'https://example.com/path/to/page',
    );
  });

  it('should not change the document title or history state', () => {
    document.title = 'Test Page';

    clearUrlParams();

    expect(replaceStateMock).toHaveBeenCalledWith(
      {},
      'Test Page',
      'https://example.com/path/to/page',
    );
  });
});
