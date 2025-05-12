# Shoppin - Product Discovery App

A mobile application prototype featuring a Tinder-like swiping interface for discovering products. Built with React.js and Capacitor.js.

## Features

- Interactive card swiping mechanism
- Product discovery with like/dislike functionality
- Add to cart functionality
- Smooth animations and transitions
- Mobile-first design

## Tech Stack

- React.js
- TypeScript
- Capacitor.js
- React Spring (for animations)
- Tailwind CSS (for styling)

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm or yarn
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/shoppin.git
cd shoppin
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Build the project:
```bash
npm run build
```

### Mobile Development

To run the app on mobile devices:

1. Add Android platform:
```bash
npx cap add android
```

2. Add iOS platform:
```bash
npx cap add ios
```

3. Sync the web code to the native project:
```bash
npx cap sync
```

4. Open the native project:
```bash
npx cap open android  # For Android
npx cap open ios      # For iOS
```

## Project Structure

```
shoppin/
├── src/
│   ├── components/
│   │   └── ProductCard.tsx
│   ├── data/
│   │   └── products.ts
│   ├── types/
│   │   └── product.ts
│   ├── App.tsx
│   └── index.tsx
├── capacitor.config.ts
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 