import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { REPORT_NAMES, DEFAULT_REPORT_ID } from '@/constants/reports';
import { useOrderDetails } from '@/hooks/useOrderDetails';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';
import DateFilter from './DateFilter';
import DataTable from './DataTable';
import './ReportView.css';

const ReportView = (): JSX.Element => {
  const { reportId } = useParams<{ reportId?: string }>();
  const navigate = useNavigate();
  
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(50);

  const { data, loading, error, refetch, updateFilters } = useOrderDetails({
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
    page,
    perPage,
  });

  useEffect(() => {
    // Redirect to first report if no reportId is provided
    if (!reportId) {
      navigate(`/${DEFAULT_REPORT_ID}`, { replace: true });
    }
  }, [reportId, navigate]);

  useEffect(() => {
    // Initialize dates on mount (last 7 days)
    if (!fromDate && !toDate && reportId === 'order-details') {
      const today = new Date();
      const weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 7);
      
      const from = weekAgo.toISOString().split('T')[0];
      const to = today.toISOString().split('T')[0];
      
      setFromDate(from);
      setToDate(to);
      updateFilters({ fromDate: from, toDate: to });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportId]);

  const reportName = reportId ? REPORT_NAMES[reportId] || 'Report' : 'Select a Report';
  const isOrderDetails = reportId === 'order-details';

  const handleFilterChange = (from: string, to: string) => {
    setFromDate(from);
    setToDate(to);
    setPage(1);
    updateFilters({ fromDate: from, toDate: to, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateFilters({ page: newPage });
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setPage(1);
    updateFilters({ perPage: newPerPage, page: 1 });
  };

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
        {isOrderDetails ? (
          <>
            {error && <ErrorMessage error={error} onRetry={refetch} />}
            {!error && (
              <>
                <DateFilter
                  onFilterChange={handleFilterChange}
                  initialFromDate={fromDate}
                  initialToDate={toDate}
                />
                {loading && !data ? (
                  <LoadingSpinner />
                ) : data ? (
                  <DataTable
                    data={data.items}
                    loading={loading}
                    page={data.page}
                    perPage={data.perPage}
                    totalItems={data.totalItems}
                    totalPages={data.totalPages}
                    onPageChange={handlePageChange}
                    onPerPageChange={handlePerPageChange}
                  />
                ) : null}
              </>
            )}
          </>
        ) : (
          <div className="report-placeholder">
            <p>Report content for {reportName} will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportView;
