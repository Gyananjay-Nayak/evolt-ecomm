import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import routes from './routes/allRoutes';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          {routes.map((eachComponent) => (
            <Route
              path={eachComponent.path}
              element={eachComponent.component}
              key={eachComponent.path}
            />
          ))}
          <Route path="/" element={<Navigate to="products" replace />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
