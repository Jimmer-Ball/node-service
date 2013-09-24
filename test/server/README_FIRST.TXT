To perform server side tests
----------------------------
1) To test the server side means having jasmine-node installed and setup via npm
   as a global node.js library, so with the -g argument.  Go look at your Application Data
   under C:\Documents and Settings\Jimbo\Application Data\npm (for example)
2) Run the library-server in the background, either command line or from
   the runner in IntelliJ, using "node library-service.js"
3) Kick off a cmd shell
4) Navigate to the project root, so where library-service.js lives.
5) Type the following at the prompt:

    jasmine-node test/server/jasmine/spec --forceexit

   This will run all the specs in the spec directory and exit when all tests are run.