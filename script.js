```javascript
// ============================================
// AI-BASED MENTAL STRESS DETECTION
// Text + Speech
// Educational Demo
// ============================================


// Stress-related words

const stressWordsList = [

    "stress",
    "stressed",
    "stressful",
    "worried",
    "worry",
    "worrying",
    "anxious",
    "anxiety",
    "nervous",
    "panic",
    "pressure",
    "pressured",
    "overwhelmed",
    "tired",
    "exhausted",
    "sleep",
    "sleepless",
    "insomnia",
    "problem",
    "problems",
    "difficult",
    "difficulty",
    "fear",
    "afraid",
    "scared",
    "frustrated",
    "frustration",
    "angry",
    "upset",
    "sad",
    "lonely",
    "burden",
    "failure",
    "fail",
    "deadline",
    "exam",
    "exams",
    "workload",
    "confused",
    "confusion"

];


// Positive / calm words

const positiveWordsList = [

    "happy",
    "calm",
    "relaxed",
    "relax",
    "peaceful",
    "comfortable",
    "good",
    "great",
    "excellent",
    "positive",
    "hopeful",
    "confident",
    "enjoy",
    "enjoyed",
    "fun",
    "smile",
    "safe",
    "healthy",
    "better",
    "fine",
    "okay",
    "wonderful"

];


// ============================================
// TEXT ANALYSIS
// ============================================

function analyzeText() {

    let text =
        document
        .getElementById("textInput")
        .value
        .toLowerCase()
        .trim();


    if (text === "") {

        alert(
            "Please enter some text."
        );

        return;
    }


    analyzeContent(text);
}


// ============================================
// ANALYZE CONTENT
// ============================================

function analyzeContent(text) {

    let words =
        text.split(/\s+/);


    let stressCount = 0;

    let positiveCount = 0;


    words.forEach(
        function(word) {

            // Remove punctuation

            word =
                word.replace(
                    /[.,!?;:"()]/g,
                    ""
                );


            // Stress words

            if (
                stressWordsList.includes(word)
            ) {

                stressCount++;

            }


            // Positive words

            if (
                positiveWordsList.includes(word)
            ) {

                positiveCount++;

            }

        }
    );


    let totalWords =
        words.length;


    /*
        This is a simple educational
        keyword-based indicator.

        It is NOT a medical assessment.
    */

    let score = 0;


    if (totalWords > 0) {

        score =
            (stressCount / totalWords)
            * 100;

    }


    // Positive language reduces
    // the demonstration score slightly

    score =
        score - (positiveCount * 2);


    // Keep score between 0 and 100

    score =
        Math.max(
            0,
            Math.min(
                100,
                Math.round(score * 3)
            )
        );


    showStressResult(
        score,
        stressCount,
        positiveCount,
        totalWords
    );

}


// ============================================
// SHOW RESULT
// ============================================

function showStressResult(
    score,
    stressCount,
    positiveCount,
    totalWords
) {

    let icon =
        document.getElementById(
            "stressIcon"
        );


    let result =
        document.getElementById(
            "stressResult"
        );


    let message =
        document.getElementById(
            "stressMessage"
        );


    // LOW

    if (score < 30) {

        icon.innerHTML = "😊";

        result.innerHTML =
            "Low Stress Indicator";

        message.innerHTML =
            "The text contains relatively few stress-related language patterns.";

    }


    // MODERATE

    else if (score < 60) {

        icon.innerHTML = "😐";

        result.innerHTML =
            "Moderate Stress Indicator";

        message.innerHTML =
            "The text contains some stress-related language patterns. Consider taking time to relax and reflect.";

    }


    // HIGH

    else {

        icon.innerHTML = "😟";

        result.innerHTML =
            "Higher Stress Indicator";

        message.innerHTML =
            "The text contains several stress-related language patterns. This result is only an educational indicator and is not a diagnosis.";

    }


    // Update score

    document.getElementById(
        "stressScore"
    ).innerHTML =
        score + "%";


    document.getElementById(
        "stressBar"
    ).style.width =
        score + "%";


    // Update counts

    document.getElementById(
        "stressWords"
    ).innerHTML =
        stressCount;


    document.getElementById(
        "positiveWords"
    ).innerHTML =
        positiveCount;


    document.getElementById(
        "totalWords"
    ).innerHTML =
        totalWords;

}


// ============================================
// SPEECH RECOGNITION
// ============================================

function startSpeech() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    // Check browser

    if (!SpeechRecognition) {

        alert(
            "Speech recognition is not supported in this browser. Please use Google Chrome."
        );

        return;
    }


    let recognition =
        new SpeechRecognition();


    recognition.lang =
        "en-US";


    recognition.interimResults =
        false;


    recognition.continuous =
        false;


    let status =
        document.getElementById(
            "speechStatus"
        );


    let speechText =
        document.getElementById(
            "speechText"
        );


    status.innerHTML =
        "🎤 Listening... Please speak";


    recognition.start();


    // Speech result

    recognition.onresult =
        function(event) {

            let speech =
                event
                .results[0][0]
                .transcript;


            speechText.innerHTML =
                "You said: " + speech;


            // Put speech into textarea

            document.getElementById(
                "textInput"
            ).value =
                speech;


            // Analyze speech

            analyzeContent(speech);


            status.innerHTML =
                "✅ Speech analysis completed.";

        };


    // Error

    recognition.onerror =
        function(event) {

            status.innerHTML =
                "❌ Could not recognize speech.";

            console.log(
                event.error
            );

        };


    // End

    recognition.onend =
        function() {

            if (
                status.innerHTML.includes(
                    "Listening"
                )
            ) {

                status.innerHTML =
                    "Speech recognition stopped.";

            }

        };

}


// ============================================
// SAMPLE TEXT
// ============================================

function useExample(text) {

    document.getElementById(
        "textInput"
    ).value =
        text;


    analyzeText();

}


// ============================================
// CLEAR
// ============================================

function clearAll() {

    document.getElementById(
        "textInput"
    ).value =
        "";


    document.getElementById(
        "speechText"
    ).innerHTML =
        "";


    document.getElementById(
        "speechStatus"
    ).innerHTML =
        "Click the button and speak about how you feel.";


    document.getElementById(
        "stressIcon"
    ).innerHTML =
        "😊";


    document.getElementById(
        "stressResult"
    ).innerHTML =
        "Result will appear here";


    document.getElementById(
        "stressMessage"
    ).innerHTML =
        "Enter text or use speech analysis.";


    document.getElementById(
        "stressScore"
    ).innerHTML =
        "0%";


    document.getElementById(
        "stressBar"
    ).style.width =
        "0%";


    document.getElementById(
        "stressWords"
    ).innerHTML =
        "0";


    document.getElementById(
        "positiveWords"
    ).innerHTML =
        "0";


    document.getElementById(
        "totalWords"
    ).innerHTML =
        "0";

}
```
