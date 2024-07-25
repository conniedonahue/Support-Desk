# Support System Ticket Management System

## Overview

## Bootstrap instructions

To run this server locally, do the following:

1. _Clone this repo:_ Grab the HTTPS URL from the main page of this repository and clicking the `<> Code` button. Open a Terminal and change the current working directory to where you'd like the cloned repository to be stored. Use following git command: `git clone <repository_HTTPS_URL>`.
2. _Open the project in an IDE:_ Find the cloned repo and open it in an IDE like VS Code.
3. _Build the npm project:_ Do this by running `npm run build`.
4. _Run the server:_ Run `npm run start` and open up the go to `localhost:3001/`
5. _Create a few tickets:_ Fill out the fields and click `Submit`.
6. _Open up the Admin Portal:_ Go to `localhost:{port}/admin`.
7. _Play around with the Admin Portal:_ Edit, Delete, Respond, and Create New tickets.

### Vercel Deployment

As of July 25, 2025, the app is deployed through Vercel at: `https://support-desk-delta.vercel.app/`.
Be sure to check out the admin page at `https://support-desk-delta.vercel.app/admin` and use the inspector to find some functional logs!

## Design considerations

### Frontend

The frontend is built in React with React Router, this allows:

- Dynamic routing which enables flexibility based on application state. The app can quickly respond to changes in state through different parameters like `:ticketId`.
- Data loading that fetches data required for rendering before they are displayed.
- Hierarchical routing: all of the routes with their corresponding actions and loaders are nested within the main.jsx component, giving devs a birds-eye view of the entire frontend.

Some other front end notes:

- I implemented a sidebar in the admin page for easy access to all of the tickets, and I put the current ticket as an outlet to quickly manipulate the selected ticket.
- In this current implementation, "Respond" button just logs the response message to the console. Ideally, this would be an email and with a record of past interactions.
- The frontend is missing any idempotence enforcement or rate limiting / throttling.

### Backend

The backend is built in Node/Express and uses an in-memory cache as a fake database.

- I designed the cache as a hashmap to allow for constant lookup of tickets based on `ticketId`.
- For real-life deployment, I might mirror this as a key:value database like AWS DynamoDB.
- For data validation, I'd consider going classic OOP by creating a Ticket class. Creating a new ticket would look like `newTicket = new Ticket(Connor, connor@email.com, description)`.

## Assumptions

This application makes several assumptions, namely:

- In order to keep down development time, I opted to store application state in memory. This assumes that 1) data persistence is not important and 2) the machine can handle the load of however many accounts and event logs are created. One major way to improve this backend would be to create an external database to hold tickets.
- The current implementation has no throttling, rate-liming, or load-balancing. This could lead to issues and low responsiveness with multiple concurrent requests.
- The only way to interface with the admin panel is by entering `/admin` into the address bar. This assumes all users on the /admin page have legitimate access. For a real-life scenario, I would host the /admin on a separate domain (e.g. `admin.support-ticket.com`) and implement auth.
- The app currently assumes that if a user creates a new ticket in the admin panel, they will not leave the email field blank.

## Bonus: Deployment considerations

Before deployment, I would beef up the existing codebase to include:

Frontend:

- Implementing auth of some kind to ensure that users have legitimate access to admin panel.
- Add more error handling, validation, and comprehenseive unit and integration tests.
- I would consider setting up a ticket submission queue to handle heavy loads of concurrent requests.
- More pleasant styling.
- Admin functionality: searching tickets, client and interaction history, email, refresh button
- Main Page functionality: I'd like to implement a quick "what is this about?" dropdown with a few options ("I'd like to cancel my account", "I have a billing questions", "How do I use this product", "Other") to allow users to self-categorize and allow for faster reponses from support staff.

Backend:

- Creating an actual ticket database instead of storing in-memory.
- Add unit, integration, end to end tests throughout.
- Add more data validation and use HTTPS
- Add API documentation

As for the deployment, itself:

- I am a fan of serverless architecture, so I would use a fully-managed service like AWS Fargate with Elastic Load Balancer and Elastic Container Registry.
- If we are using AWS, it might make sense to look into hosting our database there too. We could use DynamoDB for lightening speed, and we could pass Tickets through a pub-sub SQS or use SNS to trigger a CloudWatch event to notify us when a new ticket comes in.
- Alternatively, if we wanted to build out complex relationship between users, tickets, and products, we could use the serverless SQL database AWS Aurora — which we could configure with Multi-AZ deployment to allow for higher availability.
- Implement a CI/CD pipeline. I'm a fan of GitHub actions for its seamless integration with existing Pull Request / Issue workflows.
