# Shopping-App-Apollo

Cache based Shopping app using GraphQL &amp; Apollo

# Getting Started

To start client run `npm start`
To start api run `npm run api`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## About

This project is a shopping based application using Typescript, React, GraphQL and Apollo technologies.
It has a required login and registration with a jwt based access and refresh token to handle authentication.
It uses apollo3-cache-persist to persist the data upon logout and when taking actions within the app without having to make any new networks calls.
The client takes advantage of apollo's normalized caching.

### Implementation Details

This application implements the following:

**1. Normalized cache:** Apollo Client stores data in a normalized cache, which means that data is stored in a flat and normalized structure, making it easy to retrieve and update data. This also helps to prevent data duplication and improves the performance of the application. (See `merge` function withing `cache.ts`)

**2. Reactive variables:** Apollo Client allows you to use reactive variables to store and manage data within the cache. Reactive variables provide a way to manage local state and reactively update the cache when the state changes. This makes it easy to manage complex state in a reactive and performant way. (See `cartItemsVar` references and reactivity between components)

**3. Client-only queries:** Apollo Client allows you to execute client-only queries, which means that you can query the cache directly without making a network request. This is useful for managing local state and improving the performance of the application. (See `myCartItems @client` query)

**4. Optimistic UI updates:** Apollo Client allows you to perform optimistic UI updates, which means that you can update the cache optimistically before the server responds. This helps to improve the perceived performance of the application and provides a better user experience. (e.g. Update function in a mutation)

**5. Automatic caching of network responses:** Apollo Client automatically caches network responses, which means that you can easily retrieve data from the cache without making a network request. This helps to improve the performance of the application and reduces the amount of data that needs to be transferred over the network.

**6. Query deduplication:** Apollo Client automatically deduplicates queries, which means that multiple identical queries will only be sent once to the server. This helps to reduce the amount of network traffic and improves the performance of the application. (See `getOrder` read function to see more details)

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
