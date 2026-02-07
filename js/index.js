let startup = 0
let defaultTopicSelection = 1

// alert("hehestat");

// Changing whole page section
function changeSection(selection) {

    if (selection == 2) {
        for (i = 1; i <= 4; i++) {
            document.getElementById("profile-section-content-" + i).style = "display: none";
        }
        document.getElementById("profile-topic").style = "display: ''";
        document.getElementById("profile-topic-1").style = "text-decoration: underline; cursor: pointer;";
        document.getElementById("profile-topic-content-1").style = "display: ''";
        document.getElementById("profile-topic-content-1").style.animation = "fadeIn 1.5s";

    } else {

        for (i = 1; i <= 4; i++) {
            document.getElementById("profile-section-content-" + i).style = "display: none";
        }
        document.getElementById("profile-section-content-" + selection).style = "display: ''";
        document.getElementById("profile-section-content-" + selection).style.animation = "fadeIn 1.5s";
    }
}    

// Changing selected topic (Experience, Education, etc.) within Digital Resume section
function changeTopic(selection) {
    for (i = 1; i <= 4; i++) {
        document.getElementById("profile-topic-" + i).style = "text-decoration: none";
        document.getElementById("profile-topic-" + i).style = "cursor: pointer";
        document.getElementById("profile-topic-content-" + i).style = "display: none";
    }
    document.getElementById("profile-topic-" + selection).style = "text-decoration: underline; cursor: pointer;";
    document.getElementById("profile-topic-content-" + selection).style = "display: ''";
    document.getElementById("profile-topic-content-" + selection).style.animation = "fadeIn 1.5s";
}


// uhhh is this needed lol. maybe dont use hrefs that link back to itself
if (startup == 0) {
    // alert("made it");

    document.getElementById("profile-section").style = "display: ''";
    // alert("made it2");

    changeSection(1);
    // alert("made it");

}
startup = 1;