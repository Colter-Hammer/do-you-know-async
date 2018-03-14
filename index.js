var fs = require('fs');

function readFileGetWord(callback) {

    // When the function is first declared, it runs this console.log() though I don't completely understand why
    //it's running up here when the function is being assigned to a variable.
    console.log(3);
    
    fs.readFile('data.json', 'utf8', function (err, fileString) {

        // It'll check this once the readFile is done running, but before doing the callback.
        console.log(13);
        if (err) {
            callback(err);
            // if this returned a value where would it go?
            return
        }
        var data = JSON.parse(fileString);
        //this is weird for a callback to return a value, just think about it
        var words = callback(null, data[0]);
        console.log("Value returned from callback inside readFileGetWord:", words);

        //
        console.log(16);

        //where does this string go?
        return "more words";
    });

    // While the async function is running above, the function will continue running, which is why this is next.
    console.log(4);

    //it is weird for the "node-pattern of handling async problems" to return something (don't do this) 
    //but I want you to think about this to fully understand async flow of execution
    //and to understand the difference between an async function and a callback
    return "return";
}

function addNumbers(a, b, callback) {

    // first thing that happens when calling the function
    console.log(6);

    var notANumber = callback(null, a + b);
    console.log("Value returned from callback in addNumbers:", notANumber);

    // The callback is called, so that function is run, and after this one finished since there is additional information. 
    console.log(8);
    //it is weird for the "node-pattern of handling async problems" to return something (don't do this) 
    //but I want you to think about this to fully understand async flow of execution
    //and to understand the difference between an async function and a callback
    return "dog";
}


function start() {
    var text, number;

    // 2- second log from first function before anything else is done
    console.log(2)

    // if the return was used, text = 'return';
    // Why is it calling/running readFileGetWord when it's being assigned to a variable?
    text = readFileGetWord(function (err, word) {
        
        
        console.log(14);

        if (err) {
            console.log(err);
            // if this returned a value where would it go?
            return;
        }

        console.log("Word from file:", word);

        // I know the callback has been called because of the console.log("word.....")
        // Because of that, I know that this will be right after that.  
        console.log(15);

        //this return is also weird, just want you to think about it
        return "this is weird";
    })

    // readFileGetWord starts running its async function, and moves on.
    console.log(5);
    number = addNumbers(2, 3, function (err, sum) {
        if (err) {
            console.log(err);
            //if this returned a value where would it go?
            return;
        }
        console.log(7);
        console.log("Sum:", sum);
        //this return is also weird, just want you to think about it
        return "not a number";
    });

    console.log(9);
    console.log("Value returned from addNumbers:", number);
    console.log(10);
    console.log("Value returned from readFileGetWord:", text);
    console.log(0);
}

// first log called before any functions are started
console.log(1);
start();
console.log(0);
