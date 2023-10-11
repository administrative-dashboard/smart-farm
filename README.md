# Smart Farm

## Overview

Smart Farm is an agricultural monitoring system dashboard that consisting of deliverables for agricultural monitoring.

## Deliverables:
1.Web Dashboard: A user-friendly web-based dashboard for agricultural monitoring.
2.User Authentication and Authorization: Implementation of Google-based authentication and authorization mechanisms.
3.ABAC Implementation: Integration of Attribute-Based Access Control (ABAC) for fine-grained access control.
4.Real-time Data Visualization: An environment for real-time data visualization.
5.Technical Documentation: Documentation to aid in system understanding and maintenance.


## Folder Structure

### Client

The client folder contains the frontend code for the application.

```bash
.
│
├── src
│   ├── abac.js
│   ├── App.js
│   ├── assets
│   │   ├── static
│   │   │   ├── images and icons...
│   ├── components
│   │   ├── Component files...
│   ├── consts.js
│   ├── index.js
│   ├── layouts
│   │   ├── Layout.js
│   ├── pages
│   │   ├── admin
│   │   │   ├── Admin-related pages...
│   │   ├── auth
│   │   │   ├── Authentication-related pages...
│   │   ├── CommunityManager
│   │   │   ├── Community Manager-related pages...
│   │   ├── MainDashboard.js
│   │   └── owner
│   │       ├── Owner-related pages...
│   ├── providers
│   │   ├── authProvider.js
│   │   ├── authUtils.js
│   │   └── dataProvider.js
│   ├── themes
│   │   ├── general_theme.js
│   │   └── theme.js
│
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│
├── Dockerfile.local
├── package.json
├── package-lock.json
├── README.md
└── other project files...

```
### Server

The server folder contains the backend code for the application.

```bash
.
├── config
│   └── config.js
├── Dockerfile.local
├── nest-cli.json
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── auth
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── dto
│   │   │   └── token-payload.dto.ts
│   │   ├── google-auth.service.ts
│   │   ├── google.service.ts
│   │   ├── guards
│   │   │   ├── auth.guard.ts
│   │   │   ├── google.oauth.guard.ts
│   │   │   ├── roles_perms.decorator.ts
│   │   │   └── roles_perms.guard.ts
│   │   └── strategies
│   │       ├── google.strategy.ts
│   │       └── jwt.strategy.ts
│   ├── communities
│   │   ├── communities.controller.ts
│   │   ├── communities.module.ts
│   │   └── communities.service.ts
│   ├── database
│   │   ├── migrations
│   │   │   ├── 20230828143437-users.js
│   │   │   ├── 20230828174107-communities.js
│   │   │   ├── 20230828180438-users_communities.js
│   │   │   ├── 20230828190953-roles.js
│   │   │   ├── 20230828191419-users_roles.js
│   │   │   ├── 20230828191512-roles_perms.js
│   │   │   ├── 20230828193204-sensor_types.js
│   │   │   ├── 20230828194104-product_types.js
│   │   │   ├── 20230828194427-owners_products.js
│   │   │   ├── 20230829210059-sensors.js
│   │   │   ├── 20230829210343-fields_sensors.js
│   │   │   ├── 20230829210621-greenhouses_sensors.js
│   │   │   ├── 20230829211140-products.js
│   │   │   ├── 20230829211402-device_requests_history.js
│   │   │   ├── 20230829212239-schedules_devices.js
│   │   │   ├── 20230829223109-permissions.js
│   │   │   ├── 20230901175643-device_usage_statistics_communities.js
│   │   │   ├── 20230901180900-sensor_usage_statistics_greenhouses.js
│   │   │   ├── 20230901181221-sensor_usage_statistics_fields.js
│   │   │   ├── 20230901181701-device_usage_statistics_greenhouses.js
│   │   │   ├── 20230901181800-device_usage_statistics_fields.js
│   │   │   ├── 20230907120105-fixed_devices.js
│   │   │   ├── 20230907120204-owners_fixed_devices.js
│   │   │   ├── 20230907120402-portable_devices.js
│   │   │   ├── 20230924111549-fields.js
│   │   │   ├── 20230926162049-owners_greenhouses.js
│   │   │   ├── 20230926162223-greenhouses.js
│   │   │   ├── 20230926173322-measurement_units.js
│   │   │   ├── 20230928194921-users_permissions.js
│   │   │   ├── 20231001201636-owners_portable_devices.js
│   │   │   ├── 20231002114915-owners_greenhouses.js
│   │   │   ├── 20231002115211-owners_fields.js
│   │   │   └── 20231004153741-owners_fields.js
│   │   ├── models
│   │   │   ├── communities.model.ts
│   │   │   ├── device_requests_history.model.ts
│   │   │   ├── device_usage_statistics_communities.model.ts
│   │   │   ├── device_usage_statistics_fields.model.ts
│   │   │   ├── device_usage_statistics_greenhouses.model.ts
│   │   │   ├── fields.model.ts
│   │   │   ├── fixed_devices.model.ts
│   │   │   ├── greenhouses.model.ts
│   │   │   ├── measurement_units.ts
│   │   │   ├── owners_fields.model.ts
│   │   │   ├── owners_fixed_devices.model.ts
│   │   │   ├── owners_greenhouses.model.ts
│   │   │   ├── owners_portable_devices.model .ts
│   │   │   ├── owners_products.model.ts
│   │   │   ├── permissions.model.ts
│   │   │   ├── portable_devices.model .ts
│   │   │   ├── product.model.ts
│   │   │   ├── product_types.model.ts
│   │   │   ├── roles.model.ts
│   │   │   ├── roles_perms.model.ts
│   │   │   ├── schedules_devices.model.ts
│   │   │   ├── sensor_usage_statistics_fields.model.ts
│   │   │   ├── sensor_usage_statistics_greenhouses.model.ts
│   │   │   ├── users_communities.model.ts
│   │   │   ├── users.model.ts
│   │   │   ├── users_permissions.model.ts
│   │   │   └── users_roles.ts
│   │   └── seeders
│   │       ├── 20230829223519-roles.js
│   │       ├── 20230924211822-measurement_units.js
│   │       ├── 20230929222755-communities.js
│   │       ├── 20231001082030-portable_devices.js
│   │       ├── 20231001184426-fixed_devices.js
│   │       ├── 20231001185807-owners_fixed_devices.js
│   │       ├── 20231001201724-owners_portable_devices.js
│   │       ├── 20231001202717-fields.js
│   │       ├── 20231002114645-owners_fields.js
│   │       ├── 20231002114927-owners_greenhouses.js
│   │       ├── 20231002115805-greenhouses.js
│   │       ├── 20231005121215-permissions.js
│   │       ├── 20231007192450-owners_products.js
│   │       └── 20231008202951-users_communities.js
│   ├── dto
│   │   └── create-device.dto.ts
│   ├── main.ts
│   ├── measurement-units
│   │   ├── measurement-units.controller.ts
│   │   ├── measurement-units.module.ts
│   │   └── measurement-units.service.ts
│   ├── middlewares
│   │   └── auth
│   │       ├── account.middleware.ts
│   │       ├── auth.middleware.ts
│   │       └── unauthorozed.middleware.ts
│   ├── owner-fields
│   │   ├── owner-fields.controller.ts
│   │   ├── owner-fields.module.ts
│   │   └── owner-fields.service.ts
│   ├── owner-fixed-devices
│   │   ├── owner-fixed-devices.controller.ts
│   │   ├── owner-fixed-devices.module.ts
│   │   └── owner-fixed-devices.service.ts
│   ├── owner-greenhouses
│   │   ├── owner-greenhouses.controller.ts
│   │   ├── owner-greenhouses.module.ts
│   │   └── owner-greenhouses.service.ts
│   ├── owner-portable-devices
│   │   ├── owner-portable-devices.module.ts
│   │   ├── owners-portable-devices.controller.ts
│   │   └── owners-portable-devices.service.ts
│   ├── owner-products
│   │   ├── products.controller.ts
│   │   ├── products.module.ts
│   │   └── products.service.ts
│   └── user
│       ├── user-community.service.ts
│       ├── user.controller.ts
│       ├── user.module.ts
│       ├── user-permissions.service.ts
│       ├── user-roles.service.ts
│       └── user.service.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
├── tsconfig.build.tsbuildinfo
└── tsconfig.json

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
```

### Example server installation

```bash
cd server_example/
npm install
npm run server
```
### Grafana installation
 ```bash
 sudo apt-get install -y apt-transport-https software-properties-common wget
 sudo mkdir -p /etc/apt/keyrings/
 wget -q -O - https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
 echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
 sudo apt-get update
 # Installs the latest OSS release:
 sudo apt-get install grafana
 ```
Modify Grafana Configuration:
Open the /etc/grafana/grafana.ini configuration file.
Find the http_port setting (default is 3000) and change it to run on port 7000.
Locate the allow_embedding setting and change it from false to true.
Ensure that you uncomment these lines if they are originally commented out.
Ensure to do 
```bash
sudo systemctl restart grafana-server
```
These changes will enable Grafana to run on port 7000 and allow for embedding of Grafana dashboards.

```bash
#to run the grafana server automatically when system boots
sudo systemctl enable grafana-server
sudo systemctl start grafana-server

 ```
![Alt Text](./client/src/assets/static/1)

 Default password for grafana is "admin" for admin user. It will ask you to change the password for security purposes. The default password for the Grafana admin user is "admin." You will be prompted to change this password for security reasons.
 Before creating a datasource, set up a dedicated user with select privileges in Postgresql:
 ```bash
CREATE USER grafana WITH PASSWORD 'grafana';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO grafana;
 ```

When configuring your datasource, use the following details:

Host: localhost:5432
Database: smart_farm
User: grafana
Password: grafana

![Alt Text](./client/src/assets/static/2.png)
Copying Datasource UID:
After configuring your datasource, copy the datasource UID from the window.
Update Configuration Files:
Open the ./grafana/devices.json and ./grafana/fields-greenhouses.json files.
Replace the existing datasource UID in both files with the UID you copied earlier.
Import Dashboards:
In Grafana, navigate to the "Import Dashboard" section.
Upload the devices.json and fields-greenhouses.json files.
Visualize Your Data:
Once imported, you will now have access to the visualizations and dashboards in Grafana, allowing you to explore and analyze your data.

## Usage

## Troubleshooting

## Contributing

## License
