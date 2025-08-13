```markdown
# Implementation Plan for Ride-Hailing Price Comparison Website (Mock Version)

This plan outlines the creation of a modern, responsive website where users can input travel details and view realistic mock pricing for Rapido, Ola, and Porter. The website will use a simplified pricing algorithm (price = base fare + per kilometer cost) and will include robust error handling and a clean, stylistic UI.

---

## 1. New Files and Their Purpose

### a. File: src/lib/pricing.ts
- **Purpose:** Encapsulate pricing algorithms for each service.
- **Features:**
  - Export a function `calculatePrices(distance: number)` that computes prices for Rapido, Ola, and Porter.
  - Implement sample algorithms (e.g., Rapido: `base 20 + 5 * distance`, Ola: `base 25 + 4.5 * distance`, Porter: `base 15 + 6 * distance`).
  - Include basic error handling (e.g., if `distance` is not a positive number, throw an error).

### b. File: src/app/price-comparison/page.tsx
- **Purpose:** Serve as the main page for the price comparison.
- **Features:**
  - A modern form where users can input a distance (in kilometers) for fare estimation.
  - Use React hooks (`useState`) to manage input, calculated prices, and error state.
  - On form submission, validate input (ensure it’s a positive number) and use the pricing function from `pricing.ts`.
  - Display the results in a clean table with columns such as "Service Name" and "Price (₹)".
  - Optionally, include a history area to show previous comparisons (stored in local component state).
  - Utilize an existing UI alert component from `src/components/ui/alert.tsx` for displaying error messages.
  - Ensure the page layout is modern by employing responsive design principles (using CSS flex or grid layouts, ample spacing, and clear typography).

---

## 2. Modifications to Existing Files

### a. File: src/app/globals.css
- **Purpose:** Enhance global styling for our new page.
- **Changes:**
  - Add new CSS classes for the price comparison form, buttons, table, and error messages.
  - Implement responsive design rules (media queries) to ensure the form and table adapt gracefully to various screen sizes.
  - Use modern typography (consistent font sizes, weights, and line heights) and neutral color schemes to maintain a clean UI.

### b. Potential Integration with Existing UI Components
- **Components to be Used:**
  - `src/components/ui/alert.tsx`: Reuse for error display.
  - `src/components/ui/button.tsx` (if available): Use for the form’s submit button.
- **Consideration:** Ensure these components follow our styling conventions without external icon libraries or images.

---

## 3. Step-by-Step Outline of Changes

### Step 1: Implement Pricing Logic
- Create `src/lib/pricing.ts`:
  - Define and export `calculatePrices(distance: number)`.
  - Example implementation:
    ```typescript
    export function calculatePrices(distance: number) {
      if (isNaN(distance) || distance <= 0) {
        throw new Error(`Invalid distance provided.`);
      }
      const prices = {
        rapido: 20 + 5 * distance,
        ola: 25 + 4.5 * distance,
        porter: 15 + 6 * distance
      };
      return prices;
    }
    ```
  - Add error handling to ensure only positive numeric inputs are processed.

### Step 2: Build the Price Comparison Page
- Create `src/app/price-comparison/page.tsx`:
  - Import necessary React hooks, the pricing function, and UI alert component.
  - Set up a form with:
    - An input field for distance (in kilometers).
    - A submit button (using a styled `<button>` element or the existing UI button component).
  - On form submission:
    - Prevent default form behavior.
    - Validate that the distance entered is a valid positive number.
    - If validation fails, update the error state, triggering the alert display.
    - If validation passes, call `calculatePrices(distance)` and store the result in component state.
  - Render the results as a table:
    - Use semantic HTML `<table>`, `<thead>`, and `<tbody>` to list service names and calculated prices.
    - Apply CSS classes for modern spacing and clear layout.
  - Optionally, maintain a history list in state to track previous comparisons.

### Step 3: Update Global Styles
- Modify `src/app/globals.css`:
  - Add styles for the form:
    ```css
    .comparison-form {
      max-width: 600px;
      margin: 2rem auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .comparison-input {
      padding: 0.75rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .comparison-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }
    .comparison-table th, .comparison-table td {
      border: 1px solid #ddd;
      padding: 0.75rem;
      text-align: center;
    }
    @media (max-width: 600px) {
      .comparison-form { padding: 0.5rem; }
      .comparison-input { font-size: 0.9rem; }
    }
    ```
  - Ensure error messages (via the alert component) have sufficient visibility and are styled consistently.

### Step 4: Quality and Error Handling Considerations
- Validate user input immediately when the form is submitted.
- Use try-catch blocks around the price calculation to catch unforeseen errors.
- Provide clear error messages in Hindi (or bilingual as needed) using the alert component.
- Maintain clean code separation by having business logic (pricing calculations) separated from UI logic.

### Step 5: Integration and Future Enhancements
- The current design uses mock pricing data; plan future integration points:
  - Replace the pricing logic with API calls to real-time data if API keys become available.
  - Expand input fields to include pickup/drop-off locations and time.
  - Enhance the history component to persist results using local storage or a backend API.
- Test the functionality locally (use `npm run dev`) to ensure form submission, error handling, and responsive design are operating as expected.

---

## Summary
- The plan introduces two new files: `src/lib/pricing.ts` for mock pricing calculations and `src/app/price-comparison/page.tsx` for the main comparison interface.
- The page includes a modern, responsive form for users to enter a distance and view comparative results in a table.
- Global styles are enhanced with new CSS classes to ensure clarity and responsive design.
- Robust error handling is integrated, using existing alert components for a clean UI.
- The solution is modular and prepared for future integration with real APIs.
- Overall, the design emphasizes best practices, clean separation of concerns, and a modern UX. 
