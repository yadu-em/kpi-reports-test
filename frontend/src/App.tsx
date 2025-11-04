import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ReportView from './components/ReportView';
import './App.css';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<ReportView />} />
          <Route path="/report/:reportId" element={<ReportView />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;

