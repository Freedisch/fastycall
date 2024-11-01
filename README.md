# Fastycall

Fastycall is a modern emergency call management system built with Next.js, React, and Leaflet. It provides an intuitive interface for managing and visualizing emergency incidents in real-time.

## Video Link
https://youtu.be/8q46ddljIds 

## Features

- Interactive sidebar displaying recent emergency calls
- Dynamic map visualization of incident locations
- Detailed emergency information sidebar
- Smooth animations for transitioning between incidents
- Mock data simulating real-time emergency scenarios in Kigali, Rwanda

## Technologies Used

- Next.js 13 with App Router
- React 18
- TypeScript
- Tailwind CSS for styling
- Leaflet for map integration
- date-fns for date formatting
- tabler-icons-react for icons

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/freedisch/fastycall.git
   cd fastycall
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory and add any necessary environment variables (if applicable).

## Running the Application

To start the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Architecture

![design](https://github.com/user-attachments/assets/5ccf2151-4856-455a-81d4-4f7fe4f1fffd)


## User Workflow

![workflowai](https://github.com/user-attachments/assets/332948a6-f1bd-4917-998e-33f8c9b58b22)


## Usage

1. The main page displays a sidebar with a list of recent emergency calls.
2. Click on an emergency call in the sidebar to view its location on the map.
3. The map will smoothly transition to the selected incident's location.
4. A detailed sidebar will appear from the right, showing more information about the selected incident.



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenStreetMap for providing map data
- The Next.js team for their excellent framework
