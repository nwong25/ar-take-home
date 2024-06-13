This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To  run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

To run test
```bash
npm run test #single test run
# or
npm run test:watch # continual test runs as updates occur
```
To run linter
```bash
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Tech Stack And Libraries
 - NextJS
 - React
 - Typescript
 - Jest
 - React Testing Library
 - MUI
 - Date-fns

I chose this tech stack as it is the technology I am most familiar with that would fit the requirements 
for this task and the time frame for this project. If this were a project with a longer lead time, 
I would have taken the opportunity to explore other frameworks like Remix and Gatsby. MUI was also selected 
for speed since I knew how long it would take to set up in a new project, and their components are already 
built with accessibility in mind. If there was more time, I would have explored Mantine and Chakra UI as 
other options. date-fns was chosen for manipulating dates because it's a small lightweight library, and 
I didn't need something big for the required task. I had considered trying to implement with SWR or RSC but 
the continual re-fetching of SWR didn't make sense for this task and I am still new to RSC so I was worried 
I wouldn't be able to complete the task in time.

## Improvements or Expansion
 - Pagination currently send a request to server everytime - try to consolidate the requests either in advance 
or after the user has paginated to every page so the back button is not another request
 - When you click on a row it leads to a page about the repo 
 - Allow you to login and then do search because there are more filters available for the search
 - Add more test cases and incorporate Playwright or Cypress.io for UI testing



