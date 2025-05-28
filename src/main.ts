// src/main.ts
import { detectAppleDevice } from 'detect-apple-device';
import './style.css';

// Types are included in the detect-apple-device package
type DetectionOptions = Parameters<typeof detectAppleDevice>[0];
type DetectionResult = ReturnType<typeof detectAppleDevice>;
type MatchedDevice = DetectionResult['matches'][0];

interface DeviceMetrics {
  logicalWidth: number;
  logicalHeight: number;
  scaleFactor: number;
}

// DOM elements
const screenDimensions = document.getElementById('screen-dimensions')!;
const pixelRatio = document.getElementById('pixel-ratio')!;
const orientation = document.getElementById('orientation')!;
const detectionResults = document.getElementById('detection-results')!;
const manualResults = document.getElementById('manual-results')!;

const widthInput = document.getElementById('width') as HTMLInputElement;
const heightInput = document.getElementById('height') as HTMLInputElement;
const scaleInput = document.getElementById('scale') as HTMLSelectElement;
const testManualBtn = document.getElementById('test-manual')!;

const confidenceSlider = document.getElementById(
  'confidence'
) as HTMLInputElement;
const confidenceValue = document.getElementById('confidence-value')!;
const phoneCheckbox = document.getElementById('phone') as HTMLInputElement;
const tabletCheckbox = document.getElementById('tablet') as HTMLInputElement;
const watchCheckbox = document.getElementById('watch') as HTMLInputElement;
const minDateInput = document.getElementById('min-date') as HTMLInputElement;
const applyConfigBtn = document.getElementById('apply-config')!;

// Display current device metrics
function updateDeviceInfo() {
  const metrics = {
    logicalWidth: window.screen.width,
    logicalHeight: window.screen.height,
    scaleFactor: window.devicePixelRatio || 1,
  };

  screenDimensions.textContent = `${metrics.logicalWidth} × ${metrics.logicalHeight}px`;
  pixelRatio.textContent = `${metrics.scaleFactor}x`;

  const isLandscape = metrics.logicalWidth > metrics.logicalHeight;
  orientation.textContent = isLandscape ? 'Landscape' : 'Portrait';
}

// Render detection results
function renderResults(result: DetectionResult, container: HTMLElement) {
  if (result.matches.length === 0) {
    container.innerHTML =
      '<div class="no-matches">No matching Apple devices found</div>';
    return;
  }

  const html = result.matches
    .map(
      (match) => `
    <div class="device-match">
      <div class="device-name">
        ${match.device.name}
        <span class="confidence-badge">${Math.round(
          match.confidence * 100
        )}% match</span>
      </div>
      <div class="device-info">
        <span>Type: ${match.device.type}</span>
        <span>Release: ${match.device.release_date}</span>
        <span>Screen: ${match.device.screen.diagonal_inches}"</span>
        <span>PPI: ${match.device.screen.ppi}</span>
        <span>Ratio: ${match.device.screen.aspect_ratio}</span>
        <span>Scale: ${match.device.screen.scale_factor}x</span>
      </div>
    </div>
  `
    )
    .join('');

  container.innerHTML = html;
}

// Get current configuration
function getCurrentConfig(): DetectionOptions {
  const deviceTypes: string[] = [];
  if (phoneCheckbox.checked) deviceTypes.push('phone');
  if (tabletCheckbox.checked) deviceTypes.push('tablet');
  if (watchCheckbox.checked) deviceTypes.push('watch');

  return {
    deviceTypes,
    minReleaseDate: minDateInput.value,
    minConfidence: parseFloat(confidenceSlider.value),
  };
}

// Perform automatic detection
function performAutoDetection() {
  const config = getCurrentConfig();
  const result = detectAppleDevice(config);
  renderResults(result, detectionResults);
}

// Event listeners
confidenceSlider.addEventListener('input', () => {
  confidenceValue.textContent = parseFloat(confidenceSlider.value).toFixed(1);
});

testManualBtn.addEventListener('click', () => {
  const metrics: DeviceMetrics = {
    logicalWidth: parseInt(widthInput.value),
    logicalHeight: parseInt(heightInput.value),
    scaleFactor: parseInt(scaleInput.value),
  };

  const config = getCurrentConfig();
  const result = detectAppleDevice.identify(metrics, config);
  renderResults(result, manualResults);
});

applyConfigBtn.addEventListener('click', () => {
  performAutoDetection();
});

// Initialize
updateDeviceInfo();
performAutoDetection();

// Update on resize
window.addEventListener('resize', () => {
  updateDeviceInfo();
  performAutoDetection();
});
