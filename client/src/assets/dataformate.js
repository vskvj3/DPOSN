export const user = {
  _id: '1',
  firstName: 'John',
  lastName: 'Doe',
  about: 'Active',
  image: 'hash',
  circle: [],
  posts: [],
}

export const posts = [
  {
    userId: 1,
    postHash: 'QmQNTkmWPV9KP6xT3kiFZcTMJYmgnHR5vb6QEGfH7PoBRs',
  },
  {
    userId: 1,
    postHash: 'QmWCPYuf8vtxc1XyxQVyxwPU6NHUxPdhp3KkMQwcAXhvTz',
  },
  {
    userId: 1,
    postHash: 'QmU8hSuXZbdaDEH27N1MPEnyF3rkKERvtBXG1m7KZjjFN2',
  },
]

export const comments = [
  {
    _id: 1,
    userId: 1,
    comment: 'This is a comment 1',
  },
  {
    _id: 2,
    userId: 1,
    comment: 'This is a comment 2',
  },
  {
    _id: 3,
    userId: 1,
    comment: 'This is a comment 3',
  },
  {
    _id: 4,
    userId: 1,
    comment: 'This is a comment 4',
  },
]

export const newsfeed = [
  {
    userId: 1,
    postId: 1,
    timestamp: '2023-05-25',
  },
  {
    userId: 2,
    postId: 2,
    timestamp: '2023-05-25',
  },
  {
    userId: 2,
    postId: 2,
    timestamp: '2023-05-25',
  },
  {
    userId: 2,
    postId: 2,
    timestamp: '2023-05-25',
  },
]
