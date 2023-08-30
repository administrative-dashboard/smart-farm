# Smart Farm

## Overview

Smart Farm is an agricultural monitoring system that uses sensors to collect data on environmental conditions such as temperature, humidity, and soil moisture. This data is then sent to a central server, where it can be accessed by farmers to make informed decisions about their crops.

## Folder Structure

### Client

The client folder contains the frontend code for the application.

```bash
.
├── client
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── assets
│       │   └── static
│       │       ├── analytics.png
│       │       ├── animal.png
│       │       ├── automobile.png
│       │       # ...(images)
│       │       ├── mockData
│       │       │   ├── device.mockData.js
│       │       │   └── owner.mockData.js
│       ├── components
│       │   ├── AppBar.js
│       │   ├── BarDiagram.js
│       │   ├── BasicSelectForm.js
│       │   └── # ... (component files)
│       ├── dataProvider.js
│       ├── index.css
│       ├── index.js
│       ├── layouts
│       │   └── Layout.js
│       ├── logo.svg
│       ├── pages
│       │   ├── admin
│       │   │   ├── AdminDeviceStatistic.js
│       │   │   ├── ChooseCommunity.js
│       │   │   ├── ChooseDevice.js
│       │   │   └── # ... (admin pages)
│       │   ├── auth
│       │   │   ├── NewData.js
│       │   │   ├── Profile.js
│       │   │   ├── Signin.js
│       │   │   └── Signup.js
│       │   ├── CommunityManager
│       │   │   └── CommunityManager.js
│       │   ├── Contact.js
│       │   ├── Desktop.js
│       │   ├── MainDashboard.js
│       │   └── owner
│       │       ├── CustomDeviceRequestCreate.js
│       │       ├── Desktop.js
│       │       ├── DeviceDesktop.js
│       │       └── # ... (owner pages)
│       ├── reportWebVitals.js
│       ├── services
│       │   ├── owner
│       │   │   └── DeviceRequestService.js
│       │   └── userService.js
│       ├── setupTests.js
│       └── themes
│           └── theme.js

```
### Server

The server folder contains the backend code for the application.

```bash
.
├── server
│   ├── dist
│   │   # Compiled TypeScript files
│   ├── nest-cli.json
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── src
│   │   ├── app.controller.spec.ts
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   ├── communities
│   │   │   └── communities.module.ts
│   │   ├── database
│   │   │   ├── config
│   │   │   │   └── config.js
│   │   │   ├── migrations
│   │   │   │   # Database migration files
│   │   │   ├── models
│   │   │   │   # Database models
│   │   │   └── seeders
│   │   │       # Seeder files
│   │   ├── main.ts
│   │   └── users
│   │       └── users.module.ts
│   ├── test
│   │   ├── app.e2e-spec.ts
│   │   └── jest-e2e.json
│   ├── tsconfig.build.json
│   └── tsconfig.json
```

### Example server

The server_example folder contains an example server setup for filling the tables with example data.

```bash
.
├── server_example
│   ├── db.json
│   ├── package.json
│   └── package-lock.json
```

## Installation

### Client installation

```bash
cd client/
npm install
npm run start

```

### Server installation

```bash
cd server/
npm install
npx sequelize db:migrate 
npm run start:dev
# or npm run build && node dist/main.js (production)

```

### Example server installation

```bash
cd server_example/
npm install
npm run server
# or npm run build && node dist/main.js (production)

```


## Usage

## Troubleshooting

## Contributing

## License