import { useState, Dispatch } from 'react';

import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowsProp, GridRowSelectionModel, GridSortModel } from '@mui/x-data-grid';
import { GridCallbackDetails } from '@mui/x-data-grid/models/api';
import { GridPaginationModel } from '@mui/x-data-grid/models/gridPaginationProps';

import locale from '@/app/lib/locale';

import { Action, RepositoryPageState } from '@/app/page';


export interface TableGridProps {
  rows: {
    id: number,
    full_name: string,
    created?: string | null,
    updated?: string | null,
    pushed?: string | null,
  }[],
  totalRows: number
  updateRepositoryRequest: Dispatch<Action>
  repositoryState: RepositoryPageState
}

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
    headerClassName: 'table-header',
    sortable: false
  },
  {
    field: 'full_name',
    headerName: locale.TABLE.FULL_NAME,
    width: 250,
    headerClassName: 'table-header',
  },
  {
    field: 'created',
    headerName: locale.TABLE.CREATED,
    width: 150,
    headerClassName: 'table-header',
  },
  {
    field: 'updated',
    headerName: locale.TABLE.UPDATED,
    type: 'number',
    width: 150,
    headerClassName: 'table-header',
  },
  {
    field: 'pushed',
    headerName: locale.TABLE.PUSHED,
    type: 'number',
    width: 165,
    headerClassName: 'table-header',
  },
];

export default function TableGrid(props: TableGridProps | undefined) {

  const { rows, totalRows, updateRepositoryRequest, repositoryState } = props ?? {};


  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  const handlePagination = (model: GridPaginationModel, details: GridCallbackDetails) => {
    if (updateRepositoryRequest) {
      updateRepositoryRequest({ type: 'updatePage', page: model.page + 1 });
    }

    if(rows){
      setPaginationModel({
        page: model.page,
        pageSize: model.pageSize
      });
    }
  };

  const handleSortModelChange = (model: GridSortModel, details: GridCallbackDetails) => {
    if (updateRepositoryRequest && model[0] && model[0].sort) {
      updateRepositoryRequest({
        type: 'updateMultiple', payload: {
          direction: model[0].sort,
          page: 1,
          sort: model[0].field
        }
      });
    }
    setPaginationModel({
      page: 0,
      pageSize: 10
    });
  };

  if (!props || !props.rows) {
    return null;
  }

  return (
    <Box
      sx={{
        height: 'auto',
        width: '100%',
        boxShadow: 2,
        border: 2,
        borderColor: 'primary.light',
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.dark',
        },
        '& .table-header': {
          backgroundColor: 'primary.main',
          color: '#FFFFFF'
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        disableRowSelectionOnClick
        rowCount={totalRows}
        paginationModel={paginationModel}
        pageSizeOptions={[10]}
        pagination
        paginationMode="server"
        onPaginationModelChange={handlePagination}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        onSortModelChange={handleSortModelChange}
        rowSelectionModel={rowSelectionModel}
      />
    </Box>
  );
}

