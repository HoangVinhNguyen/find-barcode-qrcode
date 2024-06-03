import React, { useState, useRef } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

const BarcodeScannerApp = () => {
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [targetBarcode, setTargetBarcode] = useState('');
  const videoRef = useRef(null);
  const reader = new BrowserMultiFormatReader();

  const handleScan = async () => {
    setScannedBarcode('');
    try {
      const result = await reader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
        if (result) {
          setScannedBarcode(result.text);
          reader.reset();
        }
        if (err && !(err instanceof NotFoundException)) {
          console.error(err);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setTargetBarcode(event.target.value);
  };

  const getBorderStyle = () => {
    if (!scannedBarcode || !targetBarcode) return {};
    if (scannedBarcode === targetBarcode) {
      return { borderColor: 'green', borderWidth: '5px' };
    } else {
      return { borderColor: 'red', borderWidth: '3px' };
    }
  };

  const widthWithoutScrollbar = window.innerWidth - document.documentElement.clientWidth;

  return (
    <div className="scanner-container">
      <video
        ref={videoRef}
        className="scanner-video"
      />
      <button className="scan-button" onClick={handleScan}>Bắt đầu quét</button>
      <div className="input-group">
        <label>Mã quét được: </label>
        <input type="text" value={scannedBarcode} readOnly className="scanned-barcode" />
      </div>
      <div className="input-group">
        <label>Mã cần tìm: </label>
        <input
          type="text"
          value={targetBarcode}
          onChange={handleInputChange}
          style={getBorderStyle()}
          className="target-barcode"
        />
      </div>
      <style jsx>{`
        .scanner-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        }
        .scanner-video {
        border: 1px solid black;
        width: 350px;
        height: 250px;
        object-fit: cover;
        margin-bottom: 10px;
        }
        .scan-button {
        padding: 10px 20px;
        margin-bottom: 10px;
        cursor: pointer;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        }
        .scan-button:hover {
        background-color: #0056b3;
        }
        .input-group {
        margin-bottom: 10px;
        display: block;
        }
        .scanned-barcode, .target-barcode {
        padding: 10px;
        margin-left: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        display: block;
        width: 100%;
        }
        .target-barcode {
        animation: none;
        }
        .target-barcode:focus {
        outline: none;
        border-color: #66afe9;
        box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
        }
        `}
      </style>
    </div>
  );
};

export default BarcodeScannerApp;