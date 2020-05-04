# Logan Zipkes' Personal Blog

## BUGS:

- [x] New post is not saving to the database
FIXED: I was calling the next function inside of the post schema pre function, but I never actually included 'next' as a parameter in the callback

## TODO:

- [ ] Figure out how to use async/await for post router's edit and delete post
<!-- - [ ]  -->