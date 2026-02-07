let defaultTopicSelection = 1

// alert("hehe");

function changeTopic(selection) {
    for (i = 1; i <= 4; i++) {
        document.getElementById("profile-topic-" + i).style = "text-decoration: none";
        document.getElementById("profile-topic-" + i).style = "cursor: pointer";
        document.getElementById("profile-topic-content-" + i).style = "display: none";
    }
    document.getElementById("profile-topic-" + selection).style = "text-decoration: underline; cursor: pointer;";
    document.getElementById("profile-topic-content-" + selection).style = "display: ''";
    // document.getElementById("profile-topic-content-" + selection).style.animation = "spin2 100s linear infinite";
    document.getElementById("profile-topic-content-" + selection).style.animation = "fadeIn 1.5s";
}

changeTopic(1);