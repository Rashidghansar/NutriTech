import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { isMobile } from 'react-device-detect';
import jsQR from 'jsqr';

// Icons
import { 
  CameraIcon, 
  LightBulbIcon, 
  ArrowsRightLeftIcon, 
  XMarkIcon 
} from '@heroicons/react/24/solid';

const BarcodeScanner: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const [hasTorch, setHasTorch] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [cameraFacingMode, setCameraFacingMode] = useState<'user' | 'environment'>('environment');
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start camera stream
  const startCamera = async () => {
    try {
      const constraints: MediaStreamConstraints = {
        video: { 
          facingMode: cameraFacingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        // Check for torch capability
        const videoTrack = stream.getVideoTracks()[0];
        const capabilities = videoTrack.getCapabilities();
        setHasTorch('torch' in capabilities);
      }

      setScanning(true);
      startBarcodeScanning();
    } catch (err) {
      console.error('Camera access error:', err);
      setError('Unable to access camera. Please check permissions.');
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    setScanning(false);
  };

  // Toggle torch
  const toggleTorch = async () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      try {
        await videoTrack.applyConstraints({
          advanced: [{ torch: !torchOn } as any]
        });
        setTorchOn(!torchOn);
      } catch (err) {
        console.error('Torch toggle error:', err);
      }
    }
  };

  // Switch camera (front/back)
  const switchCamera = () => {
    stopCamera();
    setCameraFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  // Barcode scanning logic
  const startBarcodeScanning = () => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    let scanAttempts = 0;
    const MAX_SCAN_ATTEMPTS = 10; // About 5 seconds of scanning

    scanIntervalRef.current = setInterval(() => {
      if (context && video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          // Successful barcode scan
          if ('vibrate' in navigator) {
            navigator.vibrate(200); // Vibrate on successful scan
          }
          stopCamera();
          navigate(`/product/${code.data}`);
          return;
        }

        scanAttempts++;
        if (scanAttempts >= MAX_SCAN_ATTEMPTS) {
          stopCamera();
          setError('No barcode found. Please try manual input.');
        }
      }
    }, 300);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [cameraFacingMode]);

  // Trigger camera start when component mounts or camera mode changes
  useEffect(() => {
    if (scanning) {
      startCamera();
    }
  }, [scanning, cameraFacingMode]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white shadow-xl rounded-xl p-6"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-brand-primary">
          Scan Barcode
        </h1>

        {/* Camera Preview */}
        <div className="relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden mb-6">
          {scanning ? (
            <>
              <video 
                ref={videoRef} 
                className="absolute inset-0 w-full h-full object-cover"
                playsInline 
                muted 
              />
              <canvas 
                ref={canvasRef} 
                className="hidden" 
              />
              <div className="absolute inset-0 border-4 border-brand-primary rounded-lg viewfinder-pulse pointer-events-none"></div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <CameraIcon className="h-16 w-16 text-gray-500" />
              <p className="ml-4 text-gray-600">Camera not active</p>
            </div>
          )}
        </div>

        {/* Camera Controls */}
        <div className="flex justify-between items-center mb-6">
          {hasTorch && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTorch}
              className={`p-2 rounded-full ${
                torchOn ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'
              }`}
              aria-label={torchOn ? 'Turn off torch' : 'Turn on torch'}
            >
              <LightBulbIcon className="h-6 w-6" />
            </motion.button>
          )}

          {isMobile && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={switchCamera}
              className="p-2 bg-gray-100 text-gray-600 rounded-full"
              aria-label="Switch camera"
            >
              <ArrowsRightLeftIcon className="h-6 w-6" />
            </motion.button>
          )}
        </div>

        {/* Error or Status Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center"
          >
            {error}
            <button 
              onClick={() => {
                setError('');
                setScanning(true);
              }}
              className="ml-2 underline"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* Manual Input Button */}
        <div className="space-y-4">
          <button 
            onClick={() => navigate('/manual-scan')}
            className="w-full bg-brand-secondary text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Manual Barcode Entry
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default BarcodeScanner; 