import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import { SearchBar } from "components/SearchBar/SearchBar";

describe('SearchBar', () => {
  const mockSetSearchQuery = jest.fn();
  const mockHandleSearchButtonClick = jest.fn();

  const defaultProps = {
    searchQuery: '',
    setSearchQuery: mockSetSearchQuery,
    handleSearchButtonClick: mockHandleSearchButtonClick,
    searchButtonText: 'Search',
    isSearchButtonActive: true,
  };

  it('should render input and button correctly', () => {
    render(<SearchBar {...defaultProps} />);

    const input = screen.getByPlaceholderText('Enter a title, album, or artist');
    expect(input).toBeInTheDocument();

    const button = screen.getByText('Search');
    expect(button).toBeInTheDocument();
  });

  it('should update searchQuery when typing in the input field', () => {
    render(<SearchBar {...defaultProps} />);

    const input = screen.getByPlaceholderText('Enter a title, album, or artist');

    fireEvent.change(input, { target: { value: 'New Query' } });

    expect(mockSetSearchQuery).toHaveBeenCalledWith('New Query');
  });

  it('should call handleSearchButtonClick when the button is clicked', () => {
    render(<SearchBar {...defaultProps} />);

    const button = screen.getByText('Search');
    fireEvent.click(button);

    expect(mockHandleSearchButtonClick).toHaveBeenCalledTimes(1);
  });

  it('should reflect input value based on the searchQuery prop', () => {
    render(<SearchBar {...defaultProps} searchQuery="Test Query" />);

    const input = screen.getByPlaceholderText('Enter a title, album, or artist');

    expect(input.value).toBe('Test Query');
  });

  it('should enable the button when isSearchButtonActive is true', () => {
    render(<SearchBar {...defaultProps} isSearchButtonActive={true} />);

    const button = screen.getByText('Search');
    expect(button).toBeEnabled();
  });

  it('should disable the button when isSearchButtonActive is false', () => {
    render(<SearchBar {...defaultProps} isSearchButtonActive={false} />);

    const button = screen.getByText('Search');

    expect(button).toBeDisabled();
  });
});
