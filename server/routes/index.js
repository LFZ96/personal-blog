const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const posts = [
    {
      author: 'Logan Zipkes',
      title: 'Test Post',
      description: 'This is a test description for test article #1',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A condimentum vitae sapien pellentesque habitant morbi tristique. Cras semper auctor neque vitae tempus quam. Id volutpat lacus laoreet non curabitur gravida arcu ac tortor. Purus in massa tempor nec feugiat. Volutpat maecenas volutpat blandit aliquam etiam. Quam pellentesque nec nam aliquam sem et. Mauris pharetra et ultrices neque ornare aenean. Sit amet nisl purus in mollis nunc. Nisl pretium fusce id velit ut tortor. Ullamcorper velit sed ullamcorper morbi tincidunt ornare. Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Suspendisse faucibus interdum posuere lorem ipsum. Porttitor rhoncus dolor purus non enim praesent. A arcu cursus vitae congue mauris rhoncus. Dignissim convallis aenean et tortor at. Neque ornare aenean euismod elementum nisi quis. Feugiat vivamus at augue eget arcu dictum varius duis at.\n\nMassa enim nec dui nunc mattis enim ut. Convallis convallis tellus id interdum velit laoreet id. Sollicitudin tempor id eu nisl. Nullam eget felis eget nunc lobortis mattis. Feugiat pretium nibh ipsum consequat nisl vel pretium. Id leo in vitae turpis massa sed. Quam elementum pulvinar etiam non quam lacus suspendisse. Sit amet luctus venenatis lectus magna fringilla urna porttitor. Enim sit amet venenatis urna cursus. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet.',
      slug: 'test-post',
      createdAt: new Date()
    },
    {
      author: 'Logan Zipkes',
      title: 'Test Post 2',
      description: 'This is a test description for test article #2',
      body: 'asdfasdfasdfasdfasdfasdfasdf',
      slug: 'test-post2',
      createdAt: new Date()
    }
  ];

  res.render('posts/index', { posts: posts });
});

module.exports = router;