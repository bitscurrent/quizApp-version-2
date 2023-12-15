let index = 0, incorrect = 0, correct = 0;

let option1 = document.querySelector('.option1');
let option2 = document.querySelector('.option2');
let option3 = document.querySelector('.option3');
let option4 = document.querySelector('.option4');

let nextButton = document.querySelector(".next");
let previousButton = document.querySelector(".previous");

document.addEventListener("DOMContentLoaded", function () {

let fetchData = () => {
    return new Promise((resolve, reject) => {
      fetch('https://johnmeade-webdev.github.io/chingu_quiz_api/trial.json')
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };
  
  fetchData()
    .then((questionBank) => {
        // console.log(questionBank);
   
    let buttonContainer = document.querySelector(".button-container");
    let buttons = buttonContainer.querySelectorAll('button');

    update();

    previousButton.addEventListener("click", () => {
        // console.log("Previous Clicked")
        if (index >= 1) {
            if (index == 1) {
                previousButton.style.display = "none"
                }
            index = index - 1;
        }
        else {
            previousButton.style.display = "block"
        }
            resetButtonStyles();

        if (index < questionBank.length) {
            update();
            buttons.forEach(button => {
                button.disabled = false;
            });
            resultText.textContent = "";
        }
    });
    
        nextButton.addEventListener("click", () => {
            index = index + 1;
            resetButtonStyles();
            if (index >=1){
            previousButton.style.display = "block"
            }

            if (index < questionBank.length) {
                update();
                buttons.forEach(button => {
                    button.disabled = false;
                });
                resultText.textContent = "";
                nextButton.style.display = 'none';
            }
            else {
                let score = document.querySelector(".score");
                score.style.display = "block"
                score.innerHTML = `
            <h2 style="text-align:center;"> You have completed the quiz! </h2>
            <br>
                   <h3 style="text-align:center; display:block"> Your score:  ${correct} / ${questionBank.length} </h3>
                   <br>
                   <h4 style="text-align:center;">Percentage: ${((correct / questionBank.length) * 100).toFixed(2)}%</h4>
             `
                let mainContainer = document.querySelector(".main-container")
                mainContainer.style.display = "none";
                nextButton.style.display = "none";
                previousButton.style.display = "none";
            }
        });

        function resetButtonStyles() {
            buttons.forEach(button => button.style = "");
            resultText.textContent = "";
        }

        const resultText = document.querySelector('.result')

        function update() {
            questionId.textContent = questionBank[index].question;
            option1.textContent = questionBank[index].choices.a;
            option2.textContent = questionBank[index].choices.b;
            option3.textContent = questionBank[index].choices.c;
            option4.textContent = questionBank[index].choices.d;

            let questionTag = document.querySelector('.question-tag')
            questionId.textContent = questionBank[index].question;
            questionTag.textContent = 'Question' + questionBank[index].id + "/" + questionBank.length;
        }

        buttons.forEach(function (button) {
            button.addEventListener('click', buttonClicked);

            function buttonClicked() {
                if (!button.disabled) {
                    buttons.forEach(btn => {
                        btn.disabled = true;
                    });

                    if (button.value == questionBank[index].answer) {
                        resultText.textContent = "Well Done! Correct!";
                        button.style = "background:green";
                        
                        correct++
                        nextButton.style.display = 'block';
                    } else {
                        
                        resultText.textContent = "Incorrect";
                        incorrect--
                        button.style = "background:red";
                        nextButton.style.display = 'block';
                    }
                }
            }
        });
    
});

    })
// .catch((error) => console.error(error));
    