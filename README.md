# svt-interview

prompt: https://github.com/SVT-Robotics/recruiting-takehome-services

## Running and testing API:
1. Clone this repo
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
