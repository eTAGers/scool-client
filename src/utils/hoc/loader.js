import React, { useState } from 'react';
import Loader from '../../components/Loader/index';

export const IsLoadingHOC = (WrappedComponent, loadingMessage) => {
  function HOC(props) {
    const [isLoading, setLoading] = useState(false);
    const setLoadingState = (isComponentLoading) => {
      setLoading(isComponentLoading);
    };
    return (
      <>
        {isLoading && <Loader loadingMessage={loadingMessage} />}
        <WrappedComponent {...props} setLoading={setLoadingState} />
      </>
    );
  }
  return HOC;
};
export default IsLoadingHOC;
