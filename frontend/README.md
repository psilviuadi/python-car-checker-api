# React Car Checker Frontend

A modern React TypeScript application for checking UK vehicle details using MOT and VES APIs.

## Features

- 🔍 Search vehicles by UK registration number
- 📋 View MOT history and test results
- ⚙️ View DVLA VES vehicle data
- 🎨 Responsive, modern UI
- ⚡ Real-time data fetching
- 🔒 TypeScript for type safety

## Setup

### Requirements

- Node.js 16 or higher
- npm 7 or higher

### Installation

1. Install dependencies:
```bash
npm install
```

### Configuration

Create a `.env` file in the frontend directory (optional):
```bash
VITE_API_URL=http://localhost:8000
```

The frontend defaults to `http://localhost:8000` for the backend, but you can override it if running on a different port.

### Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

Vite will watch for changes and hot-reload the application.

### Build

Create a production build:
```bash
npm run build
```

### Preview

Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── CarChecker.tsx        # Main search and results container
│   │   ├── SearchBox.tsx         # License plate input
│   │   ├── CarDetails.tsx        # Basic vehicle info
│   │   ├── MOTHistory.tsx        # MOT test history
│   │   ├── VESDetails.tsx        # DVLA VES data
│   │   └── ErrorMessage.tsx      # Error display
│   ├── services/
│   │   └── api.ts               # API client with TypeScript types
│   ├── App.tsx                  # Root component
│   ├── main.tsx                 # React entry point
│   ├── App.css
│   └── index.css
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## API Integration

The frontend communicates with the backend API at `http://localhost:8000` with two main endpoints:

- `GET /mot/{registration}` - MOT history
- `GET /ves/{registration}` - Vehicle Enquiry Service data

Both requests are made concurrently when a search is performed.

## Styling

The application uses CSS with:
- CSS Grid and Flexbox layouts
- CSS animations and transitions
- Responsive design with media queries
- Color scheme: Purple gradient with modern UI

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Development Notes

- Uses TypeScript for type safety
- Axios for HTTP requests
- Vite for fast development and building
- React 18 with hooks for state management
- CSS modules not used - global styles with BEM-inspired naming

## Troubleshooting

### CORS Errors
Make sure the backend is running with CORS enabled:
```bash
# Backend should be running on port 8000
uvicorn main:app --reload
```

### Port Already in Use
If port 3000 is busy:
```bash
npm run dev -- --port 3001
```

Then update the API URL if needed.

### API Connection Errors
Verify the backend is running and accessible at `http://localhost:8000`:
```bash
curl http://localhost:8000/docs
```

## Building for Production

1. Build the frontend:
```bash
npm run build
```

2. The output will be in the `dist/` directory

3. Serve the built files with your preferred HTTP server
