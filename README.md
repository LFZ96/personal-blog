<a href="https://logan-zipkes-blog.herokuapp.com/" target="_blank"><img src="personal-blog-gif.gif" alt="Gif of Blog"></a>

# Logan Zipkes' Blog

Welcome to my personal blog! I created this CRUD blog to share my thoughts and ideas on various topics such as: personal projects, fun development tips and tricks, and anything related to technology.

I graduated from college back in December, and since then I have focused my time and energy into learning full stack web development. This web app is the initial culmination of all the technologies that I have learned over the past couple of months, and I'm so excited to have finally finished a complete MERN project.

## Things that still need work...

- [x] Figure out how to use async/await for api router's edit and delete requests
  - [x] Use async/await with delete post
  - [x] Use async/await with edit post
- [x] Add authentication/authorization for private user functionality
  - [x] Create a Login React component that's accessible from navbar
  - [x] Create a Registration React component that's accessible from the Login component
    - [x] Implement error handling for users
  - [x] Validate user's email and password inputs in database
  - [x] Implement sessions and cookies for authorization
    -[x] Cancel cookie on clientside
  - [x] Allow registered users to create posts, edit their own posts, and delete their own posts
  - [x] Allow users who have not registered to only read others' posts
- [ ] Add custom CSS to the Bootstrap styles that match more closely to my own personal site
  - [x] Add 'LZ' logo to favicon
  - [x] Add 'LZ' logo to navbar next to 'posts'
  - [x] Add darker colors from personal site to the background
  - [x] Change navbar buttons to appear more like personal site's
- [x] Add pagination to the post list page where only 10 posts per page are allowed
- [x] Add markdown to posts' body to allow for a richer experience
  - [x] Update Post model to include sanitized HTML for markdown
  - [x] Update ShowPost React component to show sanitized HTML instead of body
- [x] Persist active color for navbar links
- [x] Find a way to let users know that markdown is allowed for post body
- [x] Change login button styles
- [ ] Make the navbar responsive
- [x] Delete posts from user arrays when user deletes post