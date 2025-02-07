# Story-Flow

Instagram stories feature built with React.js and TypeScript.

## Deployment

I've deployed the application here: https://story-flow-murex.vercel.app/. Currently, the 'main' branch is deployed, containing only the initial setup. As per the assignment guidelines, further changes have been made in a separate feature branch. A member of the STAGE team will review and approve the PR before it is merged into the main branch.

## Instructions for Setting Up and Running the Application

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Setup

1. Clone the repository:

```sh
git clone https://github.com/Naincy31/Story-Flow.git
cd story-flow

```

2. Install Dependencies:

```sh
npm install

```

### Running the Application

To start the application in development mode, run:

```sh
npm start
```

Open http://localhost:3000 to view it in the browser.

### Running Tests

To run the tests, use the following command:

```sh
npm test
```

### Explanation of Design Choices

The goal was to replicate the Instagram Stories experience, where users can view a horizontally scrollable list of stories, tap on a user to view their stories, and navigate between them manually or automatically.

#### Data Structure

Defined a structured format for user stories for easy retrieval and management of stories:

- id (unique identifier)
- user_name (user's name)
- user_dp (user's profile picture)
- user_stories (array of image URLs for each story)

#### Component Structure:

1. StoryList Component: Renders the horizontally scrollable list of users.
2. StoryView Component: Displays the selected user’s stories.
3. The StoryView component is rendered only when a user is selected, improving performance by not mounting unnecessary components.

#### User Experience Enhancements:

1. Automatic Navigation:

   - Stories auto-advance every 5 seconds.
   - When all stories of a user are seen, move to the next user's stories.

2. Manual Navigation:

   - Tapping the left moves to the previous story.
   - Tapping the right moves to the next story.

3. Reordering Seen Users:

   - Once a user's stories are viewed, they are marked as seen and moved to the end of the list, mimicking Instagram's behavior.

4. Swipe-Down to Exit:
   - Swiping down dismisses the story view, just like on Instagram.

##### Performance & Optimization:

1. Lazy Loading & Loading States

   - Implemented a loading state to show a loading icon until the story image is fully loaded.
   - This ensures a smooth user experience by preventing blank screens.

2. Efficient State Management

   - Used React Context API to manage global state:
     - User Stories
     - Seen Status

3. Reusable & Modular Code
   - Created custom hooks to encapsulate reusable logic (e.g., handling auto-advance, tracking seen status).
   - Simplified components by separating concerns, making the code easier to maintain and scale.
