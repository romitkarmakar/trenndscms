![header_image](public/header.jpg)

A Blog managment system for companies, based on nextjs powerful serverless site rendering and MongoDB for database management and Cloudinary as the image server.

## Installation

- Clone the repository.
- Open terminal and install npm packages.
```
npm install
```
- Create an env file to store environment variables.
```
mv .env-example .env
```
- Start the developement server.
```
npm run dev
```
- Create a production build.
```
npm run build
```
- Start the production server.
```
npm start
```

**Note:**  Cloudinary upload preset must allow unauthorised(unsigned) access.

## Deployment

Use Zeit (Recommended) for deploying this project as Zeit has inbuilt CDN and serverless support which can greatly improve performance of your site. You can also any hosting provider of your choice which supports server-side rendering of React pages.