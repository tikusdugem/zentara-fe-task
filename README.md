# How to play?

This project is intended for Technical Assessment, so give me feedback <3

## Development

- Clone this repo and move to the directory
  ```
  git clone git@github.com:tikusdugem/zentara-fe-task.git
  cd zentara-fe-task
  ```
- Install Dependencies
  ```
  npm install
  ```
- Setup ENV

  Create `.env` file on the root directory, then ask the developer to giving you the value of environments

  ```
  cp .env.example .env
  ```

- Play the Game
  ```
  npm run dev
  ```

## Deployment

For now this repository only have `main` branch. Every you push the code from `main` branch, Vercel will deploy.

Soon, we can try Git Flow or Trunk Based strategy.

# Stacks

- ReactJS
- NextJS
- Ant Design
- Redux
- ChartJS
- DayJS
- Vercel

## Reasoning

ReactJS & Redux for Requirements.

Vercel recommended on Requirements. So I choose NextJS because maintained by Vercel (zero-configuration for deploying), hope smooth in deployment.

Ant Design for rich components and easy to customize also make faster development.

ChartJS for good SEO :D. Popular in Github Star also can integrate with ReactJS.

DayJS for date formating. Tiny size, modular & straightforward documentation.

# TODO

- Realtime Threat Level (socket.io)
- Country Comparison Table
- Change Fetch with GraphQL Client?
- AI-Powered Threat Analysis
- Setup Branch: staging, uat, production, feature-branch
- Changelog (automation)
- Component Architecture
- API Documentation (proxy API)
- Video Walkthrough
- Technical Documentation (RFC)
- Guard API Proxy
