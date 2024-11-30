import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { PageWrapper } from "./PageWrapper";

describe('PageWrapper component', () => {
  it('renders children correctly', () => {
    render(
      <PageWrapper>
        <div>Test Child</div>
      </PageWrapper>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('renders with the correct classes', () => {
    render(
      <PageWrapper>
        <div>Test Child</div>
      </PageWrapper>
    );

    const wrappedDiv = screen.getAllByRole('generic')[1];

    expect(wrappedDiv).toHaveClass('hero is-fullheight');
  });

  it('renders correctly when no children are passed', () => {
    render(<PageWrapper />);

    const wrappedDiv = screen.getAllByRole('generic')[1];

    expect(wrappedDiv).toHaveClass('hero is-fullheight');
  });
});
