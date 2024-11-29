import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe('Header', () => {
  it('renders the header with the correct title', () => {
    render(<Header />);

    const headerText = screen.getByText(/Playlist & Chill/i);

    expect(headerText).toBeInTheDocument();
  });

  it('has the correct styling classes for the header and h1', () => {
    render(<Header />);

    const headerDiv = screen.getByTestId('header-container');

    expect(headerDiv).toHaveClass('p-4');
    expect(headerDiv).toHaveClass('has-background-info-15');
    expect(headerDiv).toHaveClass('has-text-info-85');

    const headerH1 = screen.getByRole('heading', { level: 1 });

    expect(headerH1).toHaveClass('has-text-centered');
    expect(headerH1).toHaveClass('has-text-warning');
    expect(headerH1).toHaveClass('is-size-1');
    expect(headerH1).toHaveClass('has-text-weight-bold');
  });
});
