import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DefaultOptions, QueryKey, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import IndexPage from './pages';
import ContactPage from './pages/Contact';

/** React Query Settings */

const BASE_API_URL = 'https://api.github.com/';

type RequestPayload = Record<string, unknown> | FormData | Blob;

interface FetchApiParams<TRequest = RequestPayload> {
  resourceUrl: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: TRequest;
  headers?: Record<string, string>;
}

const fetchApi = async <TResponseData = void, TError = unknown, TRequest = RequestPayload>({
  resourceUrl,
  method,
  body,
  headers,
}: FetchApiParams<TRequest>) => {
  try {
    const url = new URL(
      resourceUrl.startsWith('/') ? `.${resourceUrl}` : `./${resourceUrl}`,
      BASE_API_URL,
    );

    const response = await fetch(url.toString(), {
      method,
      headers: {
        Accept: 'application/json',
        ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    const data = await response.json();

    if (response.ok) {
      return data as TResponseData;
    }
  } catch (error) {
    throw error as TError;
  }
};

const defaultQueryFn = async <TResponseData = void, TError = unknown>(
  url: string,
  options?: Omit<FetchApiParams, 'resourceUrl' | 'body'>,
) => {
  try {
    const responseData = await fetchApi<TResponseData, TError>({
      resourceUrl: url,
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
      ...(options ?? {}),
    });

    return responseData;
  } catch (error) {
    throw error;
  }
};

export const defaultMutationFn = async <
  TResponseData = void,
  TError = unknown,
  TRequest = RequestPayload,
>(
  url: string,
  options?: Omit<FetchApiParams<TRequest>, 'resourceUrl'>,
) => {
  try {
    const responseData = await fetchApi<TResponseData, TError, TRequest>({
      resourceUrl: url,
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
      ...(options ?? {}),
    });

    return responseData;
  } catch (error) {
    throw error;
  }
};

const ensureStringifyQueryKey = (queryKey: QueryKey): queryKey is (string | number)[] => {
  return (
    Array.isArray(queryKey) &&
    queryKey.length > 0 &&
    queryKey.every((val) => typeof val === 'string' || typeof val === 'number')
  );
};

const queryClientConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async ({ queryKey }) => {
      if (ensureStringifyQueryKey(queryKey)) {
        return defaultQueryFn(queryKey.join('/'));
      }
      throw new Error('Invalid QueryKey');
    },
  },
};

/** React Router Settings */

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
  },
  {
    path: 'contacts/:contactId',
    element: <ContactPage />,
  },
]);

const App = () => {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: queryClientConfig,
        // queryCache: new QueryCache({ onError: () => {} }),
        // mutationCache: new MutationCache({ onError: () => {} }),
      }),
    [],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
