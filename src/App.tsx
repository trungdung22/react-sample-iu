import React, { Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import routeElements from './router/routeElements';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoaded(true);
  //   }, 750)
  // }, [])
  window.onload = () => {
    
    setTimeout(() => {
      setIsLoaded(true);
    }, 1500)
  }
  return (
    <>
      <div className={`fixed h-100vh w-full top-0 left-0 z-1000 ${isLoaded ? 'hidden' : 'block'}`}>
        <div className='h-full absolute w-full top-0 left-0 bg-gray-600'></div>
        <p className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-full z-1000 max-w-110'><img src="/assets/common/loading.gif" alt="loading" /></p>
      </div>
      <Suspense fallback={() => {}}>
        <Router>
          <Switch>
            {routeElements()}
            <Route>
              <div>404</div>
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </>
    
  );
}

export default App;
