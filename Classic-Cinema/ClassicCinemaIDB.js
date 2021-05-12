var ClassicCinemaIDB = (function () {
    /* A closure to demonstrate basic use of indexeddb
    * Adapted from https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
         * Nick Meek 2019
    */
    'use strict';
    /*jshint -W104*/
    //if indexeddb is not supported then no use continuing
    if (!window.indexedDB) {
        window.alert("Your browser doesn’t support a stable version of IndexedDB.");
        return;
    }
    var pub = {}; //usual public interface
    var db;
    const dbName = "ClassicCinema";

    //Some movie data to get us started
    const movieData = [
        {
            title: "Gone With the Wind (1939)",
            director: ["Victor Fleming", "George Cukor", "Sam Wood"],
            starring: ["Clark Gable", "Vivien Leigh", "Leslie Howard", "Olivia de Havilland", "Hattie McDaniel"],
            comments: "An epic historical romance and winner of 8 Academy Awards(from 13 nominations).",
            price: 13.99
        },
        {
            title: "The Jazz Singer (1927)",
            director: ["Alan Crosland"],
            starring: ["Al Jolson", "May McAvoy", "Warner Oland", "Cantor Rosenblatt"],
            comments: "The first feature length ’talkie’, The Jazz Singer is a piece of cinematic history",
            price: 13.99
        },
        {
            title: "Metropolis (1927)",
            director: ["Fritz Lang"],
            starring: ["Alfred Abel", "Brigitte Helm", "Gustav Frohlich", "Rudolf Klein - Rogge"],
            comments: "A lovingly restored version of Fritz Lang’s dystopian masterpiece, one of the great achievements of the silent era.",
            price: 19.99
        }
    ];

    const reviewData = [
        {
        user:"Nick",
        title:"Metropolis (1927)",
        review:8
    },
        {
            user:"Nick 2",
            title:"Metropolis (1927)",
            review:4
        },
        {
            user:"Nick 3",
            title:"Metropolis (1927)",
            review:10
        }]

    var request = window.indexedDB.open(dbName, 1); // Request to open a db

    //an error handler for the request
    request.onerror = function (event) {
        /*jshint -W117*/
        alert("Opening db error " + request.error);
        /*jshint +W117*/
    };

    //a success handler
    request.onsuccess = function (event) {
        /*jshint -W117*/
        alert("Database successfully created.");
        /*jshint +W117*/
    };

    //This function runs before onsuccess, if needed i.e. no db exists or
    // version number is higher than existing db
    request.onupgradeneeded = function (event) {
        db = event.target.result;

        // Create an objectStore to hold information about our movies. We’re
        // going to use "title" as our key path because it’s guaranteed to be
        // unique.
        var movieObjectStore = db.createObjectStore("movies", {keyPath: "title"});

        // Create an objectStore to hold reviews We’re
        // going to use a key generator to make our keys; it’s guaranteed to be unique.
        var reviewObjectStore = db.createObjectStore("reviews", {autoIncrement: true});

        // Create an index to search movies by title. We want to ensure that
        // no two movies have the same title, so use a unique index.
        movieObjectStore.createIndex("title", "title", {unique: true});

        // Create an index to search reviews by user. We may have duplicates
        // so we can’t use a unique index.
        reviewObjectStore.createIndex("user", "user", { unique: false });

        // Use transaction oncomplete to make sure the objectStore creation is
        // finished before adding data into it.
        movieObjectStore.transaction.oncomplete = function (event) {
            // Store values in the newly created objectStore.
            var customerObjectStoreTransaction = getObjectStore("movies", "readwrite");
            movieData.forEach(function (m) {
                customerObjectStoreTransaction.add(m);
            });
        };

        reviewObjectStore.transaction.oncomplete = function (event) {
            // Store values in the newly created objectStore.
            var reviewObjectStoreTransaction = getObjectStore("reviews", "readwrite");
            reviewData.forEach(function (m) {
                reviewObjectStoreTransaction.add(m);
            });
        };
    };

    /**
     * Displays the title, price and rating of a specified movie
     * @param {string} title The title of the movie you want to find.
     **/
    pub.getMovieInfo = function (title) {
        var store = getObjectStore("movies"); var request = store.get(title); //error handler
        request.onerror = function (e) {
            /*jshint -W117*/
            alert("getMovieInfo error " + request.error);
            /*jshint +W117*/
        };
        //success handler
        request.onsuccess = function (e) {
            /*jshint -W117*/
            alert(request.result.title + "\n" + request.result.price + "\n" + request.result.director);
            /*jshint +W117*/
        };
    };


    /**
     * Adds a review to the objectStore
     * @param {object} review The object you want added to the store.
     * The review object must take the following form:
     * user: {string}
     * title: {string}
     * review: {integer}
     */
    pub.addReview = function (review) {
        var store = getObjectStore("reviews", "readwrite");
        var request = store.add(review);
            //success handler
        request.onsuccess = function (event) {
            /*jshint -W117*/
            alert("review Added");
            /*jshint +W117*/
        };
            //error handler
        request.onerror = function (event) {
            /*jshint -W117*/
            alert("addReview error", this.error);
            /*jshint +W117*/
        };
    };


    /**
     * Utility function to start a transaction on the specified objectStore(s)
     * and return the object store.
     * @param {string} store_name
     * @param {string} mode either "readonly" or "readwrite"
     * @return objectStore
     */
    function getObjectStore(store_name, mode) {
        var tx = db.transaction(store_name, mode);
        return tx.objectStore(store_name);
    }


    /**
     * Adds a movie to the objectStore
     * @param {object} movieData The object you want added to the store.
     * The movieData object must take the following form:
     * title: {string}
     * director: [<string>]
     * starring: [<string>]
     * comments: {string}
     * price: {float}
     */
    pub.addMovie = function (movieData) { //start the transaction and get the store
        var store = getObjectStore("movies", "readwrite");
        var request = store.add(movieData);

        //success handler
        request.onsuccess = function (event) {
            /*jshint -W117*/
            alert("movie Added");
            /*jshint +W117*/
        };

        //error handler
        request.onerror = function (event) {
            /*jshint -W117*/
            alert("addMovie error", this.error);
            /*jshint +W117*/
        };
    };

    pub.displayReview = function(){
        var objectStore = getObjectStore("reviews","readonly");

        objectStore.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
            if (cursor) {
                console.log("Name for SSN " + cursor.user + " is " + cursor.value.title);
                cursor.continue();
            }
            else {
                console.log("No more entries!");
            }
        };
    }

    return pub;
}());