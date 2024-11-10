# Formula One Explorer

This project is a frontend application that allows users to explore Formula 1 seasons, races, and driver details using the Ergast API. The application is built using Next 15 (app router) and is designed to provide a modular, performant, and responsive interface for exploring race data, comparing driver performances, and managing favorites.

For ease of testing, I have hosted this project on Vercel [here](https://formula-one-explorer.vercel.app/seasons/1951).

## Features

1. **Season Listing**:

    - Displays all available Formula 1 seasons.
    - Toggle between List view and Card view for better usability.
    - Pagination for handling large lists of seasons.

2. **Races for a Season**:

    - Fetches races for a selected season.
    - Displays race name, circuit name, and date.
    - Pagination for handling large lists of races.
    - Toggle between List view and Card view for races.
    - Pin favorite races to keep them at the top of the list (persisted after refresh).

3. **Race Details**:
    - Displays participating drivers with their name, nationality, team, and race position.
    - Allows searching the participating drivers.
    - Pagination for handling large lists of drivers
    - Visualizes driver performance with a bar chart comparison of their race times.
    - Toggle between List view and Card view for drivers.

## Folder Structure

```
└── 📁src
    └── 📁app
        └── 📁seasons
            └── 📁[season]
                └── 📁[round]
                    └── page.tsx
                └── page.tsx
        └── favicon.ico
        └── globals.css
        └── layout.tsx
        └── page.tsx
    └── 📁components
        └── DriverCard.tsx
        └── PaginatedList.tsx
        └── RaceCard.tsx
        └── SeasonCard.tsx
    └── 📁hooks
        └── 📁api
            └── useGetRaceDetails.ts
            └── useGetSeasonList.ts
            └── useGetSeasonRaces.ts
    └── 📁providers
        └── AppProvider.tsx
        └── ReactQueryProvider.tsx
    └── 📁services
        └── api.ts
        └── f1Ergast.ts
    └── 📁tests
    └── 📁types
        └── api.ts
    └── 📁utils
        └── datetime.ts
```

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

-   Node
-   Yarn

### Steps to Run the Project

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/youssefomegahed/formula-one-explorer

    cd f1-explorer
    ```

2. Install the dependencies:

    ```bash
    yarn install
    ```

3. Run the application:

    ```bash
    yarn dev
    ```

4. Open the application in your browser:

    ```bash
    http://localhost:3000
    ```

## Technical Approach

### State Management

-   **Global State:** Managed using React Context (AppProvider). It tracks the view mode (Card/List view) and pinned races, both of which are persisted in the local storage to maintain the state even after a page refresh.

-   **API Data**: Data for seasons, races and driver results are fetched using React Query for better data fetching, caching, and error handling.

### Routing

-   The app utilizes Next.js's powerful routing features to handle dynamic routes for different sections of the app, such as seasons, races, and race details. Pages for each season ([season]), race ([round]), and specific race details are managed through dynamic routes.

### API Handling

-   **Data Fetching:** API calls are made to the Ergast API to fetch season, race, and driver details. Loading and error states are handled gracefully, with a global error handler for API failures that displays a message to the user. For the sake of simplicity, error messages are shown as a basic alert and loading states are shown as a basic centered text. For a real project, more user-friendly views would be used.

### UI & Styling

-   **Responsive Design:** The application uses Tailwind CSS to create a responsive layout, ensuring it works well on various screen sizes (desktop, tablet, and mobile).

-   **Charting:** A BarChart from recharts is used to visualize driver performance in each race.

## Key Components

### PaginatedList.tsx

-   Handles paginated rendering of any given list. This component is reusable and is currently being used in every page in the app.

### DriverCard.tsx

-   Displays detailed information about each driver, including their name, nationality, team, and race position.
-   Supports a prop `isCardView` that controls whether it appears in its card form or not.

### RaceCard.tsx

-   Displays information about a single race, including the race name, circuit name, and race date.
-   Supports a prop `isCardView` that controls whether it appears in its card form or not.

### SeasonCard.tsx

-   Displays the year of each season.
-   Supports a prop `isCardView` that controls whether it appears in its card form or not.

## Screenshots

### Desktop

-   Seasons Card View

![alt text](/screenshots/image.png)

-   Races Card View

![alt text](/screenshots/image-2.png)

-   Races List View

![alt text](/screenshots/image-3.png)

-   Race Details View

![alt text](/screenshots/image-4.png)

-   Race Performance View

![alt text](/screenshots/image-5.png)

### Mobile

-   Races Card View

![alt text](/screenshots/image-6.png)

-   Races List View

![alt text](/screenshots/image-7.png)
