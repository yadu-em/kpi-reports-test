import { useMemo } from 'react';
import type { OrderDetailItem } from '@/types';
import './DataTable.css';

interface DataTableProps {
  data: OrderDetailItem[];
  loading?: boolean;
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

const DataTable = ({
  data,
  loading = false,
  page,
  perPage,
  totalItems,
  totalPages,
  onPageChange,
  onPerPageChange,
}: DataTableProps): JSX.Element => {
  const startItem = useMemo(() => (page - 1) * perPage + 1, [page, perPage]);
  const endItem = useMemo(() => Math.min(page * perPage, totalItems), [page, perPage, totalItems]);

  const formatValue = (value: string | number | null): string => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'number') return value.toLocaleString();
    return value;
  };

  return (
    <div className="data-table-container">
      <div className="data-table-header">
        <div className="table-info">
          Showing {startItem} to {endItem} of {totalItems} entries
        </div>
        <div className="per-page-selector">
          <label htmlFor="per-page">Items per page:</label>
          <select
            id="per-page"
            value={perPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Job Number</th>
              <th>SO Number</th>
              <th>SO Line Number</th>
              <th>Drawing Tag</th>
              <th>Job Qty</th>
              <th>Job Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="loading-cell">
                  <div className="table-loading">Loading data...</div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty-cell">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={`${item.jobNumber}-${index}`}>
                  <td>{formatValue(item.jobNumber)}</td>
                  <td>{formatValue(item.soNumber)}</td>
                  <td>{formatValue(item.soLineNumber)}</td>
                  <td>{formatValue(item.drawingTag)}</td>
                  <td>{formatValue(item.jobQty)}</td>
                  <td>
                    <span className={`status-badge status-${item.jobStatus?.toLowerCase() || 'unknown'}`}>
                      {formatValue(item.jobStatus)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            type="button"
          >
            Previous
          </button>
          <div className="pagination-info">
            Page {page} of {totalPages}
          </div>
          <button
            className="pagination-btn"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            type="button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;

