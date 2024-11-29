import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe('Button', () => {
  const mockHandleClick = jest.fn();
  const mockText = 'test text';

  beforeEach(() => {
    mockHandleClick.mockClear();
  });

  it('renders the correct innerText', () => {
    render(
      <Button
        innerText={mockText}
        isActive={true}
        addedClasses=""
        handleClick={mockHandleClick}
      />
    );

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent(mockText);
  });

  it('call handleClick when button is clicked', () => {
    render(
      <Button
        innerText={mockText}
        isActive={true}
        addedClasses=""
        handleClick={mockHandleClick}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call handleClick when the button is disabled', () => {
    render(
      <Button
        innerText={mockText}
        isActive={false}
        addedClasses=""
        handleClick={mockHandleClick}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockHandleClick).not.toHaveBeenCalled();
  });

  it('applies additional classes when addedClasses is passed', () => {
    const addedClasses = 'is-primary is-rounded';

    render(
      <Button
        innerText={mockText}
        isActive={true}
        addedClasses={addedClasses}
        handleClick={mockHandleClick}
      />
    );

    const button = screen.getByRole('button');

    expect(button).toHaveClass('button is-primary is-rounded');
  });

  it('disables the button when isActive is false', () => {
    render(
      <Button
        innerText={mockText}
        isActive={false}
        addedClasses=""
        handleClick={mockHandleClick}
      />
    );

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });

  it('enables the button when isActive is true', () => {
    render(
      <Button
        innerText={mockText}
        isActive={true}
        addedClasses=""
        handleClick={mockHandleClick}
      />
    );

    const button = screen.getByRole('button');

    expect(button).toBeEnabled();
  });
});
