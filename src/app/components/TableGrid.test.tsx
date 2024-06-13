import { render, fireEvent, screen } from '@testing-library/react';
import TableGrid, { TableGridProps } from './TableGrid';

describe('<TableGrid/>', () => {
  const mockRows = [
    { id: 1, full_name: 'winnie/appcenter-docs', created: '2022-06-01', updated: '2022-06-10', pushed: '2022-06-15' },
    { id: 2, full_name: 'winnie/another-app', created: '2014-06-03', updated: '2015-06-10', pushed: '2022-06-15' },
  ]

  const mockTotalRows = 100;
  const mockUpdateRepositoryRequest = jest.fn();
  const mockRepositoryState = {
    userNameOrOrg: 'winnie',
    ownerType: 'owner',
    sort: 'full_name',
    direction: 'asc',
    page: 1
  };

  const defaultProps: TableGridProps = {
    rows: mockRows,
    totalRows: mockTotalRows,
    updateRepositoryRequest: mockUpdateRepositoryRequest,
    repositoryState: mockRepositoryState
  }

  it('should render', () => {
    const { container } = render(<TableGrid {...defaultProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render a DataGrid component with the rows and columns', () => {
    const { getByText } = render(<TableGrid {...defaultProps} />);
    expect(getByText('winnie/appcenter-docs')).toBeInTheDocument();
    expect(getByText('winnie/another-app')).toBeInTheDocument();
    expect(getByText('ID')).toBeInTheDocument();
    expect(getByText('Full Name')).toBeInTheDocument();
    expect(getByText('Created')).toBeInTheDocument();
    expect(getByText('Updated')).toBeInTheDocument();
    expect(getByText('Pushed')).toBeInTheDocument();
    expect(getByText('2022-06-01')).toBeInTheDocument();
  });

  it('handles pagination correctly', () => {
    const { getByTitle} = render(<TableGrid {...defaultProps} />);
    fireEvent.click(getByTitle('Go to next page'));
    expect(mockUpdateRepositoryRequest).toHaveBeenCalledWith({ type: 'updatePage', page: 2 });
  });

  it('handles sorting correctly', () => {
    const { getByText } = render(<TableGrid {...defaultProps} />);
    fireEvent.click(getByText('Full Name')); // Click on the Full Name column to sort
    expect(mockUpdateRepositoryRequest).toHaveBeenCalledWith({ type: 'updateMultiple', payload: { direction: 'asc', page: 1, sort: 'full_name' } });
  });
});