import { API_REQUEST } from '../constants/api';

export const apiRequest = ({
  method,
  url,
  headers,
  body,
  onSuccess,
  onFailure,
  onError,
}) => ({
  type: API_REQUEST,
  payload: {
    url,
    method,
    headers,
    body,
    onSuccess,
    onError,
    onFailure,
  },
});
