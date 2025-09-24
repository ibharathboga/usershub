# User Management Dashboard

## Overview

This project is a simple **User Management Dashboard** built as part of a given assignment. It allows users to view, add, edit, delete, search, filter, and sort user details. The project demonstrates **frontend functionality and JavaScript expertise** by interacting with a mock backend API.

The main focus has been to implement the required functionality in a **clean and modular way**, while keeping the interface simple and responsive.

## NOTE
better version of this webapp can be found at [dev/main](https://github.com/ibharathboga/usershub/tree/dev/main) branch which is live at [click here](https://usershub-git-dev-main-ibharathbogas-projects.vercel.app?_vercel_share=fW0HPTw2ZoU4UI6Bia5AiqgeqxvCnNob)

## Features

* **CRUD Operations**

  * View user details in a tabular format.
  * Add a new user with validation.
  * Edit existing user details.
  * Delete users.
* **Filtering**

  * Filter users by department.
* **Search**

  * Search across user fields.
* **Sorting**

  * Sort by all fields (First Name, Last Name, Email, Department).
* **Pagination**

  * Not yet implemented. If given more time, I would extend the project with **server-side pagination** for better handling of larger datasets.

---

## API Choice

The assignment suggested using **JSONPlaceholder** as the backend API, and I agree that it works well for basic demonstrations. However, after reviewing its documentation and experimenting with it, I realized some limitations when trying to showcase the assignment’s full functionality:

* Add requests always returned success, but no data persisted.
* Update requests only returned success for users with IDs less than 10, and failed silently for others.
* Delete requests always returned success without reflecting real changes.
* JSONPlaceholder’s `/users` endpoint did not fully align with the required fields (such as Department).

To better demonstrate the functionality, I took the initiative to research alternatives and switched to **MockAPI**, which provided:

* A reliable and configurable mock backend.
* The ability to define custom fields (including Department).
* Support for filters, search, sort, and pagination through query parameters (though in this project, filtering, search, and sort were implemented client-side).

---

## Assumptions

* Client-side implementation of search, filter, and sort is acceptable for this assignment, as the main intention is to **demonstrate JavaScript/React skills**.
* Pagination is an important feature. If given more time, I would implement **server-side pagination** using the mock API’s query parameters.
* Additional libraries (such as **React-Toastify** for notifications or **TailwindCSS** for styling) could further improve user experience and speed up development.

---

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/ibharathboga/usershub
   cd usershub
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Run the application:

   ```bash
   npm run dev
   ```
4. The app will be available at:

   ```
   http://localhost:5173
   ```

---

## Live Demo

The project has also been deployed, so you can interact with it directly without any setup:

👉 [Live Demo on Vercel](https://usershub.vercel.app/)

---

## Reflection

This project helped me practice structuring frontend functionality in a **clear and extensible manner**, while also learning how to handle the quirks of mock APIs.

### Key Technical Highlights

* Applied **Context API** to share state and logic across the app.
* Used **custom hooks** (for queries, mutations, and state management) to keep code reusable and DRY.
* Integrated **axios instance** to centralize API configuration.
* Implemented **modals** for user add and edit forms.
* Applied **form handling** with validation for user input.
* Leveraged **useMemo** for performance optimization in filtering, sorting, and search.
* Added a **loading page** during initial fetch for better UX.
* Used **Toastify** for error handling and user feedback in a generic way.

### Challenges Faced

* Working around the inconsistent behavior of the initially provided backend (JSONPlaceholder).
* Designing state management in a way that allows features like pagination to be added later.

### Future Improvements

* Implementing server-side pagination.
* Enhancing responsiveness and further polishing the UI.
* Adding unit tests for hooks and components.

---

## Evaluation Alignment

This project has been implemented keeping in mind the evaluation criteria:

* **Effective naming conventions**: Components, hooks, and variables have descriptive names.
* **DRY principle**: Reusable hooks and provider pattern avoid duplication.
* **Readable layout**: Consistent code formatting for clarity.
* **Modularity**: Code is organized into components, hooks, and context, making it easy to extend and maintain.
