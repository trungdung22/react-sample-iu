import { Route } from 'react-router-dom';
import routes from './routes';

const routeElements = () => routes.map(({
  LoadComponent,
  path,
  title,
  ...rest
}) => {
  return (
    <Route key={path} path={`${path}`} {...rest}>
      <LoadComponent />
    </Route>
  );
});

export default routeElements;
