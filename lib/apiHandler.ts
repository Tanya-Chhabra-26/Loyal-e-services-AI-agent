let retryCount = 0;

const BASE_URL = 'https://admin.loyaleservices.com/api/v1/';

interface HitApiParams {
  api: string;
  method: 'GET' | 'POST';
  params?: Record<string, any>;
  authHeaders?: any;
  showLoader?: (loading: boolean) => void;
  successCallBack?: (response: any) => void; // Made optional
  failureCallBack?: (error: any) => void;
}

const MAX_RETRY_COUNT = 3;
const RETRY_DELAY = 3000;

export const hitApi = (options: HitApiParams) => {
  const {
    api,
    method,
    params = {},
    authHeaders,
    showLoader,
    successCallBack,
    failureCallBack,
  } = options;

  const finalUrl =
    method === 'GET' && Object.keys(params).length
      ? `${BASE_URL}${api}?${new URLSearchParams(params).toString()}`
      : `${BASE_URL}${api}`;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...authHeaders
    },
  };

  if (method === 'POST') {
    fetchOptions.body = JSON.stringify(params);
  }

  if (showLoader) showLoader(true);

  fetch(finalUrl, fetchOptions)
    .then(res => res.json())
    .then(json => {
      retryCount = 0;
      if (showLoader) showLoader(false);
      if (json.success === true || json.status === 'success' || json.status === true) {
        successCallBack?.(json); // Safe call
      } else {
        failureCallBack?.(json);
      }
    })
    .catch(error => {
      retryCount++;
      if (retryCount < MAX_RETRY_COUNT) {
        setTimeout(() => hitApi(options), 1000); 
      } else {
        if (showLoader) showLoader(false);
        setTimeout(() => {
          if (failureCallBack) {
            failureCallBack({ isComingFromException: true });
          } else {
            alert('Something went wrong');
          }
        }, RETRY_DELAY);
      }
    });
};
