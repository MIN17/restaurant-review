# Restaurant Review App - Frontend

A modern React application that allows users to discover, review, and manage their favorite restaurants. Built with React, TypeScript, and Tailwind CSS, featuring Google Places integration for seamless restaurant search.

## Tech Stack

- **Framework:** React 18.3.1 with TypeScript 5.9.2
- **Build Tool:** Vite 5.3.4
- **Styling:** Tailwind CSS 3.4.7 with custom theme
- **Routing:** React Router DOM 6.25.0
- **Form Management:** React Hook Form 7.53.1 with Zod 3.23.8 validation
- **UI Components:** Radix UI primitives with custom components
- **Icons:** Lucide React, React Feather, React Icons
- **HTTP Client:** Axios 1.7.4
- **Location Services:** Google Places API with places-autocomplete-hook
- **Code Quality:** Biome 1.8.3 (linter & formatter)

## Features

- User authentication (register/login) with JWT
- Protected routes for authenticated users
- Add restaurant reviews with Google Places autocomplete
- Interactive 5-star rating system
- View all reviews in a responsive list layout
- Edit existing reviews via modal interface
- Delete individual reviews or all reviews at once
- Responsive design (mobile-first with custom breakpoints)
- Dark mode support with CSS variables
- Type-safe codebase with TypeScript


## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- Google Places API key

### Installation

```bash
npm i
```

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_KEY=your_google_places_api_key
VITE_DEV_URL=http://localhost:3000
VITE_PROD_URL=https://your-backend-url.com
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```


## Routes

| Route | Component | Description | Protected |
|-------|-----------|-------------|-----------|
| `/` | Root | Home page with navigation | No |
| `/login` | LoginPage | User login form | No |
| `/register` | RegisterPage | User registration form | No |
| `/addReview` | AddReview | Create new review | Yes |
| `/reviews` | ViewReviews | View/edit/delete reviews | Yes |


## Authentication
- Context API-based auth state management
- JWT tokens stored in HTTP-only cookies
- Automatic redirect to login for protected routes
- Persistent auth state across page reloads

## TODO
- Pagination
- Validation
- Allow users to sort reviews based on criteria
- Add global state management (Zustand)
- Implement restaurant recommender
- Add review search and filtering
- Implement user profile page
- Add image upload for reviews


## Screenshots

### Home Page

<img width="1200" alt="image" src="https://github.com/user-attachments/assets/2f154923-31ea-4a1b-adb1-bd9de5fb01d1" />

### Add Review Page

<img width="1200" alt="image" src="https://github.com/user-attachments/assets/e08492c5-6634-4788-abc2-3d539024448a" />

#### Google Places Autocomplete API:

Used a Google Places Autocomplete Hook for auto-suggestions
- source : https://github.com/gstrobl/places-autocomplete-hook/tree/main?tab=readme-ov-file

<img width="1200" alt="image" src="https://github.com/user-attachments/assets/1612c384-4a32-4f4f-b780-25072f9d5c8b" />

#### Form Filled Out

<img width="1200" alt="image" src="https://github.com/user-attachments/assets/8e3f790c-8785-454b-bd60-097f169d3aa2" />

### View Reviews Page

#### width < 1024px:

<img width="873" height="820" alt="image" src="https://github.com/user-attachments/assets/484a224e-30ec-4161-a50f-95d938b547ff" />

#### width >= 1024px:

<img width="1491" height="826" alt="image" src="https://github.com/user-attachments/assets/93dabd5c-788a-44e9-80a2-25e2d9e88200" />

#### Edit Review

<img width="1496" height="832" alt="image" src="https://github.com/user-attachments/assets/9fe459bd-0ae6-4baf-88fc-198a2a65adf3" />
