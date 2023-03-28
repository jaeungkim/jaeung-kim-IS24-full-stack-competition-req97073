# Jaeung Kim - IS24 - FULL STACK COMPEITITION - REQ97073

# BC Government Web Applications Management

This is a full-stack web application that tracks and manages web applications developed by the Province of BC. It is part of the code challenge for the IS-24 Full Stack Developer Position.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The BC Government Ministry of Citizens' Services Information Management Branch (IMB) is currently trying to catalog current modern web applications in GitHub, as well as new products that are coming up in the future. Currently, there are 40 products marked for modernization that need to be cataloged, as well as 3 products that are either actively being developed or in a maintenance lifecycle.

This application provides a simple way to display, create and edit information related to these web applications. The user base for this application will include a wide array of technical skills, therefore making this application as simple as possible to use is being stressed by the IMB Senior Leadership Team (SLT).

## Technologies Used

The following technologies were used in building this web application:

- Backend: Node.js, Express.js, Faker.js,
- Frontend: React, Tailwind CSS
- Database: MongoDB
- Documentation: Swagger

## Installation and Setup

To run this application on your local development machine, follow these steps:

1. Open Terminal and Clone the repository on the directoy of your choice.

```bash
git clone https://github.com/jaeungkim/jaeung-kim-IS24-full-stack-competition-req97073.git
```

## Usage

To run the application, please follow the steps below:

1. Open a terminal and navigate to the project directory.

```bash
cd jaeung-kim-IS24-full-stack-competition-req97073
```

### Front-End (React)
1. Open Terminal and navigate to the "client" folder and install dependencies. (Front-End)

```bash
cd client
npm install
```

2. Run the application
```bash
npm start
```

Now, you should be able to see the front end application at http://localhost:3030/

Here is the sample image at localhost

![alt text](/client/src/assets/sample.png)

### Back-End (Node)
1. Open Separate Terminal, navigate to the "server" folder and install dependencies. (Back-End)

```bash
cd server
npm install
```

- Run the Application

```bash
npm run dev
```

Faker.js will automatically populate your mongodb database with 40 products.

It will display the following upon successful connection

```bash
[nodemon] 2.0.20
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
Listening on port 3000
Successfully connected to MongoDB
Added new products
```

Now, you should be able to see the back end swagger documentation at http://localhost:3000/api/api-docs
