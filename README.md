# Users Management App

A React-based user management interface with full **CRUD operations**, **search**, **filter**, **sort**, and **pagination** support. The app is optimized for both desktop and mobile views with responsive tables and cards.


## Functionalities / Features

* **User Listing**

  * Display users in a table (desktop) or card format (mobile)
  * Supports pagination with configurable items per page
* **Create, Update, Delete Users**

  * Add new users
  * Edit existing users
  * Delete users with loading states and user feedback
* **Search and Filter**

  * Search across all user fields
  * Filter by first name, last name, email, and department
* **Sorting**

  * Sort by any column in ascending or descending order
* **Responsive Design**

  * Table view for desktop
  * Card view for mobile screens
* **Validation**

  * Names must be at least 2 characters and letters only
  * Email must be valid
  * Department is required and letters only


## Project Structure
```
src/
├─ components/
│  ├─ UserCard.jsx       # card view for individual users
│  ├─ UserRow.jsx        # row view for table
│  ├─ UserForm.jsx       # form modal for add/edit user
│  └─ UsersFilters.jsx   # filters UI component
├─ hooks/
│  ├─ useTableData.jsx   # handles filtering, sorting, searching, pagination
│  ├─ useUserActions.jsx # handles add/edit/delete mutations
│  ├─ useUserForm.jsx    # manages form visibility & editing state
│  └─ useUsersMutation.jsx # axios API calls with context updates
├─ utils/
│  └─ axios.js           # axios instance
├─ UsersProvider.jsx     # context for users data
├─ UsersControlProvider.jsx # context for form control & actions
└─ App.jsx               # main component
```

## Reflections

* **Use of Contexts:**
  I separated user data and form control into two contexts to avoid prop drilling and allow modular access to actions and state across components.

* **Custom Hooks:**

  * `useTableData` consolidates search, filter, sort, and pagination, making the table logic reusable and decoupled from UI.
  * `useUserActions` encapsulates mutation logic, including loading states and toast notifications.
  * `useUserForm` manages modal visibility and editing state cleanly.

* **Responsive Design:**
  Decided to use a table for desktop and card layout for mobile to maintain usability across devices.

* **Validation:**
  Implemented synchronous validation in the form to reduce backend errors and provide instant user feedback.

* **Loading States & Feedback:**

  * Added spinners for edit/delete actions to indicate progress.
  * Used `react-toastify` for error handling and notifications.

* **Pagination & Sorting:**
  Implemented client-side sorting, filtering, and pagination for simplicity, assuming the dataset is relatively small. For larger datasets, server-side operations would be more appropriate.

## Assumptions

1. The backend API has the following endpoints:

   * `GET /users` – fetch all users
   * `POST /users` – add a user
   * `PUT /users/:id` – update a user
   * `DELETE /users/:id` – delete a user
2. User objects have fields: `id`, `first_name`, `last_name`, `email`, `department`.
3. Dataset is small enough to handle client-side filtering, sorting, and pagination.
4. Department is a single string; no nested objects or multiple departments per user.
5. Unique `id` exists for all users for keying in lists and mutation operations.

# API Choice
The assignment suggested using JSONPlaceholder as the backend API, and I agree that it works well for basic demonstrations. However, after reviewing its documentation and experimenting with it, I realized some limitations when trying to showcase the assignment’s full functionality:

- Add requests always returned success, but no data persisted.
- Update requests only returned success for users with IDs less than 10, and failed silently for others.
- Delete requests always returned success without reflecting real changes.
- JSONPlaceholder’s /users endpoint did not fully align with the required fields (such as Department).

To better demonstrate the functionality, I took the initiative to research alternatives and switched to MockAPI, which provided:

- A reliable and configurable mock backend.
- The ability to define custom fields (including Department).
- Support for filters, search, sort, and pagination through query parameters (though in this project, filtering, search, and sort were implemented client-side).

## Installation

```bash
git clone <repo_url>
cd <repo_folder>
npm install
npm start
```

## Project Live At
[Click Here](https://usershub.vercel.app/)

## Usage

1. **View Users** – table on desktop, card on mobile.
2. **Add User** – click **Add User**, fill form, submit.
3. **Edit User** – click **Edit** icon, modify form, submit.
4. **Delete User** – click **Trash** icon, confirm deletion.
5. **Search & Filter** – use search input and filter fields to narrow down users.
6. **Sort** – click table headers to sort ascending/descending.
7. **Pagination** – use Prev/Next buttons or change items per page.

## Technologies

* **Frontend:** React, Tailwind CSS
* **State Management:** React Context
* **HTTP Requests:** Axios
* **Icons:** Lucide React
* **Notifications:** react-toastify
