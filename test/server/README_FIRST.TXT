To perform server side tests
----------------------------
1) To test the server side means having jasmine-node installed and setup via npm
   as a global node.js library, so with the -g argument.  Go look at
2) Run the library-server in the background, either command line or from
   the runner in IntelliJ
3) Kick off a cmd shell
4) Navigate to the project root
5) Type the following at the prompt:

    jasmine-node test/server/jasmine/spec --forceexit

Note: This will run all the specs in the spec directory and exit when all tests are run.