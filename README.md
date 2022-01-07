BP Discord Bot Framework
======
##Goal
Create easy to use bot platform which allows to create a new **slash-command** in minutes of time, not caring about prior setups.

## Running
1. Clone it
2. Change directory to cloned project
3. `npm install`
4. Rename `.env.example` to `.env` and populate it with your values
5. `npm start`

## Adding new commands
1. In `src/commands` create file with your command name and create a class which should implement `CommandContract`
2. In `src/constant/inversify.ts` in `commandIdentifiers` object create identifier for Container
3. In `src/inversify.ts` bind command from step 1 to value from step 2
4. Run app
5. Enjoy !

## TODO
**Not in specific order**
* DB Service
* Repositories for models
* User remembering
* Command options support
* CLI for command and entity generation and automatic registering
* Linters
* Tests
* Cron schedules
* 🐧
