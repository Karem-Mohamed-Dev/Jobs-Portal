﻿# Jobify

Job Portal API

## Table of Contents
- [Installation](#installation)
- [Features](#features)
- [Documentation](#documentation)
- [License](#license)
- [Credits](#credits)
- [Support or Contact](#support-or-contact)

## Installation
- Run "npm i" to install dependencies
- Add .env file then add [ MONGO_URI=(Your MongoDb URI) || SECRET=(Your JWT Secret) ]

### Prerequisites
    - "bcrypt": "^5.1.1",
    - "cors": "^2.8.5",
    - "dotenv": "^16.3.1",
    - "express": "^4.18.2",
    - "jsonwebtoken": "^9.0.2",
    - "mongoose": "^8.0.2",
    - "validator": "^13.11.0"

## Features
- [Login | Sign Up] as Company.
- [Login | Sign Up] as Seeker.
- [Add | Edit | Delete] User Profile.
- [Add | Edit | Delete ] Job.
- Search For Job With [ Sort | Filter ] Functionality

## Documentation

### API
- URL: https://job-porta.onrender.com/api

## Company

#### To login or sign up

- POST /auth/company/login
- POST /auth/company/register

#### To update profile details | Delete Accouunt

- PATCH /company
- DELETE /company

#### To Get company details

- GET /company/:companyId


## Seeker

#### To login or sign up

- POST /auth/seeker/login
- POST /auth/seeker/register

#### To update profile details | Delete Accouunt

- PATCH /seeker
- DELETE /seeker


## Job

- GET /jobs?page=[any number you want by default its 1]
- GET /jobs/single/:jobId
- GET /serach + querys

querys 
- jobTitle [The Closest]
- salary [Greater Than]
- location [The Closest]
- jobType [Spesefic One]
- experienceLevel [Spesefic One]
- sort [By default its by newest] you can also use [salary | createdAt]



## License

All rights reserved. This project is solely owned by [Karem Mohamed] and is not licensed for use or distribution by others without explicit permission.

## Credits

This project is the intellectual property of [Karem Mohamed] and should not be credited to or used by any other entity without permission.

## Support or Contact

For any inquiries, support, or feedback regarding this project, feel free to reach out:

- **Email**: karem109k@gmail.com
- **Social Media**: {
    [Facebook](https://www.facebook.com/profile.php?id=100008974722319)
    [LinkedIn](https://www.linkedin.com/in/karem-mohamed-a789a6239/)
}

We welcome your input and suggestions! Please don't hesitate to contact us for assistance or to report any issues.
