# MyMovieApp

A React Native movie discovery application built with Expo, featuring movie browsing, search functionality, and detailed movie information with actor details.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Expo CLI** - Install globally: `npm install -g expo-cli`
- **Git** - For cloning the repository

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/TheOnlyNaimur/MyMovieApp.git
cd MyMovieApp
```

### 2. Install dependencies

**Option 1: Simple install (Recommended)**

```bash
npm install
```

**Option 2: Using yarn**

```bash
yarn install
```

**Option 3: Install all packages individually with a single command**

Copy and paste this command to install all dependencies at once:

```bash
npm install @expo/vector-icons@^15.0.3 @react-navigation/bottom-tabs@^7.4.0 @react-navigation/elements@^2.6.3 @react-navigation/native@^7.1.8 expo@~54.0.33 expo-constants@~18.0.13 expo-font@~14.0.11 expo-haptics@~15.0.8 expo-image@~3.0.11 expo-linking@~8.0.11 expo-router@~6.0.23 expo-splash-screen@~31.0.13 expo-status-bar@~3.0.9 expo-symbols@~1.0.8 expo-system-ui@~6.0.9 expo-web-browser@~15.0.10 lucide-react-native@^0.575.0 nativewind@^4.2.2 react@19.1.0 react-dom@19.1.0 react-native@0.81.5 react-native-gesture-handler@~2.28.0 react-native-reanimated@~4.1.1 react-native-reanimated-carousel@^4.0.3 react-native-safe-area-context@~5.6.0 react-native-screens@~4.16.0 react-native-web@~0.21.0 react-native-worklets@0.5.1
```

**Option 4: Install dev dependencies as well**

```bash
npm install --save-dev @react-native/babel-preset@^0.84.0 @types/react@~19.1.0 eslint@^9.25.0 eslint-config-expo@~10.0.0 tailwindcss@^3.4.19 typescript@~5.9.2
```

```bash
npx expo install expo-router expo-blur react-native-safe-area-context expo-status-bar lucide-react-native
```

```bash
npx expo install react-native-reanimated react-native-reanimated-carousel nativewind tailwindcss
```


This will install all the dependencies listed in `package.json`:

**Main Dependencies (Production):**

```
@expo/vector-icons@^15.0.3
@react-navigation/bottom-tabs@^7.4.0
@react-navigation/elements@^2.6.3
@react-navigation/native@^7.1.8
expo@~54.0.33
expo-constants@~18.0.13
expo-font@~14.0.11
expo-haptics@~15.0.8
expo-image@~3.0.11
expo-linking@~8.0.11
expo-router@~6.0.23
expo-splash-screen@~31.0.13
expo-status-bar@~3.0.9
expo-symbols@~1.0.8
expo-system-ui@~6.0.9
expo-web-browser@~15.0.10
lucide-react-native@^0.575.0
nativewind@^4.2.2
react@19.1.0
react-dom@19.1.0
react-native@0.81.5
react-native-gesture-handler@~2.28.0
react-native-reanimated@~4.1.1
react-native-reanimated-carousel@^4.0.3
react-native-safe-area-context@~5.6.0
react-native-screens@~4.16.0
react-native-web@~0.21.0
react-native-worklets@0.5.1
```

**Development Dependencies:**

```
@react-native/babel-preset@^0.84.0
@types/react@~19.1.0
eslint@^9.25.0
eslint-config-expo@~10.0.0
tailwindcss@^3.4.19
typescript@~5.9.2
```

### 3. Set up environment variables

Create a `.env` file in the root directory with your TMDB API key:

```
TMDB_API_KEY=your_api_key_here
```

Get your free API key from [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api)

## Dependencies

### Core Dependencies

- **expo** (~54.0.33) - Framework for building React Native apps
- **expo-router** (~6.0.23) - File-based routing for Expo
- **react** (19.1.0) - React library
- **react-native** (0.81.5) - React Native framework

### Navigation & UI

- **@react-navigation/native** (^7.1.8) - Navigation container
- **@react-navigation/bottom-tabs** (^7.4.0) - Bottom tab navigation
- **@react-navigation/elements** (^2.6.3) - Navigation elements
- **@expo/vector-icons** (^15.0.3) - Icon library
- **lucide-react-native** (^0.575.0) - Additional icons

### Styling & Layout

- **nativewind** (^4.2.2) - Utility-first CSS for React Native
- **tailwindcss** (^3.4.19) - Tailwind CSS (dev dependency)
- **react-native-safe-area-context** (~5.6.0) - Safe area handling

### Animations & Effects

- **react-native-reanimated** (~4.1.1) - Smooth gesture-based animations
- **react-native-reanimated-carousel** (^4.0.3) - Carousel component
- **react-native-gesture-handler** (~2.28.0) - Touch handling
- **react-native-worklets** (0.5.1) - Worklet support

### Expo Modules

- **expo-constants** (~18.0.13) - App configuration constants
- **expo-font** (~14.0.11) - Font loading
- **expo-haptics** (~15.0.8) - Haptic feedback
- **expo-image** (~3.0.11) - Image handling
- **expo-linking** (~8.0.11) - Deep linking
- **expo-splash-screen** (~31.0.13) - Splash screen management
- **expo-status-bar** (~3.0.9) - Status bar control
- **expo-symbols** (~1.0.8) - SF Symbols
- **expo-system-ui** (~6.0.9) - System UI integration
- **expo-web-browser** (~15.0.10) - Web browser support

### Other

- **react-native-web** (~0.21.0) - React Native for web
- **react-dom** (19.1.0) - React DOM (for web)

### Development Dependencies

- **@react-native/babel-preset** (^0.84.0) - Babel preset
- **@types/react** (~19.1.0) - TypeScript types
- **eslint** (^9.25.0) - Code linting
- **eslint-config-expo** (~10.0.0) - Expo ESLint config
- **typescript** (~5.9.2) - TypeScript support

## Available Scripts

### Development

```bash
# Start the development server
npm start

# Start with cache clearing
npm start -- -c
```

### Platform-Specific

```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

### Code Quality

```bash
# Run ESLint
npm run lint
```

### Other

```bash
# Reset the project (clears cache and reinstalls)
npm run reset-project
```

## Running the App

### Development Mode

1. Start the development server:

```bash
npm start
```

2. A QR code will be displayed in the terminal

3. Choose your platform:
   - **Android**: Press `a` to open in Android Emulator
   - **iOS**: Press `i` to open in iOS Simulator
   - **Web**: Press `w` to open in web browser
   - **Scan with phone**: Install Expo Go app and scan the QR code

### Production Build

For Android:

```bash
eas build --platform android
```

For iOS:

```bash
eas build --platform ios
```

## Project Structure

```
MyMovieApp/
├── app/                          # Expo Router pages
│   ├── _layout.tsx              # Root layout
│   ├── index.tsx                # Home screen
│   ├── search.tsx               # Search screen
│   ├── movie/
│   │   └── [id].tsx             # Movie detail screen
│   └── person/
│       └── [id].tsx             # Person detail screen
├── src/
│   └── components/              # Reusable components
│       ├── ActorRow.tsx
│       ├── Footer.tsx
│       ├── MovieRow.tsx
│       ├── Navbar.tsx
│       ├── TrendingCarousel.tsx
│       └── TrendingMovies.tsx
├── api/
│   └── tmdb.ts                  # TMDB API integration
├── styles/
│   └── index_style.tsx          # Style definitions
├── assets/                       # Images and assets
├── babel.config.js              # Babel configuration
├── tailwind.config.js           # Tailwind CSS config
├── tsconfig.json                # TypeScript config
├── package.json                 # Dependencies
└── README.md                    # This file
```

## API Integration

This app uses **The Movie Database (TMDB)** API to fetch movie data:

1. Sign up at [TMDB](https://www.themoviedb.org/settings/api)
2. Get your API key
3. Add it to your `.env` file
4. The API integration is handled in `api/tmdb.ts`

## Features

- 🎬 Browse trending movies
- 🔍 Search for movies and actors
- 📱 View detailed movie information
- 👤 Explore actor profiles
- 🎨 Beautiful UI with NativeWind styling
- 📱 Works on Android, iOS, and Web
- ✨ Smooth animations and gestures

## Troubleshooting

### Clear cache and reinstall

```bash
npm run reset-project
```

### Port already in use

If port 19000 is already in use:

```bash
npm start -- --port 19001
```

### Module not found errors

```bash
rm -rf node_modules
npm install
npm start -- -c
```

## License

This project is private and not publicly licensed.

## Author

TheOnlyNaimur

## Contributing

For contribution guidelines, please contact the repository owner.
