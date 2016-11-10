# OpenRA-MI
OpenRA-MI app is an open source project to make mod installation quicker and easier for any user.

This is built using ReactJS and Electron.

## Commands :
* To start development run `npm run start-dev`
* For production run `npm run start-prod`

## Electron Package for mac
First go to root directory path of your app
Run this command to pre-build the App for mac
`npm run build-mac`

## Usage
Note: You will need Mono installed which you can get from http://www.mono-project.com

```bash
# Clone this repository
git clone https://github.com/MichelKansou/OpenRA-MI

# Go into the repository
cd OpenRA-MI

# Install dependencies and run the app
brew install nodejs && \
brew install p7zip && \
gem install susy && \
gem install compass && \
npm install && \
npm run start-dev
```
## ! Requirements !

### For development
You must have Node.js, Compass and Susy installed globally and included in your $PATH.

#### License

MIT licensed

Copyright (C) 2016 Michel Kansou
