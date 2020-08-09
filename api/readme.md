# Condominium - API

- [Condominium - API](#condominium---api)
  - [Comands](#comands)
  - [Structure](#structure)
  - [Most Relevant Dependencies](#most-relevant-dependencies)

## Comands

- Install packages (only needed on first run)
`npm install`

- Run development (with hot reload)
`npm run dev`

- Run prodution (bundle)
`npm run start`

## Structure

```
|
|--bundle
|  :: main 'js' file for production
|
|--src
|  |--config
|  |  :: environment
|  | 
|  |--controller
|  |  :: api routes
|  |
|  |--middleware
|  |  :: middlewares, handlers
|  |
|  |--repository
|  |  :: data access and manipulation
|  |
|  |--service
|  |  :: services, helpers...
|  |
|  |--template
|  |  :: email templates
|
```

## Most Relevant Dependencies

- Express - Server
- Nodemailer - Mail tool
- Pg - Database tool
- JsonWebToken (JWT) - Authentication
