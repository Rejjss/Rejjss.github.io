    document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.querySelector("#contact form.php-email-form");
    if (!contactForm) return;

    contactForm.innerHTML = `
        <div class="row gy-4">

            <div class="col-md-6">
              <input type="text" name="vardas" class="form-control" placeholder="Vardas" required>
            </div>

            <div class="col-md-6">
              <input type="text" name="pavarde" class="form-control" placeholder="Pavardė" required>
            </div>

            <div class="col-md-6">
              <input type="email" class="form-control" name="email" placeholder="El. paštas" required>
            </div>

            <div class="col-md-6">
              <input type="text" class="form-control" name="telefonas" placeholder="Telefono numeris" required>
            </div>

            <div class="col-md-12">
              <input type="text" class="form-control" name="adresas" placeholder="Adresas">
            </div>

            <div class="col-md-12">
              <label>1. Kaip vertinate svetainės dizainą? (1–10)</label>
              <input type="range" name="vertinimas_dizainas" min="1" max="10" class="form-range">
            </div>

            <div class="col-md-12">
              <label>2. Kaip vertinate turinio aiškumą? (1–10)</label>
              <input type="range" name="vertinimas_turinys" min="1" max="10" class="form-range">
            </div>

            <div class="col-md-12">
              <label>3. Kaip tikėtina, kad rekomenduotumėte mane kitiems? (1–10)</label>
              <input type="range" name="vertinimas_rekomendacija" min="1" max="10" class="form-range">
            </div>

            <div class="col-md-12">
              <textarea class="form-control" name="message" rows="5" placeholder="Žinutė"></textarea>
            </div>

            <div class="col-md-12 text-center">
              <button type="submit">Pateikti</button>
            </div>

        </div>
    `;

    contactForm.removeAttribute("action");
    contactForm.removeAttribute("method");


    let resultsBox = document.createElement("div");
    resultsBox.style.marginTop = "30px";
    resultsBox.style.padding = "20px";
    resultsBox.style.border = "1px solid #ddd";
    resultsBox.style.borderRadius = "10px";
    resultsBox.style.background = "#f9f9f9";
    contactForm.appendChild(resultsBox);


    let popup = document.createElement("div");
    popup.textContent = "Duomenys pateikti sėkmingai!";
    popup.style.position = "fixed";
    popup.style.top = "20px";
    popup.style.right = "20px";
    popup.style.background = "#8f1338ff";
    popup.style.color = "white";
    popup.style.padding = "16px 26px";
    popup.style.borderRadius = "10px";
    popup.style.fontSize = "18px";
    popup.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25)";
    popup.style.opacity = "0";
    popup.style.transition = "all 0.4s ease";
    popup.style.transform = "translateY(-20px)";
    popup.style.zIndex = "999999";
    document.body.appendChild(popup);

    function showSuccessPopup() {
        popup.style.opacity = "1";
        popup.style.transform = "translateY(0)";
        setTimeout(() => {
            popup.style.opacity = "0";
            popup.style.transform = "translateY(-20px)";
        }, 3000);
    }

    contactForm.addEventListener("submit", function() {
        const contactForm = document.querySelector("#contact form.php-email-form")
               || document.querySelector("#contact-form");

        const formData = {
            vardas: contactForm.querySelector("[name='vardas']").value,
            pavarde: contactForm.querySelector("[name='pavarde']").value,
            email: contactForm.querySelector("[name='email']").value,
            telefonas: contactForm.querySelector("[name='telefonas']").value,
            adresas: contactForm.querySelector("[name='adresas']").value,
            dizainas: Number(contactForm.querySelector("[name='vertinimas_dizainas']").value),
            turinys: Number(contactForm.querySelector("[name='vertinimas_turinys']").value),
            rekomendacija: Number(contactForm.querySelector("[name='vertinimas_rekomendacija']").value),
            message: contactForm.querySelector("[name='message']").value
        };

        let vidurkis = ((formData.dizainas + formData.turinys + formData.rekomendacija) / 3).toFixed(1);

        resultsBox.innerHTML = `
            <h4>Jūsų pateikti duomenys:</h4>
            <p><strong>Vardas:</strong> ${formData.vardas}</p>
            <p><strong>Pavardė:</strong> ${formData.pavarde}</p>
            <p><strong>El. paštas:</strong> ${formData.email}</p>
            <p><strong>Telefono numeris:</strong> ${formData.telefonas}</p>
            <p><strong>Adresas:</strong> ${formData.adresas}</p>
            <p><strong>Dizaino vertinimas:</strong> ${formData.dizainas}</p>
            <p><strong>Turinio aiškumas:</strong> ${formData.turinys}</p>
            <p><strong>Rekomendacija:</strong> ${formData.rekomendacija}</p>
            <p><strong>Žinutė:</strong> ${formData.message || "(nepateikta)"}</p>

            <hr>

            <p style="font-size: 18px;">
                <strong>${formData.vardas} ${formData.pavarde}:</strong> ${vidurkis}
            </p>
        `;

        showSuccessPopup();
    });

});


document.addEventListener("DOMContentLoaded", function () { 

    const form = document.querySelector("#contact form.php-email-form") 
              || document.querySelector("#contact-form");

    if (!form) return;

    function setError(input, message) {
        input.style.borderColor = "red";

        let error = input.parentElement.querySelector(".error-text");
        if (!error) {
            error = document.createElement("div");
            error.className = "error-text";
            error.style.color = "red";
            error.style.fontSize = "14px";
            error.style.marginTop = "5px";
            input.parentElement.appendChild(error);
        }
        error.textContent = message;
    }

    function clearError(input) {
        input.style.borderColor = "#ced4da";
        let error = input.parentElement.querySelector(".error-text");
        if (error) error.remove();
    }

    function validateName(input) {
        const value = input.value.trim();
        if (!value) return setError(input, "Šis laukelis privalomas");
        if (!/^[A-Za-zÀ-ž\s]+$/.test(value)) 
            return setError(input, "Leidžiamos tik raidės");
        clearError(input);
    }

    function validateEmail(input) {
        const value = input.value.trim();
        if (!value) return setError(input, "El. paštas privalomas");

        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!pattern.test(value)) 
            return setError(input, "Neteisingas el. pašto formatas");

        clearError(input);
    }

    function validateText(input) {
        const value = input.value.trim();
        if (!value) return setError(input, "Šis laukelis privalomas");
        clearError(input);
    }


    function formatLithuanianPhone(input) {
        let digits = input.value.replace(/\D/g, "");

        if (!digits.startsWith("370")) {
            if (!digits.startsWith("6") && digits.length > 0) {
                digits = "6" + digits.slice(1);
            }
            if (digits.length > 0) {
                digits = "370" + digits;
            }
        }

        digits = digits.slice(0, 11);

        let formatted = "";

        if (digits.length === 0) {
            input.value = "";
            return;
        }

        if (digits.length <= 3) {
            formatted = "+" + digits;
        } else if (digits.length <= 6) {
            formatted = "+" + digits.slice(0, 3) + " " + digits.slice(3);
        } else {
            formatted = "+" + digits.slice(0, 3) + " " + digits.slice(3, 6) + " " + digits.slice(6);
        }

        input.value = formatted;
    }

    function validatePhone(input) {
        const digits = input.value.replace(/\D/g, "");
        if (digits.length !== 11 || !digits.startsWith("3706")) {
            return setError(input, "Telefono numeris turi būti formatu +370 6xx xxxxx");
        }
        clearError(input);
    }

    const vardas = form.querySelector("[name='vardas']");
    const pavarde = form.querySelector("[name='pavarde']");
    const email = form.querySelector("[name='email']");
    const adresas = form.querySelector("[name='adresas']");
    const message = form.querySelector("[name='message']");
    const telefonas = form.querySelector("[name='telefonas']");

    if (vardas) vardas.addEventListener("input", () => validateName(vardas));
    if (pavarde) pavarde.addEventListener("input", () => validateName(pavarde));
    if (email) email.addEventListener("input", () => validateEmail(email));
    if (adresas) adresas.addEventListener("input", () => validateText(adresas));
    if (message) message.addEventListener("input", () => validateText(message));

    if (telefonas) {
        telefonas.addEventListener("input", () => formatLithuanianPhone(telefonas));
        telefonas.addEventListener("blur", () => validatePhone(telefonas));
    }

       contactForm.addEventListener("submit", function (e) {

        validateName(vardas);
        validateName(pavarde);
        validateEmail(email);
        validateText(adresas);
        validateText(message);
        validatePhone(telefonas);

        if (contactForm.querySelector(".error-text")) {
            e.preventDefault();
            alert("Formoje yra klaidų.");
            return;
        }
    });
  })

    function updateSubmitState() {
        const hasErrors = [...inputs].some(i => i.dataset.error === "true");

        if (hasErrors) {
            submitButton.disabled = true;
            submitButton.style.opacity = "0.5";
        } else {
            submitButton.disabled = false;
            submitButton.style.opacity = "1";
        }
    }
// 12_LAB


try {
  document.addEventListener("DOMContentLoaded", function () {

    const boardEl = document.getElementById("memoryBoard");
    if (!boardEl) return;

    const movesEl = document.getElementById("memoryMoves");
    const matchesEl = document.getElementById("memoryMatches");
    const messageEl = document.getElementById("memoryWinMessage");
    const startBtn = document.getElementById("memoryStartBtn");
    const resetBtn = document.getElementById("memoryResetBtn");
    const difficultyEl = document.getElementById("gameDifficulty");

    const bestEasyEl = document.getElementById("bestEasy");
    const bestHardEl = document.getElementById("bestHard");

    const timerEl = document.getElementById("memoryTimer");

    console.log("🎮 Memory Game loaded");

    const cardIcons = [
      "🍎","🍌","🍓","🍇","🍉","🍒",
      "⭐","🔥","🎧","⚽","🚗","🐱"
    ];

    const difficulties = {
      easy: { rows: 3, cols: 4, pairs: 6 },
      hard: { rows: 4, cols: 6, pairs: 12 }
    };

    let moves = 0;
    let matches = 0;
    let flipped = [];
    let lock = false;
    let totalPairs = 0;
    let timer = 0;
    let timerInterval = null;
    let currentDifficulty = "easy";

    function loadBestScores() {
      const bestEasy = localStorage.getItem("best_memory_easy") || "-";
      const bestHard = localStorage.getItem("best_memory_hard") || "-";

      bestEasyEl.textContent = bestEasy;
      bestHardEl.textContent = bestHard;
    }

    function saveBestScoreIfImproved() {
      const key = currentDifficulty === "easy"
        ? "best_memory_easy"
        : "best_memory_hard";

      const saved = localStorage.getItem(key);

      if (!saved || moves < Number(saved)) {
        localStorage.setItem(key, moves);
        loadBestScores();
      }
    }

    function startTimer() {
      timer = 0;
      timerEl.textContent = "0 s";

      timerInterval = setInterval(() => {
        timer++;
        timerEl.textContent = timer + " s";
      }, 1000);
    }

    function stopTimer() {
      clearInterval(timerInterval);
      timerInterval = null;
    }

    function createDeck(difficulty) {
      const cfg = difficulties[difficulty];
      totalPairs = cfg.pairs;

      const selected = cardIcons.slice(0, cfg.pairs);
      const deck = [...selected, ...selected];

      deck.sort(() => Math.random() - 0.5);
      return { deck, cols: cfg.cols };
    }

    function renderBoard(difficulty) {
      currentDifficulty = difficulty;

      const { deck, cols } = createDeck(difficulty);

      moves = 0;
      matches = 0;
      flipped = [];
      lock = false;

      movesEl.textContent = 0;
      matchesEl.textContent = 0;
      messageEl.textContent = "";
      timerEl.textContent = "0 s";

      stopTimer();

      boardEl.innerHTML = "";
      boardEl.style.gridTemplateColumns = `repeat(${cols}, 80px)`;

      deck.forEach(icon => {
        const card = document.createElement("div");
        card.className = "memory-card";
        card.dataset.icon = icon;

        card.innerHTML = `
          <div class="memory-card-inner">
            <div class="memory-card-front"></div>
            <div class="memory-card-back">${icon}</div>
          </div>
        `;

        card.addEventListener("click", () => flipCard(card));
        boardEl.appendChild(card);
      });
    }

    function flipCard(card) {
      if (lock) return;
      if (!timerInterval) startTimer(); 

      if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

      card.classList.add("flipped");
      flipped.push(card);

      if (flipped.length === 2) {
        moves++;
        movesEl.textContent = moves;
        checkMatch();
      }
    }

    function checkMatch() {
      lock = true;

      const [c1, c2] = flipped;
      const match = c1.dataset.icon === c2.dataset.icon;

      if (match) {
        c1.classList.add("matched");
        c2.classList.add("matched");

        matches++;
        matchesEl.textContent = matches;

        flipped = [];
        lock = false;

        if (matches === totalPairs) {
          messageEl.textContent = "🎉 Laimėjote! 🎉";
          stopTimer();
          saveBestScoreIfImproved();
        }

      } else {
        setTimeout(() => {
          c1.classList.remove("flipped");
          c2.classList.remove("flipped");
          flipped = [];
          lock = false;
        }, 800);
      }
    }

    function startGame() {
      renderBoard(difficultyEl.value);
    }

    startBtn.addEventListener("click", startGame);
    resetBtn.addEventListener("click", startGame);
    difficultyEl.addEventListener("change", startGame);

    loadBestScores();

  });
} catch (e) {
  console.warn("⚠️ Memory game failed to load:", e);
}
