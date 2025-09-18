# BooksApp

A simple web application built with JavaScript to search and display books using the **Google Books API**. 

## Features
- Search for books by title.
- Display book details including title, author, published date, description, and cover image.
- Clicking the link opens the book in **Google Books**.
- Fallback image if the book has no cover.
- Debounced search input for better performance.

## Deployment
This project uses **GitHub Actions** to automatically deploy to **Azure App Service** whenever changes are pushed to the `main` branch.

### Steps we took:
1. Developed the client-side JavaScript application that queries Google Books API.
2. Created an Azure App Service for hosting the app.
3. Configured a GitHub Actions workflow to deploy the app to Azure on each push.
4. Used repository secrets for secure token management.

## How to use
1. Open the application URL hosted on Azure.
2. Enter a book title in the search bar.
3. View the search results and book details.

## Tech Stack
- HTML(Bootstrap), JavaScript
- Google Books API
- Azure App Service
- GitHub Actions (CI/CD)

