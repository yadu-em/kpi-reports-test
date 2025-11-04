import { useParams } from 'react-router-dom';
import './ReportView.css';

const REPORT_NAMES = {
  'sales-performance': 'Sales Performance',
};

function ReportView() {
  const { reportId } = useParams();
  const reportName = reportId ? REPORT_NAMES[reportId] || 'Report' : 'Select a Report';

  return (
    <div className="report-view">
      <div className="report-header">
        <h1>{reportName}</h1>
      </div>
      <div className="report-content">
        {reportId ? (
          <div className="report-details">
            <p>Report content for {reportName} will be displayed here.</p>
          </div>
        ) : (
          <div className="report-placeholder">
            <p>Please select a report from the sidebar to view its details.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportView;

