import { useEffect, useState } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import BarcodeScannerApp from './code-reader';

function App() {

  return (
    <div>
      <BarcodeScannerApp />
    </div>
  )
}

export default App
