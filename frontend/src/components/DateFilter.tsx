import { useState, useEffect } from 'react';
import './DateFilter.css';

interface DateFilterProps {
  onFilterChange: (fromDate: string, toDate: string) => void;
  initialFromDate?: string;
  initialToDate?: string;
}

const DateFilter = ({ onFilterChange, initialFromDate, initialToDate }: DateFilterProps): JSX.Element => {
  const getLastWeekDates = () => {
    const today = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);
    
    return {
      from: weekAgo.toISOString().split('T')[0],
      to: today.toISOString().split('T')[0],
    };
  };

  const defaultDates = getLastWeekDates();
  const [fromDate, setFromDate] = useState<string>(initialFromDate || defaultDates.from);
  const [toDate, setToDate] = useState<string>(initialToDate || defaultDates.to);

  useEffect(() => {
    if (initialFromDate || initialToDate) {
      setFromDate(initialFromDate || defaultDates.from);
      setToDate(initialToDate || defaultDates.to);
    }
  }, [initialFromDate, initialToDate]);

  const handleApply = () => {
    if (fromDate && toDate) {
      onFilterChange(fromDate, toDate);
    }
  };

  const handleReset = () => {
    const dates = getLastWeekDates();
    setFromDate(dates.from);
    setToDate(dates.to);
    onFilterChange(dates.from, dates.to);
  };

  return (
    <div className="date-filter">
      <div className="date-filter-header">
        <h3>Filter by Date</h3>
      </div>
      <div className="date-filter-controls">
        <div className="date-input-group">
          <label htmlFor="from-date">From Date</label>
          <input
            id="from-date"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            max={toDate}
          />
        </div>
        <div className="date-input-group">
          <label htmlFor="to-date">To Date</label>
          <input
            id="to-date"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            min={fromDate}
          />
        </div>
        <div className="date-filter-actions">
          <button className="btn-apply" onClick={handleApply} type="button">
            Apply
          </button>
          <button className="btn-reset" onClick={handleReset} type="button">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateFilter;

