// client.js

const apiUrl = 'http://localhost:3000/emotion-color';

async function getColorForEmotion(emotion) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emotion }),
    });

    const data = await response.json();
    return data.color;
  } catch (err) {
    console.error('Error fetching color:', err);
    return '#FFFFFF'; // Default color if there's an error
  }
}

const sketch = (p) => {
  let colorToShow = '#FFFFFF';

  p.setup = function () {
    p.createCanvas(400, 400);

    const emotionInput = document.getElementById('emotion-input');
    emotionInput.addEventListener('keydown', async function (event) {
      if (event.key === 'Enter') {
        const emotion = emotionInput.value;
        const color = await getColorForEmotion(emotion);
        colorToShow = color;
      }
    });
  };

  p.draw = function () {
    p.background(p.color(colorToShow));
    p.fill(0);
    p.textSize(20);
    p.text('Emotion Color Display', 50, 50);
  };
};

new p5(sketch);
