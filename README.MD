[![tests](https://github.com/suricat89/grand-chase-mobile-farm-guide-api/actions/workflows/ci.yml/badge.svg)](https://github.com/suricat89/grand-chase-mobile-farm-guide-api/actions/workflows/ci.yml)
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

# Grand Chase Mobile: Farm Guide

## Technologies

- Typescript (using GTS - Google Typescript)
- Google Firestore
- JWT with a per route access level validation
- Joi (for smart request input validation)
- Jest (integrated tests with 100% coverage! [Check it out](https://github.com/suricat89/grand-chase-mobile-farm-guide-api/actions))
- Swagger
- [Github CI](https://github.com/suricat89/grand-chase-mobile-farm-guide-api/actions)
- Heroku CD

## Try it on Heroku!

https://grand-chase-mobile-farm-guide.herokuapp.com/docs

## What is it?

This is an API for storing data about **Grand Chase Mobile**:

- Character likability missions
- Adventure dungeons loot and rewards

In future releases it will also have:

- Character skills description
- Character build recommendation (integrated with Discord official channel)
- Pet skills description
- (I'm open to suggestions ;D)

The main purpose of this API is to provide data for the [Flutter app](https://github.com/suricat89/grand_chase_mobile_farm_guide) (soon it will be available on your nearest app store xD)<br/>
We also have an **user registration** with minimal data and encrypted password storage and validation (we value your privacy!).

## Environment variables

| Name                       | Default value |
| -------------------------- | ------------- |
| NODE_ENV                   | development   |
| PORT                       | 5000          |
| FIRESTORE_COLLECTION_USERS | users         |
| JWT_SECRET_KEY             |               |
| JWT_EXPIRES_IN             |               |
| DEFAULT_ADMIN_PASSWORD     | 123           |
