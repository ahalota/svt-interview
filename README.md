# svt-interview

prompt: https://github.com/SVT-Robotics/recruiting-takehome-services

## Prereqs:
- node.js: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-installer-to-install-node-js-and-npm

## Running and Testing API:
1. Clone this repo (or download)
2. Run `npm run start`
- You may have to follow the command line prompts to install additional libraries
    - Not sure I properly added them all to save-dev
3. Send a POST request with the method of your choice. 
- (This project was set up in VS Code and run using ThunderClient extension)
- Url: http://localhost:5000/api/robots/closest
- Query Format: `{"loadId" : string, "x": number, "y": number}`
    
## What's next?
1. Implement tests for app.ts
2. Set specific package versions for node modules
3. Set up logging
4. Gracefully handle invalid inputs
5. Handle fail-over if first robotList API endpoint fails. 
    - Gracefully handle both endpoints failing.
