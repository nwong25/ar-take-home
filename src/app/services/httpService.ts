import HttpError from '@/app/models/httpError';

export interface HttpResponse<T> extends Response {
  data: T;
  headers: Response["headers"]
}

class HttpService {
  fetcher: <T>(url: string, config?: RequestInit) => Promise<HttpResponse<T>>;

  constructor() {

    this.fetcher = async <T>(url: string, config?: RequestInit): Promise<HttpResponse<T>> => {
      const response = await fetch(url, config);
      if (!response.ok) {
        const error = await response.json();
        throw new HttpError(error.message || 'An error occurred', error.status || 500);
      }
      const data = await response.json();
      return {
        data,
        headers: response.headers
      } as HttpResponse<T>;
    };
  }

  async get<T>(url: string, config: RequestInit): Promise<HttpResponse<T> | HttpError> {
    const updatedConfig = {
      method: 'GET',
      ...config
    };
    try {
      return await this.fetcher<T>(url, updatedConfig);
    } catch (error: any) {
      throw error;
    }
  }

  isHttpError(response: HttpResponse<any> | HttpError): response is HttpError {
    return response instanceof HttpError;
  }

  isHttpResponse<T>(response: HttpResponse<T> | HttpError): response is HttpResponse<T> {
    return (response as HttpResponse<T>).data !== undefined;
  }
}

const httpServiceInstance = new HttpService();
export default httpServiceInstance;