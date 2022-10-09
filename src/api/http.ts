import Storage from '@react-native-async-storage/async-storage';
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
const server = 'https://amuzi.backend.upgrate.in/v1';

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Credentials': true,
  'X-Requested-With': 'XMLHttpRequest',
};

const injectToken = async (config: AxiosRequestConfig): AxiosRequestConfig => {
  try {
    const token = await Storage.getItem('access');

    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    throw new Error(error);
  }
};

class Http {
  private instance: AxiosInstance | null = null;
  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  // initializing the instance  for the first time
  initHttp() {
    const http = axios.create({
      baseURL: server,
      headers,
      // withCredentials: true,
    });
    http.interceptors.request.use(injectToken, error => Promise.reject(error));
    // will be used for injection token
    http.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: any) => {
        console.log(error.response.data, 'http error');
        const {response} = error;
        return this.handleError(response);
      },
    );
    this.instance = http;
    return http;
  }

  // defining the request method
  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }
  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  private handleError(error: any) {
    const {status, data} = error;
    switch (status) {
      case StatusCode.InternalServerError: {
        // Handle InternalServerError
        break;
      }
      case StatusCode.Forbidden: {
        // Handle Forbidden
        break;
      }
      case StatusCode.Unauthorized: {
        // Handle Unauthorized
        break;
      }
      case StatusCode.TooManyRequests: {
        // Handle TooManyRequests
        break;
      }
    }

    return Promise.reject(error);
  }
}

export default new Http();
