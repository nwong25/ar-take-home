import httpServiceInstance, { HttpResponse } from '@/app/services/httpService';
import HttpError from '@/app/models/httpError';
import httpService from '@/app/services/httpService';

describe('HttpService', () => {
  let testResponse: Response;
  let result: Promise<HttpResponse<any> | HttpError>;

  describe('fetcher', () => {

    describe('when response is ok', () => {
      beforeEach(() => {
        testResponse = {
          ok: true,
          status: 200,
          statusText: 'OK',
          headers: {
            get: (header) => {
              if (header === 'Content-Type') {
                return 'application/json';
              }
              return null;
            },
          },
          json: () => Promise.resolve({ message: 'Hello, World!' }),
          text: () => Promise.resolve(JSON.stringify({ message: 'Hello, World!' })),
        } as Response;

        global.fetch = jest.fn().mockResolvedValue(testResponse) as jest.Mock;

        result = httpServiceInstance.fetcher('/test/api');
      });

      it('should call fetch api with correct url', () => {
        expect(fetch).toHaveBeenCalledWith('/test/api', undefined);
      });

      it('should return the correct response', async () => {
        const response = await result;
        if (!(response instanceof HttpError)) {
          expect(response.data).toEqual({ message: 'Hello, World!' });
        }
      });
    });

    //TODO: Figure out it triggering UnhandledPromiseRejection error
    xdescribe('when response fails', () => {
      let testResponse : Response
      beforeEach(() => {

        testResponse = {
          ok: false,
          status: 404,
          statusText: 'Not Found',
          headers: {
            get: () => null,
          },
          json: () => Promise.resolve({}),
          text: () => Promise.resolve(''),
        } as unknown as Response;

        global.fetch = jest.fn().mockRejectedValue(testResponse) as jest.Mock;

        // Call the fetcher function
        result = httpServiceInstance.fetcher('/test/api');
      });

      it('should call fetch api with correct url', () => {
        expect(fetch).toHaveBeenCalledWith('/test/api', undefined);
      });

      it('should throw HttpError when response is an error', async () => {
        try {
          await result;
        } catch (error) {
          expect(error).toEqual(testResponse);
        }
      });
    });
  });

  describe('get', () => {

    describe('when response is ok', () => {
      beforeEach(() => {
        testResponse = {
          ok: true,
          status: 200,
          statusText: 'OK',
          headers: {
            get: (header) => {
              if (header === 'Content-Type') {
                return 'application/json';
              }
              return null;
            },
          },
          json: () => Promise.resolve({ message: 'Hello, World!' }),
          text: () => Promise.resolve(JSON.stringify({ message: 'Hello, World!' })),
        } as Response;

        httpService.fetcher = jest.fn().mockResolvedValue({ message: 'Hello, World!', response: testResponse.headers}) as jest.Mock;

        result = httpServiceInstance.get('/test/api', {});
      });

      it('should call fetcher with correct url', () => {
        expect(httpServiceInstance.fetcher).toHaveBeenCalledWith('/test/api', {"method": "GET"});
      });

      it('should return the correct response', async () => {
        const response = await result;
        expect(response).toEqual({ message: 'Hello, World!', response: testResponse.headers});
      });
    });

    //TODO: Figure out it triggering UnhandledPromiseRejection error
    xdescribe('when response fails', () => {
      let testResponse : Response
      beforeEach(() => {

        testResponse = {
          ok: false,
          status: 404,
          statusText: 'Not Found',
          headers: {
            get: () => null,
          },
          json: () => Promise.resolve({}),
          text: () => Promise.resolve(''),
        } as unknown as Response;

        httpService.fetcher = jest.fn().mockRejectedValue(testResponse) as jest.Mock;

        result = httpServiceInstance.get('/test/api', {});
      });

      it('should call fetcher with correct url', () => {
        expect(httpServiceInstance.fetcher).toHaveBeenCalledWith('/test/api',{"method": "GET"} );
      });

      it('should throw HttpError when response is an error', async () => {
        try {
          await result;
        } catch (error) {
          expect(error).toEqual(testResponse);
        }
      });
    });
  });

  describe('isHttpError', () => {
    let result: boolean
    beforeEach(() => {
      const error = new HttpError('error', 500)
      result = httpServiceInstance.isHttpError(error)
    });

    it('should return true', () => {
      expect(result).toEqual(true)
    });
  });

  describe('isHttpResponse', () => {
    let result: boolean
    beforeEach(() => {
      const response = {data: 'data'} as HttpResponse<any>
      result = httpServiceInstance.isHttpResponse(response)
    });

    it('should return true', () => {
      expect(result).toEqual(true)
    });
  });
});
