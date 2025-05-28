# Apple Device Detection Demo

> Interactive demo website for the `detect-apple-device` npm package

A modern, responsive web application that demonstrates the capabilities of the `detect-apple-device` library. Test Apple device detection in real-time with your current device or manually input custom screen specifications.

## 🚀 Features

- **🔍 Real-time Detection** - Automatically detects your current Apple device based on screen metrics
- **🛠️ Manual Testing** - Input custom dimensions and scale factors to test different devices
- **⚙️ Configuration Options** - Adjust confidence thresholds, device type filters, and release date ranges
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **🎨 Modern UI** - Clean, Apple-inspired interface with smooth animations

## 📦 Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone or download the project files
# Navigate to the project directory

# Install dependencies
npm install

# Start development server
npm run dev
```

The demo will be available at `http://localhost:5173`

## 🛠️ Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type checking
npm run type-check
```

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── package.json        # Project configuration
├── src/
│   ├── main.ts         # Main TypeScript application logic
│   ├── style.css       # Styles and responsive design
│   └── vite-env.d.ts   # Vite type definitions
└── README.md           # This file
```

## 🔧 How It Works

The demo showcases the `detect-apple-device` package functionality:

### Automatic Detection

- Reads current browser screen dimensions using `window.screen.width/height`
- Gets device pixel ratio via `window.devicePixelRatio`
- Matches against comprehensive Apple device database

### Manual Testing

- Input custom logical width and height
- Select scale factor (1x, 2x, 3x)
- Test specific device configurations

### Configuration Options

- **Confidence Threshold**: Adjust minimum match confidence (0-100%)
- **Device Types**: Filter by iPhone, iPad, Apple Watch
- **Release Date**: Show only devices released after specific date

## 🎯 What Gets Detected

The library includes specifications for:

- **📱 iPhones**: All models from original iPhone to iPhone 16 series
- **📱 iPad**: All iPad variants including Pro, Air, Mini
- **⌚ Apple Watch**: Series 0 through Series 10, SE, Ultra models
- **🎵 iPod Touch**: Legacy devices from 1st to 7th generation

## 🔒 Privacy & Security

- **No tracking**: Uses only standard browser APIs
- **No fingerprinting**: No device-specific identifiers collected
- **Client-side only**: All processing happens in your browser
- **No data transmission**: Nothing sent to external servers

## ⚠️ Important Notes

- **Approximation Only**: Results are educated guesses based on screen metrics
- **Multiple Matches**: Many Apple devices share identical specifications
- **Browser Dependent**: Automatic detection only works in browser environments
- **Screen vs Viewport**: Uses screen dimensions, not browser viewport

## 🔍 Example Results

```typescript
// Example detection result
{
  matches: [
    {
      device: {
        name: 'iPhone 15 Pro',
        type: 'phone',
        release_date: '2023-09-22',
        screen: {
          diagonal_inches: 6.1,
          ppi: 460,
          scale_factor: 3,
          resolution: {
            logical: { width: 393, height: 852 },
            physical: { width: 1179, height: 2556 },
          },
        },
      },
      confidence: 1.0,
      matchDetails: {
        widthMatch: true,
        heightMatch: true,
        scaleFactorMatch: true,
      },
    },
  ];
}
```

## 📚 Learn More

- **Package Documentation**: [detect-apple-device on npm](https://www.npmjs.com/package/detect-apple-device)
- **Source Code**: [GitHub Repository](https://github.com/gormlabenz/detect-apple-device)
- **Device Specifications**: [iOS Resolution Database](https://www.ios-resolution.com/)

## 🤝 Contributing

This is a demo project. For contributions to the main library, please visit the [official repository](https://github.com/gormlabenz/detect-apple-device).

## 📄 License

This demo is provided as-is for educational purposes. The `detect-apple-device` package is licensed under MIT.

---

**Built with**: TypeScript, Vite, and the `detect-apple-device` package
