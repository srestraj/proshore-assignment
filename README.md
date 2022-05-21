# Proshore Assignment

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8080
$ npm run dev

# build for production and launch server
$ npm run build

```

## How things work

You need to first log in to the app.

Credentials:
email: johndoe@email.com
pw: changeme

Once logged in, the user can access the full list of users in a tabular form, search, sort, edit or delete them.

### `store`

The store directory contains all the API calls and mutations required for the app.

### `router`

The router directory contains the routing settings for the app.

### `components`

Components contain all the components used in the app.


### Technologies used:

As explained in the assignment, Vue 3 with composition APi `setup`, Vue Router 4 and Vuex 3 has been used.

Some external packages have also been used such as:
- `axios` for making API calls
- `lodash` for some sorting and searching
- `moment` for date formatting
- `vue-toast-notification` for showing notifications
- `webpack` for building the app
- `json-server-auth` for serving the API with authentication

The JSON server is hosted on Heroku and can be accessed [here](https://fakeserverapi.herokuapp.com/). You can also access the code for the server [here](https://github.com/srestraj/fake-json-server).