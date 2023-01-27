
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Form from './components/Form';
import Container from './components/layout/Container';
import Footer from './components/layout/Footer';

function App() {


  return (
    <div>
      <Router>
        <Container customClass="min-height">
          <Form />
        </Container>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
