'use client';

import { useEffect, useReducer, useState, useCallback } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import locale from '@/app/lib/locale';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { InputLabel, Select, MenuItem, FormControl, SelectChangeEvent } from '@mui/material';

import { useTheme } from '@mui/material';

import HttpError from '@/app/models/httpError';
import httpServiceInstance, { HttpResponse } from '@/app/services/httpService';
import repositoryServiceInstance, { ReadonlyRepository } from '@/app/services/repositoryService';

import convertRepositoryDataForRows from '@/app/lib/convertRepositoryDataForRows';

import LoadingSpinner from '@/app/components/LoadingSpinner';
import TableGrid, { TableGridProps } from '@/app/components/TableGrid';
import ErrorMessage from '@/app/components/ErrorMessage';

export interface RepositoryPageState {
  userNameOrOrg: string;
  ownerType: string;
  sort: string;
  direction: string;
  page: number;
}

export type Action =
  | { type: 'updateSearch' | 'updateOwnerType'; name: string; value: string }
  | { type: 'updateSort'; sort: string }
  | { type: 'updateDirection'; direction: string }
  | { type: 'updatePage'; page: number }
  | {
  type: 'updateMultiple', payload: {
    userNameOrOrg?: string;
    ownerType?: string;
    sort?: string;
    direction?: string;
    page?: number;
  }
}

function reducer(
  state: RepositoryPageState,
  action: Action
) {
  if (action.type === 'updateSearch' || action.type === 'updateOwnerType') {
    return { ...state, [action.name]: action.value };
  } else if (action.type === 'updateSort') {
    return { ...state, sort: action.sort };
  } else if (action.type === 'updateDirection') {
    return { ...state, direction: action.direction };
  } else if (action.type === 'updatePage') {
    return { ...state, page: action.page };
  } else if (action.type === 'updateMultiple') {
    return { ...state, ...action.payload };
  }
  throw new Error('Unhandled action type');
}

const initialRepositoryPageState: RepositoryPageState = {
  userNameOrOrg: '',
  ownerType: '',
  sort: 'full_name',
  direction: 'asc',
  page: 1
};

export default function SearchPage() {
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<HttpError | null>(null);

  const [state, dispatch] = useReducer(reducer, initialRepositoryPageState);
  const [data, setData] = useState<HttpResponse<ReadonlyRepository[]> | null>(null);
  const [totalRows, setTotalRows] = useState(0);

  const [submittedValue, setSubmittedValue] = useState(false);
  const [formModified, setFormModified] = useState(false);
  const [inputError, setInputError] = useState(false)

  const [previousSearchTerm, setPreviousSearchTerm] = useState('');
  const [previousOwnerType, setPreviousOwnerType] = useState('');


  useEffect(() => {
    if (state.userNameOrOrg && submittedValue) {
      getRepositories();
    }
  }, [state, submittedValue]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    setPreviousOwnerType(state.ownerType)
    const value = event.target.value;
    const name = event.target.name;
    setInputError(false);

    dispatch({
      type: 'updateMultiple', payload: {
        [name]: value,
        page: 1
      }
    });

    setSubmittedValue(false);
    setFormModified(true);
  }, [state]);


  const getRepositories = async() => {
    if (state.userNameOrOrg) {
      try {
        const results: HttpResponse<ReadonlyRepository[]> | HttpError = await repositoryServiceInstance.getRepositoriesByUserNameOrOrg(state);
        if (httpServiceInstance.isHttpResponse(results)) {
          setData(results);
          setIsLoading(false);
          setError(null);


          if(state.userNameOrOrg !== previousSearchTerm || state.ownerType !== previousOwnerType || !totalRows){
            const lastPage = getLastPage(results);
            const updatedState = { ...state, page: lastPage };
            const data = await repositoryServiceInstance.getRepositoriesByUserNameOrOrg(updatedState);
            if (httpServiceInstance.isHttpResponse(data)) {
              const lastPageResults = data.data?.length;
              setTotalRows(((lastPage && lastPage - 1) || 0) * 10 + lastPageResults);
            }
          }
        }
      } catch (error: any) {
        setError(error);
        setIsLoading(false);
      }
    }
  }

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!state.userNameOrOrg) {
      return setInputError(true);
    }

    setPreviousSearchTerm(state.userNameOrOrg);
    setSubmittedValue(true);
    setFormModified(false);
    setIsLoading(true);
    getRepositories();
  }, [state, getRepositories]);



  const getLastPage = (data: HttpResponse<ReadonlyRepository[]>) => {
    if (data && data.headers) {
      const links = data.headers.get('Link');
      let index = links?.indexOf('>; rel="last"') && links?.indexOf('>; rel="last"') - 1;
      const lastPageArr = [];

      if (index) {
        while (index !== 0 && links && links[index] !== '=') {
          if (/\d/.test(links[index])) {
            lastPageArr.unshift(links[index]);
            index--;
          }
        }
      }
      return parseInt(lastPageArr.join(''));
    }
  };
  const getRepositoryRows = (): TableGridProps['rows'] => {
    const repositories = data as HttpResponse<ReadonlyRepository[]>;
    if (repositories && repositories.data) {
      return convertRepositoryDataForRows(repositories.data);
    }
    return [];
  };

  return (
    <>
      {error
        ? (<ErrorMessage/>
        )
        : (
          <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                paddingLeft: 2,
                paddingRight: 2
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'background.paper' }}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png?20180806170715">
                <LockOutlinedIcon />
              </Avatar>

              <Typography component="h1" variant="h5" align="center">
                {locale.MAIN_HEADER}
              </Typography>

              <Box component="form" noValidate sx={{ mt: 3, mb: 5, width: 'inherit' }} onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={5}>
                    <TextField
                      error={inputError}
                      autoComplete="off"
                      name="userNameOrOrg"
                      required
                      fullWidth
                      id="username-input"
                      label={locale.USERNAME_OR_ORG_INPUT_LABEL}
                      autoFocus
                      value={state.userNameOrOrg}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel id="select-owner">{locale.OWNER_TYPE_SELECT_LABEL}</InputLabel>
                      <Select
                        labelId="select-owner"
                        id="owner-type"
                        name="ownerType"
                        value={state.ownerType}
                        label={locale.OWNER_TYPE_SELECT_LABEL}
                        onChange={handleChange}
                      >
                        <MenuItem value={locale.OWNER_TYPE.ALL.VALUE}>{locale.OWNER_TYPE.ALL.COPY}</MenuItem>
                        <MenuItem value={locale.OWNER_TYPE.OWNER.VALUE}>{locale.OWNER_TYPE.OWNER.COPY}</MenuItem>
                        <MenuItem value={locale.OWNER_TYPE.MEMBER.VALUE}>{locale.OWNER_TYPE.MEMBER.COPY}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Button
                      startIcon={<SearchIcon />}
                      type="submit"
                      variant="contained"
                      sx={{
                        mb: 2,
                        height: '100%',
                        [theme.breakpoints.up('xs')]: {
                          width: '100%',
                        }
                      }}
                    >
                      {locale.SEARCH_BUTTON}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              {
                isLoading && <LoadingSpinner />
              }
              {data?.data?.length && !isLoading ? (
                <TableGrid
                  rows={getRepositoryRows()}
                  totalRows={totalRows}
                  updateRepositoryRequest={dispatch}
                  repositoryState={state}
                />
              ) : (submittedValue && !formModified && !isLoading ? (
                  <Typography component="div" variant="h5" align="center">
                    {locale.NO_RESULTS}
                  </Typography>
                ) : null
              )}
            </Box>
          </Container>
        )}
    </>
  );
}
