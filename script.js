let current = 0;
const circles = document.querySelectorAll('.circle');
const bars = document.querySelectorAll('.bar');
const titles = document.querySelectorAll('.title');
const labels = document.querySelectorAll('.label');

function advanceProgress() {
  circles.forEach(circle => {
    if (circle.classList.contains('active')) {
      circle.classList.remove('active');
      circle.classList.add('done');
      circle.firstElementChild.innerHTML = '&#10003';
    }
  });

  bars.forEach(bar => {
    if (bar.classList.contains('active')) {
      bar.classList.remove('active');
      bar.classList.add('done');
    }
  });

  titles.forEach(title => {
    if (title.classList.contains('active')) {
      title.classList.remove('active');
      title.classList.add('done');
    }
  });

  if (current < circles.length) {
    circles[current].classList.add('active');
    titles[current].classList.add('active');
  }
  if (current < bars.length) {
    bars[current].classList.add('active');
  }
  current++;
}

if (current < circles.length) {
  setInterval(() => {
    advanceProgress();
  }, 2000);
}

function reset() {
  current = 0;
  circles.forEach(circle => circle.classList.remove('active', 'done'));
  bars.forEach(bar => bar.classList.remove('active', 'done'));
  titles.forEach(title => title.classList.remove('active', 'done'));
  labels.forEach((label, index) => (label.innerHTML = index + 1));
}

document.querySelector('.replay').addEventListener('click', reset);

function countdown(endDate) {
  let hours, minutes, seconds;
  endDate = new Date(endDate).getTime();

  function calculate() {
    let startDate = new Date().getTime();
    let timeRemaining = Number((endDate - startDate) / 1000);

    if (timeRemaining >= 0) {
      hours = parseInt(timeRemaining / 3600);
      timeRemaining = timeRemaining % 3600;
      minutes = parseInt(timeRemaining / 60);
      timeRemaining = timeRemaining % 60;
      seconds = parseInt(timeRemaining);
      document.querySelector('#hours').innerHTML = ('0' + hours).slice(-2);
      document.querySelector('#minutes').innerHTML = ('0' + minutes).slice(-2);
      document.querySelector('#seconds').innerHTML = ('0' + seconds).slice(-2);
    } else {
      document.querySelector('.countdown').innerHTML = `<h4>Your Transfer Should Have Arrived. Please Contact Us.</h4>`;
    }
  }
  setInterval(calculate, 1000);
}

(function() {
  countdown(moment().add(3, 'd'));
})();

document.querySelector('.orderDate').innerText = moment().format('DD MMM YYYY');
document.querySelector('.expectedDate').innerText = moment()
  .add(3, 'd')
  .format('DD MMM YYYY');
