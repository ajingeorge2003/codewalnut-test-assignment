[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/V6CCMHDl)
# Flight Explorer App Assignment

## Objective

Build a Flight Explorer application that allows users to search for flights, view detailed flight information, and maintain a personal watchlist of flights they want to track. This assignment tests your ability to work with React (recommended with TypeScript), Tailwind CSS, state management, API integration, localStorage persistence, and testing with Vitest.

---

## Tech Stack

### Required Technologies:

- **React (v18+)** with Vite
- **Tailwind CSS** for styling
- **React Hooks** for state management (useState, useEffect, useContext, or useReducer)
- **Vitest** for unit/integration testing
- **localStorage** for watchlist persistence
- **Flight API** as provided OR use provided mock JSON data

### Optional Libraries:

- `axios` or `fetch` for API calls
- `react-icons` for icons
- `dayjs` for date formatting

---

## Commit Message Standards

Follow conventional commit message format. Each commit should be prefixed with one of the following:

- `feat:` \- A new feature (e.g., `feat: add flight search form`)
- `fix:` \- A bug fix (e.g., `fix: resolve watchlist duplicate entries`)
- `refactor:` \- Code refactoring without changing functionality (e.g., `refactor: extract FlightCard component`)
- `test:` \- Adding or updating tests (e.g., `test: add unit tests for watchlist`)
- `style:` \- Styling changes (e.g., `style: update flight card layout`)
- `docs:` \- Documentation updates (e.g., `docs: update README with setup instructions`)

### Examples:

```
feat: implement flight search with API integration
fix: correct date display for UTC timestamps
test: add tests for localStorage watchlist persistence
```

---

## Flight API Details

We have provided a Flight Data API for this assignment. You can use this API or fall back to mock JSON data.

### API Base URL:

```
https://flight-explorer-api.codewalnut.com/
```

### Available Endpoints:

- **GET /api/flights** \- Returns 100 flight records with complete flight information

### API Documentation:

You can explore the API interactively at: [https://flight-explorer-api.codewalnut.com/docs](https://flight-explorer-api.codewalnut.com/docs)

**Steps to test:**

1. Visit the `/docs` endpoint
2. Click on the `GET /api/flights` endpoint
3. Click **"Try it out"**
4. Click **"Execute"** to see the response structure

### Authentication:

**No Authentication Required** \- This API is open and does not require an API key for this assignment.

### Response Format:

The API returns a JSON object with a `"flights"` array containing flight objects (see Mock Data Structure below for the exact format).

---

## Mock Data Structure Example

```json
{
  "flights": [
    {
      "id": "AA123-20241031",
      "flightNumber": "AA123",
      "airline": "American Airlines",
      "origin": {
        "code": "JFK",
        "name": "John F. Kennedy International",
        "city": "New York"
      },
      "destination": {
        "code": "LAX",
        "name": "Los Angeles International",
        "city": "Los Angeles"
      },
      "departure": {
        "scheduled": "2024-10-31T08:00:00Z",
        "actual": "2024-10-31T08:15:00Z",
        "terminal": "8",
        "gate": "23"
      },
      "arrival": {
        "scheduled": "2024-10-31T11:30:00Z",
        "estimated": "2024-10-31T11:45:00Z",
        "terminal": "4",
        "gate": "42"
      },
      "status": "Delayed",
      "aircraft": "Boeing 737-800",
      "duration": "5h 30m",
      "delay": 15
    }
  ]
}
```

---

## Evaluation Criteria

Your submission will be evaluated based on:

### 1\. Code Quality

- Clean, readable, and well-organized code
- Proper component structure and reusability
- Appropriate use of React hooks
- Separation of concerns (components, services, utilities)
- No console errors or warnings

### 2\. Functionality

- All core features work as expected
- Proper error handling and edge cases
- Form validation works correctly
- Watchlist persists across sessions
- Search returns relevant results

### 3\. UI/UX

- Professional and clean design
- Responsive layout (mobile and desktop)
- Proper loading, error, and empty states
- Intuitive user interface
- Consistent styling with Tailwind

### 4\. Testing

- Tests run successfully
- Adequate test coverage for core functionality
- Tests are meaningful and well-written

### 5\. Best Practices

- Meaningful commit messages following conventions
- Proper README documentation
- No hardcoded sensitive data (API keys should be in .env)
- Proper .gitignore file
- Raise a Pull Request (Good to have)
- Minimal prop drilling

**Note:** Marks will be awarded based on the evaluation criteria and feature breakdown.

---

## Feature Breakdown with Marks

**Total marks: 100**

| Slno | Feature                       | Description                                                                                                                               | Marks   |
| :--- | :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| 1    | **Project Setup**             | Proper Vite \+ React \+ Tailwind setup, clean folder structure, README with setup instructions                                            | 10      |
| 2    | **Flight Search Form**        | Search form with origin/destination airports OR flight number input. Proper form validation and error handling                            | 15      |
| 3    | **Flight Results Display**    | Display search results in a clean, responsive card layout showing: airline, flight number, departure/arrival times, status, aircraft type | 20      |
| 4    | **Flight Details View**       | Click on a flight to view detailed information (route, terminal, gate, delays, etc.)                                                      | 15      |
| 5    | **Watchlist Feature**         | Add/remove flights to/from watchlist with localStorage persistence. Display watchlist in a separate section                               | 20      |
| 6    | **UI/UX & Responsive Design** | Professional UI using Tailwind, responsive design (mobile \+ desktop), loading states, empty states, error states                         | 10      |
| 7    | **Testing with Vitest**       | Unit tests for key components (search form, watchlist functionality, localStorage). Minimum 3 test suites                                 | 10      |
|      | **TOTAL**                     |                                                                                                                                           | **100** |

---

## Bonus Points

These are optional enhancements. You can earn up to **20 additional marks**:

| Bonus Feature                | Description                                                                     | Marks    |
| :--------------------------- | :------------------------------------------------------------------------------ | :------- |
| **Airport Autocomplete**     | Implement autocomplete/dropdown for airport codes (IATA) with airport names     | \+5      |
| **Flight Status Indicators** | Color-coded badges (On Time: green, Delayed: yellow, Cancelled: red) with icons | \+3      |
| **Advanced Filters**         | Filter results by airline, status, or time of day                               | \+3      |
| **Dark Mode Toggle**         | Implement dark/light theme toggle with localStorage persistence                 | \+5      |
| **Animation & Transitions**  | Smooth animations for list entries, modal transitions, loading skeletons        | \+4      |
|                              | **TOTAL BONUS**                                                                 | **\+20** |

**Note:** Bonus marks can bring your total above 100, but the primary focus should be on completing the core features first.

---

## Deliverables

Submit your assignment by providing:

### 1\. GitHub Classroom Repository Link

- Submit a Google Form with your GitHub Classroom repository URL.
- Include a comprehensive `README.md`
- Commit history showing your development process
- `.env.example` file (if using API keys)

### 2\. Deployed App Link (Optional but recommended)

- Deploy to Vercel, Netlify, or GitHub Pages
- Provide the live URL in your README

### 3\. README Must Include:

- Project overview
- Features implemented
- Setup instructions
- Testing instructions
- API setup (if applicable)
- Any assumptions or decisions made

---

## Time Constraint

**Total Time: 4 hours maximum**

### Important Notes:

- Focus on completing core features first before attempting bonuses
- It's better to have a working app with fewer features than an incomplete app with many features
- Submit even if you don't complete everything. We value quality over quantity.

---

## Contact

If you have any questions or encounter technical issues with the assignment, please reach out to:

**Email:**

- [likitha@codewalnut.com](mailto:likitha@codewalnut.com)
- [vishnu@codewalnut.com](mailto:vishnu@codewalnut.com)
- [kavaskar@codewalnut.com](mailto:kavaskar@codewalnut.com)
- [shansundar@codewalnut.com](mailto:shansundar@codewalnut.com)

---

## Common Questions

**Q: Can I use external libraries?**  
A: Yes, but keep it minimal and document your choices.

**Q: What if the API is down?**  
A: Use mock data as a fallback.

**Q: Can I use TypeScript?**  
A: Yes, highly recommended\!

**Q: Should I write E2E tests?**  
A: Unit/integration tests are sufficient.

---

## Good luck\! We're excited to see what you build\! 🚀
