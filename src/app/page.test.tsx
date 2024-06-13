import { render, fireEvent, waitFor, getByTestId, screen} from '@testing-library/react';
import SearchPage from '@/app/page';
import repositoryServiceInstance, { ReadonlyRepository } from '@/app/services/repositoryService';
import HttpError from '@/app/models/httpError';
import { HttpResponse } from '@/app/services/httpService';
import '@testing-library/jest-dom'

describe('<SearchPage />', () => {
  it('should render', () => {
    const { container } = render(<SearchPage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('handles form submission correctly', async () => {
    const { getByRole, getByText, container } = render(<SearchPage />);
    //input field
    fireEvent.change(getByRole('textbox', {name: 'Username or Organization'}), { target: { value: 'test' } });

    //select field
    const selectElement = getByRole('combobox', {name: 'Owner Type'});
    fireEvent.mouseDown(selectElement);
    const listbox = screen.getByRole('listbox');
    const option = screen.getByText('All');
    fireEvent.click(option);
    expect(selectElement).toHaveTextContent('All');

    //search button
    fireEvent.click(getByText('Search'));

    const loadingSpinner = getByTestId(container, 'loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();

    await waitFor(() => expect(loadingSpinner).not.toBeInTheDocument());
  });

  it('displays error message if there is an error', async () => {
    jest.spyOn(repositoryServiceInstance, 'getRepositoriesByUserNameOrOrg').mockRejectedValueOnce(new HttpError('error', 500));
    const { getByRole, findByText, container, getByText } = render(<SearchPage />);
    fireEvent.change(getByRole('textbox', { name: 'Username or Organization' }), { target: { value: 'test' } });
    fireEvent.click(getByText('Search'));
    const errorMessage = await findByText('Sorry there was an error, please try again');
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays no results message if there are no results', async () => {
    jest.spyOn(repositoryServiceInstance, 'getRepositoriesByUserNameOrOrg').mockResolvedValue({ data: [] } as unknown as HttpResponse<ReadonlyRepository[]>);
    const { getByText, getByRole, queryByText } = render(<SearchPage />);
    fireEvent.change(getByRole('textbox', { name: 'Username or Organization' }), { target: { value: 'test' } });
    fireEvent.click(getByText('Search'));
    const noResultsMessage = await waitFor(() => getByText('No matches were found'));
    expect(noResultsMessage).toBeInTheDocument();
  });



});