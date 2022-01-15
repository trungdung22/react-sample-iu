import React, { Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import routeElements from './router/routeElements';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  window.onload = () => {
    setTimeout(() => {
      setIsLoaded(true);
      window.sessionStorage.setItem('windowOnLoad', 'true');
    }, 2000)
  }

  return (
    <>
      <div className={`fixed h-100vh w-full top-0 left-0 z-10 ${isLoaded ? 'hidden' : 'block'}`}>
        <div className='h-100vh absolute w-full top-0 left-0 bg-gray-010810'></div>
        <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center'>
          <p className='flex-shrink-0 w-full max-w-60 md:max-w-100 mr-4 md:mr-6'><img src="/assets/common/loading.gif" alt="loading" /></p>
          <p className='text-32 md:text-56 text-white font-bungee'>Millionsy</p>
        </div>
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
