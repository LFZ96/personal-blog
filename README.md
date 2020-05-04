# Logan Zipkes' Personal Blog

Welcome to my personal blog! I created this CRUD blog to share my thoughts and ideas on various topics such as: personal projects, fun development tips and tricks, and anything related to technology.

I graduated from college back in December, and since then I have focused my time and energy into learning full stack web development. This web app is the initial culmination of all the technologies that I have learned over the past couple of months, and I'm so excited to have finally finished a complete MERN project.

## BUGS:

- [x] New post is not saving to the database
FIXED: I was calling the next function inside of the post schema pre function, but I never actually included 'next' as a parameter in the callback

## TODO:

- [ ] Figure out how to use async/await for post router's edit and delete post
<!-- - [ ]  -->