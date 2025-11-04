import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ReportView from './components/ReportView';

function App() {
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
}

export default App;
