# GeLunchGoWhere

# Introduction

There is frequently a need for teams to collectively decide on a location to head to for lunch. While each team member has an idea in mind, not everyone gets heard in the commotion and much time is spent to arrive at what may as well be a random choice.

1. A user can initiate a session and invite others to join it.
2. Other users who have joined the session may submit a restaurant of their choice.
3. All users in the session are able to see restaurants that others have submitted.
4. The user who initiated the session is able to end the session.
   tech.gov.sg

- At the end of a session, a restaurant is randomly picked from all submitted restaurants. All users in the session are then able to see the picked restaurant.
- A user should not be able to join a session that has already ended.

## About the application

This application comes to two parts, frontend and
[backend](https://github.com/aothepro/LunchGoWhere-backend).

YOU WILL NEED TO RUN BOTH APPLICATIONS.

# Features

- Login
- Dark mode
- Users can change votes as long as session is active
- Lunch date field allows for users to know when lunch will happen
- Lunch session after current date will not be accepting votes

## Running Frontend Application

Clone the application and start it by running the following command in terminal:

```
git clone https://github.com/aothepro/LunchGoWhere-backend.git
cd LunchGoWhere-backend
yarn start
```

## All pages

#### Home page

[path="/"](localhost:3000/)

#### Register

[path="/register"](localhost:3000/)

#### Login

[path="/login"](localhost:3000/login)

#### Create New Session

[path="/sessions/new"](localhost:3000/sessions/new)

#### View a particular session

[path="/sessions/:sessionId"](localhost:3000/sessions/:sessionId)

#### View all sessions

[path="/sessions"](localhost:3000/sessions)

## Register an account

- Go to the [register page](localhost:3000/register)
- Fill up the form with a username and password
- Click `Create Account`

## Login with existing account

- Go to the [register page](localhost:3000/login)
- Fill up the form with your username and password
- Click `Login`

## Creating a session

- Go to the [create session page](localhost:3000/sessions/new)
- Enter a name for the lunch session
- Enter a date for when the lunch will happen
- Click `Create Session`

## Viewing all session

- Go to [create session page](localhost:3000/sessions)
- You will be able to see a table with all the session
- If the session is open for voting, you can click the `Vote` button at the last column of the table to start voting for that session
- Clicking vote will redirect you to view that particular session

## Viewing a particular session and restaurant voting

- If you completed creating a session, you will be directed to view the created session
- Otherwise, go to localhost:3000/sessions/`{sessionId}`
- Here you will be able to see the details of the session and vote for a restaurant
- To vote for a restaurant, key in the name of the restaurant on the `Restaurant vote` field and click `Vote`
- The table on the right will show existing votes of the session
- If you are the creator of the session, you will be able to see the `End Voting Session` button that will end the session and select a restaurant from the votes.
- The winning votes can also been see by all users in the [Viewing all session page](localhost:3000/sessions)

## Connecting the frontend to the backend

The application will start on port 3000 and proxies requests to 8080 where the backend. This is set via the `package.json` file in

```
{
   ...
   "proxy": "http://localhost:8080"
   ...
}
```

This is to overcome CORS issues when developing. Change the port if you are running the [backend](https://github.com/aothepro/LunchGoWhere-backend) on a non-default port.

## Upcoming features/todos

- Create Home page when users access ("/")
- Pagination of sessions view
- Auto end lunch session if past lunch time
- Setting for anonymous voting
- Google maps integration to select existing restaurant
- Shortlist Sessions where user can only select from a shortlisted list of restaurants
- Dockerize application
- Add integration test via cypress
- Add unit test via jest
