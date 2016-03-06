/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    var feedLoad0 = "";
    var feedLoad1;
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('are URLs defined', function () {
            var isFull = true;
            allFeeds.forEach(function(item) {
                if(item.url === "")
                    isFull = false;
            });
            expect(isFull).toBe(true);
        });

        /* DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('are Names defined', function () {
            var isFull = true;
            allFeeds.forEach(function(item,index,array) {
                if(item.name === "")
                    isFull = false;
            });
            expect(isFull).toBe(true);
        });
    });


    /* DONE: Write a new test suite named "The menu" */
    describe("The Menu", function() {
        var menuState, menuIcon;
         beforeAll(function () {
             menuState = $('body').hasClass('menu-hidden');
             menuIcon = $('.menu-icon-link');

         });
        /* DONE: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('Hidden on load', function () {
            expect(menuState).toBe(true); // had to check the menuState on load
                                          // before anything else had ran to
                                          // make sure it was hidden on load
        });
        /* DONE: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
         /* Used the jquery function .click() to simulate a click on the menu
                icon to see what the changed state would be and if menu-hidden
                is a class for the body then the slide bar isn't seen*/
        it('Visibility of Menu Icon', function () {
            var menu1, menu2;
            menuIcon.click();
            menu1 = $('body').hasClass('menu-hidden');
            menuIcon.click();
            menu2 = $('body').hasClass('menu-hidden');
            expect(menu1).toBe(false);
            expect(menu2).toBe(true);
        });
    });



    /* DONE: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function () {
        var success = false;
        beforeEach(function (done) {
            //Something
            loadFeed(0, function (status, entries) {
                if (status === "success" && entries.length > 0) {
                    success = true;
                    feedLoad0 = entries;
                } else {
                    success = false;
                }
                done();
            });
        });
        /* DONE: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         /* I pass in the status and entries into the callback function
                and iff the status is a success and there are entries then
                the test is passed */
        it('they loaded', function (done) {
            expect(success).toBe(true);
            done();
        });
    });
    /* DONE: Write a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function () {
        var success = false,
            entries = '';
        beforeEach(function (done) {
            //Something
            loadFeed(1, function (status, entries) {
                if(status === "success" && entries.length > 0) {
                    success = true;
                    feedLoad1 = entries;
                } else {
                    success = false;
                }
                done();
            });
        });
        /* DONE: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.*/
         /* First I need to see if a new feed will load with success,
                then I had to make sure the previous test 'New Feed Selection
                worked so feedLoad0 had to be defined and finally I had to make
                sure they were different'*/
        it('new feed loads', function (done) {
            expect(success).toBe(true);
            expect(feedLoad0).not.toBe("");
            expect(feedLoad1).not.toBe(feedLoad0);
            done();
        });
    });



}());
