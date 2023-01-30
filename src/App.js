
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Form from './components/Form';

import Footer from './components/layout/Footer';

function App() {


  return (
    <>
      <Router>
        <Form />
      </Router>
      <Footer />
    </>
  );
};

export default App;
