import TransactionDetail from './components/transaction_details'

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <div className="bkg-transparent"></div> */}
        <h1>Transactional Details</h1>
      </header>
      <TransactionDetail/>
    </div>
  );
}

export default App;
