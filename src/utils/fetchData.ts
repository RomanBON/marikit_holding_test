import { Dispatch } from 'react';


export default function fetchData(
  fetchFunction: () => IRequestPromise,
  dispatch: Dispatch<IAction>,
  asyncActionsTypes: any[],
  isSilent?: boolean,
): IRequestPromise {
  const [requestAction, successAction, failAction] = asyncActionsTypes;
  if (!isSilent) {
    dispatch({ type: requestAction });
  }

  const fetchResult = async() => {
    try {
      const result = await fetchFunction();
      dispatch({ type: successAction, payload: result.data });

      return result.data;
    } catch (error) {
      dispatch({ type: failAction, payload: error });

      throw error;
    }
  };

  return fetchResult();
}
