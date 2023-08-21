# BLOG-USERS

This is a backend application for creating a blog site for users with comments and login functionality.

## Prerequisites:

- Knowledge of NodeJS
- MongoDB atlas account

## Implementation

[**Application is live**](https://blog-users-5ly8.onrender.com/)

## User:

- **[POST]** Registration route : `/api/user/register`
  JSON_BODY:
  ```
  {
  "name": "<name>",
  "email": "<email>",
  "password": "<password>"
  }
  ```
- **[POST]** Login route : `/api/user/login`
  JSON_BODY:
  ```
  {
  "name": "<name>",
  "email": "<email>",
  "password": "<password>"
  }
  ```
- **[GET]** Logout route : `/api/user/logout`

## Blog:

- **[GET]** Fetch Blogs : `/api/blog/fetch`
- **[POST]** Create Blog(Authentication required): `/api/blog/create`
  JSON_BODY:
  ```
  {
  "title": "<Title>",
  "content": "<Content>"
  }
  ```
- **[PUT]** Update Blog(Authentication required): `/api/blog/update`
  JSON_BODY:
  ```
  {
  "blogId": "<Blog ID>,
  "title": "<Title>",
  "content": "<Content>"
  }
  ```

## Comments:

- **[GET]** Fetch comments for a Blog : `/api/blog/comment/fetch/<blogId>`
  _Note: Replace <blogId> with Blog ID._
- **[POST]** Create comment on a Blog(Authentication required) : `/api/blog/comment/create`
  JSON_BODY:
  ```
  {
  "blogId": "<Blog ID>",
  "content": "<Content>"
  }
  ```

## Admin purpose:

- **[GET]** Fetch Users : `/api/admin/users`
- **[GET]** Fetch Blogs : `/api/admin/blogs`
- **[GET]** Fetch Comments : `/api/admin/comments`
