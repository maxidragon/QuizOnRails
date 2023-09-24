# QuizOnRails

QuizOnRails is a simple quiz app built with Rails API and React. In the production environment, the application uses the MySQL database, in the development SQLite.

# Development

## Requirements
- NodeJS (version 20.6.1 or later)
- Ruby
- Rails (version 7.0.8 or later)

Clone this repo and navigate into it
  ```
  git clone https://github.com/maxidragon/QuizOnRails
  cd QuizOnRails
  ```
## Setup backend

- Navigate into backend directory
```
cd backend
```

- Install dependencies
```
bundle install
```

- Run migrations & setup dev database
```
bin/rails db:create db:migrate
```

- Run backend server
```
bin/rails server
```

The server will be accessible at localhost:4000

## Setup frontend

- Navigate into frontend directory
```
cd frontend
```

- Install dependencies
```
npm install
```

- Run frontend server
```
npm start
```
The server will be accessible at localhost:3000

## Tests

- Frontend tests (you must be in frontend directory)
```
npm test
```

- Backend tests (you must be in backend directory)
```
bundle exec rspec
```
  
