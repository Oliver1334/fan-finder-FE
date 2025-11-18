# Fan Finder - Frontend

Fan Finder is a location-based social networking mobile app for live music enthusiasts. Users can discover upcoming gigs in their area, interact with other music fans through gig-specific forums, and chat directly with fellow concert-goers.

**[Watch the video demo here](https://www.youtube.com/watch?v=N_lc2a5umbo&ab_channel=Northcoders)** 

This project was developed as part of a team of four during the **Northcoders Full-Stack Software Developer Bootcamp**, completed in under two weeks from pitch to deployment.

## Features

- View upcoming gigs within a 30-mile radius based on current location
- Access detailed gig information with direct ticket purchase links
- Participate in gig-specific forums to connect with other attendees
- Direct messaging between users
- User profiles displaying upcoming gigs and forum activity

## Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development and deployment platform
- **React Native Maps** - Interactive map visualization
- **Ticketmaster API** - Live event data
- **MongoDB** - Database (via backend)
- **Socket.io** - Real-time chat functionality

## Backend Repository

The corresponding backend API can be found here: [Fan Finder Backend](https://github.com/Oliver1334/fan-finder-BE)

## Installation & Setup

### Prerequisites

- Node.js (minimum version 19.5.0)
- Expo Go app installed on your mobile device ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- Ticketmaster API key ([register here](https://developer.ticketmaster.com/))

### Steps

1. Clone this repository:
```bash
git clone https://github.com/Oliver1334/fanfinder-fe
```

2. Navigate to the project directory:
```bash
cd fanfinder-fe
```

3. Install dependencies:
```bash
npm install
```

4. Create an `apikey.js` file in the project root:
```javascript
export const apiKey = "YOUR_TICKETMASTER_API_KEY_HERE"
```

5. Start the Metro Bundler:
```bash
npx expo start
```

6. Scan the generated QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app directly

The app will build to your device within 20 seconds.

**Note:** iOS is recommended for the best user experience. Some map marker customization features have known compatibility issues with Android devices when using Expo Go.

## Development Notes

This app was developed collaboratively using:
- Pair programming and remote working practices
- Agile methodologies (Kanban boards, daily stand-ups)
- Software Development Lifecycle framework
- Test-Driven Development for the backend

## Team

Developed by Team Express during Northcoders bootcamp. Original frontend repository maintained here: [Fan Finder Frontend](https://github.com/jbhall4291/fan-finder-backend)
