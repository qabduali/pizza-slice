document.getElementById('app').innerHTML = `<p>Click 👆 this button</p>`


document.getElementById('load-btn').addEventListener('click', () => {
  document.getElementById('load-btn').className = 'loading';
  document.getElementById('app').innerHTML = `<p>waiting...</p>`;

  fetch('https://gp-js-test.herokuapp.com/pizza')
    .then((response) => response.json())
    .then((data) => data.party.filter(chel => chel.eatsPizza == true))
    .then((data) => {
      document.getElementById('app').innerHTML = '';
      document.getElementById('pizza').innerHTML = '';
      document.getElementById('participants').innerHTML = '';
      document.getElementById('load-btn').className = '';
      const pizza = document.getElementById('pizza');
      pizza.style =  `
        border-radius: 50%;
        width: 200px;
        height: 200px;
        overflow: hidden;
        background-color: rgb(255, 197, 71);
        position: relative;
      `;
      const ang = 360/data.length;
      console.log(data);
      const container = document.createElement("div");
      const guests = document.createElement('ol');
      container.style.height = "100%";
      container.style.width = "100%";
      container.style.backgroundColor = "rgb(255, 197, 71);";
      container.style.position = "relative";
      for (let i = 0; i < data.length; i++) {
        const cut = document.createElement("div");
        cut.style.position = "absolute";
        cut.style.transformOrigin = "center left"
        cut.style.left = "50%";
        cut.style.top = "50%";
        cut.style.height = "1px";
        cut.style.width = "50%";
        cut.style.backgroundColor = "#111111";
        cut.style.transform = `rotate(${(ang * i)}deg)`;
        container.appendChild(cut);
        const slice = document.createElement('li');
        slice.id = data[i].name;
        const participant = document.createTextNode(data[i].name);
        slice.appendChild(participant);
        guests.appendChild(slice);
      }
      document.getElementById("pizza").appendChild(container);
      document.getElementById("participants").appendChild(guests);
    })
})

