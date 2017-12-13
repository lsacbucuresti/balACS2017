// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBlMqGCyV4LqbIWuwAHVcpCReTF-ayEbRY',
    authDomain: 'lsac-tonight2.firebaseapp.com',
    databaseURL: 'https://lsac-tonight2.firebaseio.com',
    projectId: 'lsac-tonight2',
    storageBucket: 'lsac-tonight2.appspot.com',
    messagingSenderId: '25937690913'
  }
};
