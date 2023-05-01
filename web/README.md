# URL Shortener Web
<img alt="alt_text" width="100%" src="./thumbnail.png" />

This web application is designed to shorten long URLs into shorter ones. It is built using Next.js and TypeScript. It allows users to enter a long URL, which is then converted into a shorter, more manageable link.

## Installation

To run the application locally, please follow these steps:

1. Clone the repository to your local machine.
2. Create file `.env.local` and set environment variables
```
API_BASE_URL=<YOUR-API-BASE-URL>   // Example: http://localhost:8000
``` 
2. Install dependencies using `pnpm install`
3. Start the development server using `pnpm run dev`

## Usage

Once the server is running, open your web browser and navigate to `localhost:3000`. From there, you can enter any long URL that you would like to shorten. Click the "Shorten" button to generate a shortened URL.

You can also view a shortened URL that has been generated and click the shorten URL to test the URL is going to redirect to original URL or not.

## Technical Details

This application is built using NextJS and TypeScript. The server uses an SQLite/PostgreSQL database to store the mapping between long and short URLs.
