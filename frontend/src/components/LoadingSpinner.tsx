import './LoadingSpinner.css';

const LoadingSpinner = (): JSX.Element => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading data...</p>
    </div>
  );
};

export default LoadingSpinner;

