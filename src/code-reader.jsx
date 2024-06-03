import React, { useState, useRef } from 'react';
import { BrowserMultiFormatReader, NotFoundException  } from '@zxing/library';

const BarcodeScannerApp = () => {
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [targetBarcode, setTargetBarcode] = useState('');
  const videoRef = useRef(null);
  const reader = new BrowserMultiFormatReader();

  const handleScan = async () => {
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

  return (
    <div>
      <video
        ref={videoRef}
        style={{ border: '1px solid black' ,
        width: '300px',
        height: '200px', // Đặt chiều cao bằng với chiều rộng để tạo hình vuông
        objectFit: 'cover' // Đảm bảo video được phủ đầy khung hình mà không bị méo
        }}
      />
      <button onClick={handleScan}>Bắt đầu quét</button>
      <div>
        <label>Mã quét được: </label>
        <input type="text" value={scannedBarcode} readOnly />
      </div>
      <div>
        <label>Mã cần tìm: </label>
        <input
          type="text"
          value={targetBarcode}
          onChange={handleInputChange}
          style={getBorderStyle()}
        />
      </div>
    </div>
  );
};

export default BarcodeScannerApp;