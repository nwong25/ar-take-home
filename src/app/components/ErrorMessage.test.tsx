import { render } from '@testing-library/react';
import ErrorMessage from '@/app/components/ErrorMessage';
import TableGrid from '@/app/components/TableGrid';

describe('<ErrorMessage/>', () => {
  it('should render the error message', () => {
    const { getByText } = render(<ErrorMessage />);
    expect(getByText('Sorry there was an error, please try again')).toBeInTheDocument()
  });
});