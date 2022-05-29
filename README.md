## Available Scripts

To Run This Project, clone repo and run - 'npm run start'

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

Technical Discussion:

- Responsiveness:
  I've included a Responsive navbar with anchor links to corresponding api data for ease of use on various screen sizes. And also used bootstrap card and card-groups for translate the api responses to a easy to read format, the card groups are also responsive - moving cards to a new line based on screen size.
- I used a useEffect to recieve data from the organization API, and based off that data - I used a customHook useFetch to get the responses from the nested API links
- I implemented a check to see if the API rate limit was reached, if so I would render that error instead of the rest of the page
- Errors appear in red when data cannot be recieved or if url does not return data- in the case of issues and hooks
- for members and public_members I had to remove the `{/members}` at the end of the api urls
- for development purposes i copied the data from all relevent api responses and saved them in data directory and imported that data, so i would not run into the data limit issue
- if the organization api URL needed to be changed, i created a constant at the top of the API.js file which can be changed to any url
- Styles folder contains scss files which are compiled to scss
- can run `npm run scss` which watches for changes in scss files
