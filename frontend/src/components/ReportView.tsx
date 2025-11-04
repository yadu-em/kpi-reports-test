import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { REPORT_NAMES, DEFAULT_REPORT_ID } from '@/constants/reports';
import { useSalesData } from '@/hooks/useSalesData';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';
import './ReportView.css';

const ReportView = (): JSX.Element => {
  const { reportId } = useParams<{ reportId?: string }>();
  const navigate = useNavigate();
  
  // Only fetch sales data when reportId is 'sales-performance'
  const shouldFetchSales = reportId === 'sales-performance';
  const { data, loading, error, refetch } = useSalesData({ enabled: shouldFetchSales });

  useEffect(() => {
    // Redirect to first report if no reportId is provided
    if (!reportId) {
      navigate(`/report/${DEFAULT_REPORT_ID}`, { replace: true });
    }
  }, [reportId, navigate]);

  const reportName = reportId ? REPORT_NAMES[reportId] || 'Report' : 'Select a Report';

  // Don't render content if redirecting
  if (!reportId) {
    return (
      <div className="report-view">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="report-view">
      <div className="report-header">
        <h1>{reportName}</h1>
      </div>
      <div className="report-content">
        {shouldFetchSales && loading && <LoadingSpinner />}
        {shouldFetchSales && error && <ErrorMessage error={error} onRetry={refetch} />}
        {shouldFetchSales && !loading && !error && data && (
          <div className="report-details">
            <div className="report-data">
              <pre className="data-display">{JSON.stringify(data, null, 2)}</pre>
            </div>
          </div>
        )}
        {!shouldFetchSales && (
          <div className="report-placeholder">
            <p>Report content for {reportName} will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportView;

