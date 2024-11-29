import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe('Footer', () => {
  it('renders the footer with correct content', () => {
    render(<Footer />);

    expect(screen.getByText('by')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /vlrnsnk/i });

    expect(link).toBeInTheDocument();

    expect(link).toHaveAttribute('href', 'https://vlrnsnk.com/');

    expect(link).toHaveAttribute('target', '_blank');

    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render with correct styling classes', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');

    expect(footer).toHaveClass('p-4');
    expect(footer).toHaveClass('has-background-info-15');
    expect(footer).toHaveClass('has-text-info-85');
    expect(footer).toHaveClass('has-text-centered');
    expect(footer).toHaveClass('is-italic');
  });
});
