// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDguvjIkn9iswf83pDvSlzUDBfnDZjRHEg',
    authDomain: 'bal-test.firebaseapp.com',
    databaseURL: 'https://bal-test.firebaseio.com',
    projectId: 'bal-test',
    storageBucket: 'bal-test.appspot.com',
    messagingSenderId: '338283283841'
  }
};
