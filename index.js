const { ApolloServer, gql } = require('apollo-server');
const uuid = require('uuid');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    id: String!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }

  type Post {
    id: String!
    author: User!
    comments: [Post]
    content: String!
    createdAt: String!
    updatedAt: String
  }

  type Query {
    users: [User]
    posts: [Post]

    post(id: String!): Post
    comments(post: String!): [Post]
    comment(post: String!, id: String!): Post
  }

  type Mutation {
    register(email: String!, password: String!, firstName: String!, lastName: String!):String
    createPost(author: String!, content: String!):String
    removePost(id: String!):String
    updatePost(id: String!, content: String!):String
    createComment(id: String!, author: String!, content: String!):String
    removeComment(post: String!, id: String!):String
    updateComment(post: String!, id: String!, content: String!):String
  }
`;

const users = [
  {
    id: uuid.v4(),
    email: 'miguel@gmail.com',
    password: 'qwertyuiop',
    firstName: 'Miguel',
    lastName: 'Dos Santos'
  },
  {
    id: uuid.v4(),
    email: 'efrei@gmail.com',
    password: 'qwertyuiop',
    firstName: 'Efrei',
    lastName: 'School'
  }
];

const posts = [];

const resolvers = {
  Query: {
    users: () => users,
    posts: () => posts,
    post: (parent, args, context, info) => {
      return posts.filter(post => {
        return post.id === args.id
      })[0]
    },
    comments: (parent, args, context, info) => {
      var post = posts.filter(post => {
        return post.id === args.post
      })[0]
      return post.comments;
    },
    comment: (parent, args, context, info) => {
      var post = posts.filter(post => {
        return post.id === args.post
      })[0]
      var comment = post.comments.filter(comment => {
        return comment.id === args.id
      })[0]
      return comment;
    },    
  },
  Mutation: {
    register: (parent, args, context, info) => {
      
      return users.push({
        id: uuid.v4(),
        email: args.email,
        password: args.password,
        firstName: args.firstName,
        lastName: args.lastName,
      });
    },
    createPost: (parent, args, context, info) => {

      var author = users.filter(user => {
        return user.id === args.author
      })[0]

      return posts.push({
        id: uuid.v4(),
        author: author,
        comments: [],
        content: args.content,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    },
    removePost: (parent, args, context, info) => {
      for (let i in posts) {
        if (posts[i].id === args.id) {
          posts.splice(i, 1);
        }
      }
      return args.id;
    },
    updatePost: (parent, args, context, info) => {
      for (let i in posts) {
        if (posts[i].id === args.id) {
          posts[i].content = args.content;
          posts[i].updatedAt = new Date();
        }
      }
      return args.content;
    },
    createComment: (parent, args, context, info) => {
      
      var author = users.filter(user => {
        return user.id === args.author
      })[0]

      for (let i in posts) {
        if (posts[i].id === args.id) {
          posts[i].comments.push({
            id: uuid.v4(),
            author: author,
            comments: [],
            content: args.content,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }
      return args.content;      
    },
    updateComment: (parent, args, context, info) => {

      var post = posts.filter(post => {
        return post.id === args.post
      })[0]

      for (let i in post.comments) {
        if (post.comments[i].id === args.id) {
          post.comments[i].content = args.content;
          post.comments[i].updatedAt = new Date();
        }
      }
      return args.content;
    },
    removeComment: (parent, args, context, info) => {
      
      var post = posts.filter(post => {
        return post.id === args.post
      })[0]

      for (let i in post.comments) {
        if (post.comments[i].id === args.id) {
          post.comments.splice(i, 1);
        }
      }
      return args.id;
    },    
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});