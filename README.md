#### CfsWallet unlocks philanthropic giving at scale by making charity an employee benefit, giving people the power of a personal foundation in the palm of their hand: a 401K for giving.

## Tech

Packages used:

- [React Native] - Create native apps for Android and iOS using React
- [React Navigation] - Routing and navigation for Expo and React Native apps
- [Redux-Toolkit] - State Management.

## Installation

CfsWallet requires Xcode and cocoapods for iOS, Android requires Android Studio and Java SDK 8 or 14.

Install the dependencies.

```sh
jar xf <file-name>.zip
yarn

#iOS
yarn ios:pod
yarn ios

#Android
yarn android
```

## Running the project

1. Running on iOS simulator
  ```sh
  npx react-native run-ios
  ```
2. Running on Android emulator
  ```sh
  npx react-native run-android
  ```

## Branch naming pattern
In most cases ticket number is a good branch name.<br />
However, if you wish to add a short name after that, use "-" after the ticket number.

<TICKET_NUMBER>-\<optional-additional-name>

**examples:**
- CFSW-2178
- CFSW-2178-something-more
- CFSW-2178-2

Please try not to create a branch without a ticket but if you have to. just pick a name and use "-" instead of space
**examples:**
- my-branch
- branch-without-ticket
