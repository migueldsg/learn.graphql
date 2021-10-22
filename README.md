### Features:
- [x] Register


- [x] Create a post
- [x] Read all the posts
- [x] Read a post by It's ID
- [x] Update a post by It's ID
- [x] Delete a post by It's ID


- [x] Create a comment on a post
- [x] Read all the comments from a post
- [x] Read a comment by It's ID
- [x] Update a comment by It's ID
- [x] Delete a comment by It's ID

### Queries & Mutations (by order of the features list above)

```(optional)
query GetUsers {
  users {
    id
    email
    password
    firstName
    lastName
  }
}

mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
  register(
    email: $email,
    password: $password,
    firstName: $firstName,
    lastName: $lastName
  )
}

mutation CreatePost($author: String!, $content: String!) {
  createPost(
    author: $author
    content: $content
  )
}

query GetPosts {
  posts {
    id
    author {
      firstName
      lastName
    }
    comments {
      id
      author {
        email
      }
      content
      createdAt
    }
    content
    createdAt
    updatedAt
  }
}

query PostById($id: String!) {
  post (id: $id) {
    id
    author {
      email
      firstName
    }
    comments {
      author {
        email
      }
      content
    }
    content
    createdAt
    updatedAt
  }
}

mutation UpdatePostById($id: String!, $content: String!) {
  updatePost(id: $id, content: $content)
}

mutation RemovePostById($id: String!) {
  removePost(id: $id)
}

mutation CreateComment($id: String!, $author: String!, $content: String!) {
  createComment(
    id: $id
    author: $author
    content: $content
  )
}

query GetComments($post: String!) {
  comments(
    post: $post
    ) {
    id
    author {
      email
      firstName
    }
    content
    createdAt
    updatedAt
  }
}

query GetComment($post: String!, $id: String!) {
  comment(
    post: $post
    id: $id
  ) {
    id
    author {
      email
      firstName
    }
    content
    }
}

mutation UpdateCommentById($post: String!, $id: String!, $content: String!) {
  updateComment(
    post: $post,
    id: $id,
    content: $content
    )
}

mutation RemoveCommentById($post: String!, $id: String!) {
  removeComment(
    post: $post,
    id: $id
  )
}```
