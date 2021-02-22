# About Subrent

SubRent is an app to share equipment with people and companies in your area. Users can rent everything from forklifts to all kinds of industrial equipment. Use our app to find exactly what you need in a few clicks. The app has feature for push notifications, chatring in realtime, messaging system, authentication and profile creation

## Technologies

Front: React Native, React, Redux, Native Base, 
Backend: Expo, Firebase, Geofirstore, Cloud Functions, Stripe 

# or with yarn

yarn add

````
## Available commands
Check out all available commands in package.json. You can run all tests as follows:
```bash
npm test
# or with yarn
yarn test
````

## Install all deps

Clone the app and install all deps

```bash
npm i

# or with yarn
yarn install
```

## Start the app

```bash
npm start

# or with yarn
yarn start
```


## Form component 
Form directory in the components contains Form component and related form inputs. It follows a flexible-compound-pattern. You can learn more about this particular pattern in my open source lib [https://github.com/alisherk/react-design-patterns-ts/tree/master/src/patterns]. Basically you can render form inputs that has validation anywhere in the app as long as they are wrapped inside the form. You can see this pattern in action in the Simulation Page. Please note Dropdown, Radio, and RadioImage components within this directory are specificly designed to work inside the Simulation Page => Question component as they are responsible for fetching submitted options from backend. They can not be really used anywhere else. Also, the form components implement react-hook-form API for validation. You can create more generic inputs that will have valiation out of the box as long as you pass specific validation rules. Take a look at Input and Select components and follow the pattern there. They can be used anythere in the app as long as you pass required props. 

