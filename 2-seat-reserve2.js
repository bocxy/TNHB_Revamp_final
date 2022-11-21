var reserve = {
    // (A) INIT
    init : () => {
      // (A1) GET layout2 WRAPPER
      let layout2 = document.getElementById("layout2");

      // (A2) GENERATE SEATS
      for (let i=65; i<=68; i++) { for (let j=1; j<=4; j++) {
        let seat = document.createElement("div");
        seat.innerHTML = String.fromCharCode(i) + j;
        seat.className = "seat";
        seat.onclick = () => { reserve.toggle(seat); };
        layout2.appendChild(seat);
      }}

      // (A3) FOR DEMO ONLY - RANDOM TAKEN SEATS
      let all = document.querySelectorAll("#layout2 .seat"),
          len = all.length - 1, rnd = [];
      while (rnd.length != 3) {
        let r = Math.floor(Math.random() * len);
        if (!rnd.includes(r)) { rnd.push(r); }
      }
      for (let i of rnd) {
        all[i].classList.add("taken");
        all[i].onclick = "";
      }
    },

    // (B) CHOOSE THIS SEAT
    toggle : (seat) => {
      seat.classList.toggle("selected");
    },

    // (C) SAVE RESERVATION
    save : () => {
      // (C1) GET SELECTED SEATS
      let selected = document.querySelectorAll("#layout2 .selected");

      // (C2) ERROR!
      if (selected.length == 0) { alert("No seats selected."); }

      // (C3) SELECTED SEATS
      else {
        // (C3-1) GET SELECTED SEAT NUMBERS
        let seats = [];
        for (let s of selected) { seats.push(s.innerHTML); }

        // (C3-2) DO SOMETHING WITH IT...
        let data = new FormData();
        data.append("seats", JSON.stringify(seats));
        data.append("name", "JON DOE");
        data.append("email", "JON@DOE.COM");
        fetch("4-dummy.php", {
          method: "POST",
          body : data
        })
        .then(res => res.text())
        .then((txt) => { console.log(txt); });
      }
    }
  };

  window.addEventListener("DOMContentLoaded", reserve.init);
