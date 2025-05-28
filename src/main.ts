import './style.css';

interface DeviceMetrics {
  logicalWidth: number;
  logicalHeight: number;
  scaleFactor: number;
}

interface DetectionOptions {
  deviceTypes?: string[];
  minReleaseDate?: string;
  minConfidence?: number;
  useWidth?: boolean;
  useHeight?: boolean;
  useScaleFactor?: boolean;
  orientation?: 'auto' | 'portrait' | 'landscape';
}

interface MatchedDevice {
  device: {
    name: string;
    type: string;
    release_date: string;
    screen: {
      diagonal_inches: number;
      ppi: number;
      scale_factor: number;
      aspect_ratio: string;
      resolution: {
        logical: { width: number; height: number };
        physical: { width: number; height: number };
      };
    };
  };
  confidence: number;
  matchDetails: {
    widthMatch: boolean;
    heightMatch: boolean;
    scaleFactorMatch: boolean;
  };
}

interface DetectionResult {
  matches: MatchedDevice[];
}

// Mock implementation of detect-apple-device for demo purposes
// In a real implementation, you would: npm install detect-apple-device
class AppleDeviceDetector {
  private devices = [
    {
      name: 'iPhone 15 Pro',
      type: 'phone',
      release_date: '2023-09-22',
      screen: {
        diagonal_inches: 6.1,
        ppi: 460,
        scale_factor: 3,
        aspect_ratio: '19.5:9',
        resolution: {
          logical: { width: 393, height: 852 },
          physical: { width: 1179, height: 2556 },
        },
      },
    },
    {
      name: 'iPhone 15',
      type: 'phone',
      release_date: '2023-09-22',
      screen: {
        diagonal_inches: 6.1,
        ppi: 460,
        scale_factor: 3,
        aspect_ratio: '19.5:9',
        resolution: {
          logical: { width: 393, height: 852 },
          physical: { width: 1179, height: 2556 },
        },
      },
    },
    {
      name: 'iPhone 14 Pro',
      type: 'phone',
      release_date: '2022-09-16',
      screen: {
        diagonal_inches: 6.1,
        ppi: 460,
        scale_factor: 3,
        aspect_ratio: '19.5:9',
        resolution: {
          logical: { width: 393, height: 852 },
          physical: { width: 1179, height: 2556 },
        },
      },
    },
    {
      name: 'iPad Pro 12.9" (6th gen)',
      type: 'tablet',
      release_date: '2022-10-18',
      screen: {
        diagonal_inches: 12.9,
        ppi: 264,
        scale_factor: 2,
        aspect_ratio: '4:3',
        resolution: {
          logical: { width: 1024, height: 1366 },
          physical: { width: 2048, height: 2732 },
        },
      },
    },
    {
      name: 'Apple Watch Series 9 (45mm)',
      type: 'watch',
      release_date: '2023-09-22',
      screen: {
        diagonal_inches: 1.9,
        ppi: 396,
        scale_factor: 2,
        aspect_ratio: '1:1',
        resolution: {
          logical: { width: 484, height: 396 },
          physical: { width: 484, height: 396 },
        },
      },
    },
  ];

  detect(options: DetectionOptions = {}): DetectionResult {
    const metrics = this.getCurrentMetrics();
    return this.identify(metrics, options);
  }

  identify(
    metrics: DeviceMetrics,
    options: DetectionOptions = {}
  ): DetectionResult {
    const {
      deviceTypes = [],
      minReleaseDate = '',
      minConfidence = 1,
      useWidth = true,
      useHeight = true,
      useScaleFactor = true,
    } = options;

    const matches: MatchedDevice[] = [];

    for (const device of this.devices) {
      // Filter by device type
      if (deviceTypes.length > 0 && !deviceTypes.includes(device.type)) {
        continue;
      }

      // Filter by release date
      if (minReleaseDate && device.release_date < minReleaseDate) {
        continue;
      }

      // Calculate match confidence
      let totalChecks = 0;
      let matchingChecks = 0;
      const matchDetails = {
        widthMatch: false,
        heightMatch: false,
        scaleFactorMatch: false,
      };

      if (useWidth) {
        totalChecks++;
        const widthMatch =
          device.screen.resolution.logical.width === metrics.logicalWidth ||
          device.screen.resolution.logical.height === metrics.logicalWidth;
        if (widthMatch) {
          matchingChecks++;
          matchDetails.widthMatch = true;
        }
      }

      if (useHeight) {
        totalChecks++;
        const heightMatch =
          device.screen.resolution.logical.height === metrics.logicalHeight ||
          device.screen.resolution.logical.width === metrics.logicalHeight;
        if (heightMatch) {
          matchingChecks++;
          matchDetails.heightMatch = true;
        }
      }

      if (useScaleFactor) {
        totalChecks++;
        if (device.screen.scale_factor === metrics.scaleFactor) {
          matchingChecks++;
          matchDetails.scaleFactorMatch = true;
        }
      }

      const confidence = totalChecks > 0 ? matchingChecks / totalChecks : 0;

      if (confidence >= minConfidence) {
        matches.push({
          device,
          confidence,
          matchDetails,
        });
      }
    }

    return { matches: matches.sort((a, b) => b.confidence - a.confidence) };
  }

  private getCurrentMetrics(): DeviceMetrics {
    return {
      logicalWidth: window.screen.width,
      logicalHeight: window.screen.height,
      scaleFactor: window.devicePixelRatio || 1,
    };
  }
}

// Initialize the detector
const detector = new AppleDeviceDetector();

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
  const result = detector.detect(config);
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
  const result = detector.identify(metrics, config);
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
