/**
 * GraphQL Schema Definition
 * Provides GraphQL API alongside REST endpoints
 */

const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    # Blog queries
    posts(limit: Int = 10, offset: Int = 0, category: String): [BlogPost!]!
    post(id: ID!): BlogPost
    postBySlug(slug: String!): BlogPost
    
    # Project queries
    projects(limit: Int = 10, offset: Int = 0): [Project!]!
    project(id: ID!): Project
    
    # User queries
    user(id: ID!): User
    currentUser: User
    
    # Admin queries
    stats: Stats
    recentContacts(limit: Int = 10): [Contact!]!
    
    # Analytics
    analytics(startDate: String!, endDate: String!): Analytics
  }

  type Mutation {
    # Blog mutations
    createPost(input: CreatePostInput!): BlogPost!
    updatePost(id: ID!, input: UpdatePostInput!): BlogPost!
    deletePost(id: ID!): Boolean!
    
    # Project mutations
    createProject(input: CreateProjectInput!): Project!
    updateProject(id: ID!, input: UpdateProjectInput!): Project!
    deleteProject(id: ID!): Boolean!
    
    # User mutations
    registerUser(input: RegisterInput!): AuthPayload!
    loginUser(email: String!, password: String!): AuthPayload!
    updateProfile(id: ID!, input: UpdateProfileInput!): User!
    
    # Contact mutations
    submitContact(input: ContactInput!): Contact!
    
    # Newsletter mutations
    subscribe(email: String!): Boolean!
    unsubscribe(email: String!): Boolean!
  }

  type BlogPost {
    id: ID!
    title: String!
    slug: String!
    content: String!
    excerpt: String!
    category: String!
    tags: [String!]!
    author: User!
    featured: Boolean!
    status: String!
    views: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Project {
    id: ID!
    title: String!
    slug: String!
    description: String!
    image: String!
    link: String
    tags: [String!]!
    status: String!
    featured: Boolean!
    createdAt: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    avatar: String
    bio: String
    createdAt: String!
  }

  type Contact {
    id: ID!
    name: String!
    email: String!
    subject: String!
    message: String!
    status: String!
    createdAt: String!
  }

  type Stats {
    totalPosts: Int!
    totalProjects: Int!
    totalUsers: Int!
    totalContacts: Int!
    totalViews: Int!
  }

  type Analytics {
    pageViews: Int!
    uniqueVisitors: Int!
    bounceRate: Float!
    averageSessionDuration: Int!
    topPages: [PageView!]!
    topReferrers: [Referrer!]!
  }

  type PageView {
    path: String!
    views: Int!
    uniqueVisitors: Int!
  }

  type Referrer {
    source: String!
    visits: Int!
  }

  type AuthPayload {
    success: Boolean!
    user: User!
    token: String!
  }

  input CreatePostInput {
    title: String!
    content: String!
    excerpt: String
    category: String!
    tags: [String!]
    featured: Boolean
  }

  input UpdatePostInput {
    title: String
    content: String
    excerpt: String
    category: String
    tags: [String!]
    featured: Boolean
    status: String
  }

  input CreateProjectInput {
    title: String!
    description: String!
    image: String!
    link: String
    tags: [String!]
  }

  input UpdateProjectInput {
    title: String
    description: String
    image: String
    link: String
    tags: [String!]
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input UpdateProfileInput {
    name: String
    bio: String
    avatar: String
  }

  input ContactInput {
    name: String!
    email: String!
    subject: String!
    message: String!
  }
`);

module.exports = schema;
