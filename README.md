# Back-end

How to do lifehacks back end! Good luck all!

# Documentation:

# Base URL for Deployed API

https://how-to-2-team-win.herokuapp.com/api

# Endpoints

# Auth endpoints

| Request | URL               | Description                               |
| ------- | ----------------- | ----------------------------------------- |
| POST    | api/auth/register | register as a new user                    |
| POST    | api/auth/login    | login as an existing user                 |

# Lifehack endpoints

| Request | URL                      | Description                               |
| ------- | ------------------------ | ----------------------------------------- |
| GET     | api/howtodos             | get all lifehacks (needs to be logged in) |
| POST    | api/howtodos             | post new lifehacks (requires auth)        |
| GET     | api/howtodos/:id         | get specific lifehack                     |
| GET     | api/howtodos/:id/ratings | get all ratings for lifehack              |
| PUT     | api/howtodos/:id         | edit specific lifehack                    |
| DELETE  | api/howtodos/:id         | delete specific lifehack                  |

# Ratings Endpoints (some of these endpoints are pending updates, message will be removed when finished)

| Request | URL               | Description                               |
| ------- | ----------------- | ----------------------------------------- |
| GET     | api/ratings       | get list of all ratings                   |
| POST    | api/ratings       | post new rating (requires auth)           |
| GET     | api/ratings/:id   | get specific rating                       |
| PUT     | api/ratings/:id   | edit specific rating                      |
| DELETE  | api/ratings/:id   | delete specific rating                    |

# Table Requirements

# Users

| Name     | Type    | Required | Unique | Notes                         |
| -------- | ------- | -------- | ------ | ----------------------------- |
| id       | integer | yes      | yes    | users id (auto generated)     |
| email    | string  | yes      | yes    | users email (max char 255)    |
| password | string  | yes      | no     | users password (max char 255) |

# How To Do's

| Name        | Type    | Required | Unique | Notes                        |
| ----------- | ------- | -------- | ------ | ---------------------------- |
| id          | integer | yes      | yes    | lifehack id (auto generated) |
| title       | string  | yes      | no     | lifehack title               |
| author      | string  | yes      | no     | creator of lifehack          |
| description | string  | yes      | no     | description of lifehack      |
| image_url   | string  | no       | no     | url of an image user uploads |

# Ratings

| Name        | Type    | Required | Unique | Notes                        |
| ----------- | ------- | -------- | ------ | ---------------------------- |
| id          | integer | yes      | yes    | rating id (auto generated)   |
| rating      | integer | yes      | no     | rating from 1-5              |
| description | string  | yes      | no     | user description (optional)  |
| howtodo_id  | integer | yes      | no     | howtodo id                   |
| user_id     | integer | yes      | no     | user id that submitted       |
