// let startup = 0;
// let defaultTopicSelection = 1
// alert("hehestat");

// https://gsap.com/community/forums/topic/17320-background-parallax-effect-on-mouse-move/
$("html").mousemove(function(e) { // how far the parallax will track the mouse (if 'html', track all over the page)
     // Default is -30
    parallaxIt(e, "table", -40); // affect table elements in -> '#profile-section' in -> 'html'
});

function parallaxIt(e, target, movement) {

    var $this = $("#profile-section"); // apply parallex based on mouse position to this
    var relX = e.pageX - $this.offset().left;
    var relY = e.pageY - $this.offset().top;

    TweenMax.to(target, 1, {
        x: (relX - $this.width() / 2) / $this.width() * movement,
        y: (relY - $this.height() / 2) / $this.height() * movement
    });
}

function fadeInHeader() {
    // if (startup == 1) {
        // document.getElementById("header").style = "display: '';";
        // document.getElementById("header").style.animationFillMode = "forwards";
        document.getElementById("header").style.animation = "fadeInHeader 0.5s";
        // alert("hehe")

        // document.getElementById("header").style = "opacity: 1;";
    // }
}

function fadeOutHeader() {
    // if (startup == 1) {
        // document.getElementById("header").style.animationFillMode = "forwards";
        document.getElementById("header").style.animation = "fadeOutHeader 0.5s";
        // document.getElementById("header").style = "opacity: 0.1;";
    // }
}

// Changing whole page section
function changeSection(selection) {

    if (selection == 3) { // If Digital Resume section
        for (i = 1; i <= 5; i++) {
            document.getElementById("profile-section-content-" + i).style = "display: none";
        }
        for (j = 1; j <= 4; j++) {
            document.getElementById("profile-topic-" + j).style = "text-decoration: '';";
            document.getElementById("profile-topic-content-" + j).style = "display: none";
        }

        document.getElementById("profile-topic").style = "display: ''"; // fix
        document.getElementById("profile-topic-1").style = "text-decoration: underline; text-decoration-color: #7cb2db; text-underline-offset: 6px;";
        document.getElementById("profile-topic-content-1").style = "display: ''";
        document.getElementById("profile-topic-content-1").style.animation = "fadeIn 1s";
        // document.getElementById("profile-topic-content-1").style.animation = "fadeOut 10s";

        // document.getElementById("profile-section-content-2-badge").style = "display: ''";
    } else if (selection == 4) { // if Projects section (all this just for the damn fading animation bruhh)
        document.getElementById("project-scroll-arrow").style.animation = "fadeInDelay 1.5s ease, fadeIn 3s ease 1.5s, fadeOutHeader 1s ease 4s" // first animation, time, type, second animation, time, type, delay
        for (i = 1; i <= 5; i++) {
            document.getElementById("profile-section-content-" + i).style = "display: none";
            // alert("hehe")
        }
        for (j = 1; j <= 4; j++) {
            document.getElementById("profile-topic-content-" + j).style = "display: none";
        }
        document.getElementById("profile-topic").style = "display: none";
        document.getElementById("profile-section-content-" + selection).style = "display: ''";
        document.getElementById("profile-section-content-" + selection).style.animation = "fadeIn 1s";
        // alert("what")
        // code to bring back the damn badges
    } else {
        for (i = 1; i <= 5; i++) {
            document.getElementById("profile-section-content-" + i).style = "display: none";
            // alert("hehe")
        }
        for (j = 1; j <= 4; j++) {
            document.getElementById("profile-topic-content-" + j).style = "display: none";
        }
        document.getElementById("profile-topic").style = "display: none";
        document.getElementById("profile-section-content-" + selection).style = "display: ''";
        document.getElementById("profile-section-content-" + selection).style.animation = "fadeIn 1s";
        // alert("what")
        // code to bring back the damn badges

    }
}    

// Changing selected topic (Experience, Education, etc.) within Digital Resume section
function changeTopic(selection) {
    for (i = 1; i <= 4; i++) {
        document.getElementById("profile-topic-" + i).style = "text-decoration: none";
        document.getElementById("profile-topic-" + i).style = "cursor: pointer";
        document.getElementById("profile-topic-content-" + i).style = "display: none";
    }
    document.getElementById("profile-topic-" + selection).style = "text-decoration: underline; text-decoration-color: #7cb2db; text-underline-offset: 6px;";
    document.getElementById("profile-topic-content-" + selection).style = "display: ''";
    document.getElementById("profile-topic-content-" + selection).style.animation = "fadeIn 1s";
}

// uhhh is this needed lol. maybe dont use hrefs that link back to itself
    // alert("made it");

    // document.getElementById("profile-section").style = "display: ''";
    // alert("made it2");

    // changeSection(1);
    // alert("made it");

// if (startup == 0) {

    //first startup slower fade in
    // for (i = 1; i <= 5; i++) {
    //     document.getElementById("profile-section-content-"+i).style = "display: none";
    // }
    document.getElementById("profile-section-content-1").style = "display: ''";
    document.getElementById("profile-section-content-1").style.animation = "fadeInDelay 0.1s ease, fadeIn 2.5s ease 0.1s";
    
    document.getElementById("leaves-bg").style.animation = "fadeInDelay 1.5s ease, fadeInBg 6s ease 1.5s"; // default: 20s
    document.getElementById("profile-info-td-title-fn").style.animation = "fadeInColourDelay 2s ease, fadeInColour 6s ease 2s";
    
    document.getElementById("header").style.animation = "fadeInDelay 3.5s ease, fadeIn 2s ease 3.5s, fadeOutHeader 1s ease 5.5s" // first animation, time, type, second animation, time, type, delay
    // document.getElementById("header").style.animation = "fadeIn 21s, fadeOut 6s ease 21s"; // default: 21s
    // document.getElementById("header").style.animation = "fadeInHeader 1s ease, fadeOutHeader 1s ease 1s"; // default: 21s *this is for testing a new feature*
    // document.getElementById("header").style.animationFillMode = "forwards";
    // document.getElementById("leaves-bg").style.animation = "fadeInBg 18s"; // default: 20s
    startup = 1;
    // alert("what")
// }
