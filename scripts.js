  let soundEffect = new Audio('path/to/your/sound-effect.mp3'); // Replace with your sound effect

const topics = [
  {
    title: "1976 Tripoli Agreement",
    content: "<p>The first major peace agreement with the Moro National Liberation Front, providing autonomy for 13 provinces.</p>"
  },
  {
    title: "1996 Final Peace Agreement",
    content: "<p>Created the Autonomous Region in Muslim Mindanao (ARMM) and reintegrated MNLF forces into the national fold.</p>"
  },
  {
    title: "2012 Framework Agreement",
    content: "<p>Set the groundwork for the establishment of the Bangsamoro Autonomous Region (BARMM).</p>"
  },
  {
    title: "2014 Comprehensive Agreement",
    content: "<p>The finalization of the peace roadmap with the MILF, solidifying the future of BARMM governance.</p>"
  }
];

const quizQuestions = [
  {
    question: "Which agreement involved 13 provinces?",
    options: ["Tripoli Agreement", "Final Peace Agreement", "Framework Agreement"],
    answer: 0
  },
  {
    question: "When was the Final Peace Agreement signed?",
    options: ["1976", "1996", "2014"],
    answer: 1
  },
  {
    question: "What region was created after the 2012 agreement?",
    options: ["ARMM", "BARMM", "NCR"],
    answer: 1
  }
];

let currentTopic = 0;
let currentQuiz = 0;

window.onload = () => {
  setTimeout(() => {
    document.getElementById('frontPage').style.opacity = '1';
    soundEffect.play();
    textToSpeech("Welcome to the Reading in Philippine History. Let us begin our journey through the Peace Treaties!");
  }, 500);

  setTimeout(() => {
    document.querySelectorAll('.curtain').forEach(c => c.classList.add('open'));
    createSparkles();
    setTimeout(() => {
      document.getElementById('mainFrame').style.opacity = '1';
      document.getElementById('wizard').style.opacity = '1';
      document.getElementById('yourPhoto').style.opacity = '1';
      document.getElementById('speech').classList.add('visible');
    }, 2000);
  }, 1000);
};

function startJourney() {
  document.getElementById('frontPage').style.display = 'none';
  document.getElementById('sparkles').style.display = 'none';
  showTopic(currentTopic);
}

function showTopic(index) {
  const panel = document.getElementById('contentPanel');
  const quiz = document.getElementById('quizSection');
  const title = document.getElementById('topicTitle');
  const content = document.getElementById('topicContent');

  if (index >= topics.length) {
    panel.style.display = 'none';
    showQuiz();
  } else {
    panel.style.display = 'block';
    quiz.style.display = 'none';
    title.textContent = topics[index].title;
    content.innerHTML = topics[index].content;
    textToSpeech(`${topics[index].title}. ${stripHTML(topics[index].content)}`);

    document.getElementById('prevBtn').style.display = index === 0 ? 'none' : 'inline-block';
    document.getElementById('nextBtn').style.display = 'inline-block';
  }
}

function changeTopic(step) {
  currentTopic += step;
  showTopic(currentTopic);
}

function showQuiz() {
  const quiz = document.getElementById('quizSection');
  quiz.style.display = 'block';
  loadQuiz(currentQuiz);
}

function loadQuiz(index) {
  const question = quizQuestions[index];
  document.getElementById('quizQuestion').textContent = question.question;

  const options = document.getElementById('quizOptions');
  options.innerHTML = '';
  question.options.forEach((option, i) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = () => checkAnswer(i, question.answer);
    options.appendChild(button);
  });
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    alert('Correct!');
  } else {
    alert('Try again!');
  }

  nextQuiz();
}

function nextQuiz() {
  currentQuiz++;
  if (currentQuiz < quizQuestions.length) {
    loadQuiz(currentQuiz);
  } else {
    alert('Quiz Complete!');
    // Show something else, maybe go back to the beginning
  }
}

function createSparkles() {
  const sparkles = document.getElementById('sparkles');
  setInterval(() => {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = `${Math.random() * window.innerWidth}px`;
    sparkle.style.top = `${Math.random() * window.innerHeight}px`;
    sparkles.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 3000);
  }, 300);
}

function textToSpeech(text) {
  if (window.speechSynthesis) {
    const msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
  }
}

function stripHTML(str) {
  const doc = new DOMParser().parseFromString(str, 'text/html');
  return doc.body.textContent || "";
}
