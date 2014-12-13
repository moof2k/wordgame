// ls | perl -pi -e 's/^(.*)\.jpg/"$1",/g'

words = [
         "acorn",
         "apple",
         "backpack",
         "ball",
         "barn",
         "basket",
         "basketball",
         "bear",
         "bed",
         "bee",
         "black",
         "blue",
         "boat",
         "book",
         "brown",
         "bus",
         "cake",
         "california",
         "camera",
         "candy",
         "car",
         "cat",
         "chair",
         "cloud",
         "cow",
         "dog",
         "doll",
         "donkey",
         "duck",
         "elephant",
         "extinguisher",
         "fire",
         "firefighter",
         "fish",
         "four",
         "fox",
         "giraffe",
         "globe",
         "goat",
         "green",
         "hat",
         "horse",
         "hose",
         "house",
         "hydrant",
         "ladder",
         "leaf",
         "leaves",
         "markers",
         "monkey",
         "moose",
         "one",
         "orange",
         "orchard",
         "oregon",
         "panda",
         "people",
         "pie",
         "pig",
         "pink",
         "plane",
         "pumpkin",
         "purple",
         "rain",
         "rake",
         "red",
         "road",
         "rollercoaster",
         "room",
         "ruler",
         "saw",
         "scarecrow",
         "school",
         "seed",
         "shell",
         "snow",
         "soccerball",
         "stars",
         "sun",
         "taxi",
         "teacher",
         "three",
         "train",
         "tree",
         "truck",
         "two",
         "white",
         "yellow"
];

function speak(str) {
    
    var msg = new SpeechSynthesisUtterance(str);
    
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(msg);
}


function GameCntl($scope, $timeout) {
    $scope.clue = "_ar";
    $scope.word = "car";
    $scope.letter = "c";
    $scope.index = 0;
    $scope.right_indicator = false;
    $scope.wrong_indicator = false;
    $scope.number_right = 0;
    $scope.timeout = 0;
    
    $scope.next = function() {
        
        $scope.timeout = 0;
        $scope.word = words[Math.floor(Math.random()*words.length)];
        $scope.index = Math.floor(Math.random()*$scope.word.length);
        $scope.letter = $scope.word[$scope.index];
        
        $scope.resetclue();
    };
    
    $scope.resetclue = function() {
        $scope.timeout = 0;
        $scope.right_indicator = false;
        $scope.wrong_indicator = false;
        
        $scope.clue = $scope.word.substr(0, $scope.index) + '_'
        + $scope.word.substr($scope.index + 1);
        
        speak($scope.word);
    };
    
    $scope.keyup = function(e) {
        if($scope.right_indicator) {
            return;
        }
        
        c = String.fromCharCode(e.keyCode);
        console.log(c);
        
        if(c == $scope.letter.toUpperCase()) {
            $scope.correct();
        } else {
            $scope.incorrect(c);
        }
    };
    
    $scope.correct = function() {
        
        $scope.number_right += 1;
        
        $scope.right_indicator = true;
        $scope.wrong_indicator = false;
        
        $scope.clue = $scope.word.substr(0, $scope.index) + $scope.letter
        + $scope.word.substr($scope.index + 1);
        
        if($scope.timeout != 0) {
            $timeout.cancel($scope.timeout);
        }
        $scope.timeout = $timeout($scope.next, 2000);
        
        $('#jpId').jPlayer("play");
    };
    
    $scope.incorrect = function(c) {
        $scope.right_indicator = false;
        $scope.wrong_indicator = true;
        
        $scope.clue = $scope.word.substr(0, $scope.index) + c.toLowerCase()
        + $scope.word.substr($scope.index + 1);
        
        if($scope.timeout != 0) {
            $timeout.cancel($scope.timeout);
        }
        $scope.timeout = $timeout($scope.resetclue, 2000);
        
        speak($scope.clue + "?");
    };
    
    $scope.next();
}