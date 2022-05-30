# React Event Calendar

## Getting Started

```shell
# Clone repo to your working directory
1. git clone https://github.com/amadeus-8/react-event-calendar.git

# Choose directory react-event-calendar
2. cd react-event-calendar

# Install all project dependencies
3. npm install

# Run on development mode
4. npm run dev
# The project will start on http://localhost:8080
```

## Package manager
-   Project uses **npm** package manager

## Scripts

- `npm run dev` — Development mode
- `npm run build` — Production mode
- `npm run start` — Run development mode on localhost. The project will start on `http://localhost:8080`

## Git flow and branches

For starting about new task you have to create a new branch from origin/develop

```shell
1. git fetch origin
2. git checkout -b your-branch-name origin/develop
```

After when task is done, you have to create Merge Request (MR) into develop branch

```shell
3. git add .
4. git commit -m "feat: your commit text"
5. git push origin your-branch-name
```