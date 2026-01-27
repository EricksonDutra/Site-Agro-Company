import ErrorBoundary from '@components/shared/ErrorBoundary';
import Home from '@pages/Home';
import '@styles/global.scss';

function App() {
  return (
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  );
}

export default App;
