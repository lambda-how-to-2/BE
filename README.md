# Back-end
How to do lifehacks back end! Good luck all! 
# Documentation:
# Base URL for Deployed API
https://how-to-2-team-win.herokuapp.com/api
# Endpoints
| Request | URL | Description |
| ------- | --- | ----------- |
| POST | api/auth/register | register as a new user |
| POST | api/auth/login | login as an existing user |
| GET | api/howtodos | get all lifehacks (needs to be logged in) |
| GET | api/howtodos/:id | get specific lifehack |
| PUT | api/howtodos/:id | edit specific lifehack |
| DELETE | api/howtodos/:id | delete specific lifehack |
# Table Requirements
# Users
| Name | Type | Required | Unique | Notes |
| ---- | ---- | -------- | ------ | ----- |
| id | integer | yes | yes | users id (auto generated) |
| email | string | yes | yes | users email (max char 255) |
| password | string | yes | no | users password (max char 255) |
# How To Do's
| Name | Type | Required | Unique | Notes |
| ---- | ---- | -------- | ------ | ----- |
| id | integer | yes | yes | lifehack id (auto generated) |
| title | string | yes | no | lifehack title |
| author | string | yes | no | creator of lifehack |
| description | string | yes | no | description of lifehack |
