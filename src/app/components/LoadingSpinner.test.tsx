import { render } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('<LoadingSpinner/>', () => {
  it('should render a CircularProgress component', () => {
    const { getByRole } = render(<LoadingSpinner />);

    const circularProgress = getByRole('progressbar');

    expect(circularProgress).toBeInTheDocument();
  });
});
