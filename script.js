function launch(platform) {
    if (platform !== 'windows') {
        alert("This advanced feature is only implemented for Windows at the moment.");
        return;
    }

    const username = document.getElementById(platform + "-username").value;
    const profilePicSrc = document.getElementById(platform + "-profile-pic").src;
    const backgroundImageUrl = document.getElementById(platform + "-bg").style.backgroundImage;

    if (!username) {
        alert("Please enter a username for Windows.");
        return;
    }

    if (profilePicSrc === '#' || profilePicSrc === window.location.href + '#') {
        alert("Please upload a profile picture for Windows.");
        return;
    }

    const newTab = window.open('about:blank', '_blank');

    if (!newTab) {
        alert('Please allow popups for this website.');
        return;
    }

    const content = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Prank Login</title>
            <style>
                body {
                    font-family: sans-serif;
                    margin: 0;
                    height: 100vh;
                    overflow: hidden; /* Prevent scrollbars */
                }

                #background-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: ${backgroundImageUrl};
                    background-size: cover;
                    background-position: center;
                    transition: background-color 0.3s ease, filter 0.3s ease;
                    z-index: 0; /* Behind everything */
                }

                #background-container.blurred {
                    background-color: rgba(0, 0, 0, 0.5); /* Darken */
                    filter: blur(5px); /* Blur the background */
                }

                #clock {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%); /* Center the clock */
                    font-size: 3em;
                    color: white;
                    transition: opacity 0.3s ease;
                    z-index: 1; /* Above the background */
                }

                #clock.hidden {
                    opacity: 0;
                }

                .content-wrapper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh; /* Ensure it takes full height */
                    width: 100%;
                }

                .prank-content {
                    text-align: center;
                    display: none; /* Initially hidden */
                    transition: opacity 0.3s ease;
                    color: white;
                    z-index: 2; /* Above everything */
                    position: relative; /* Needed for z-index to work */
                }

                .prank-content.visible {
                    display: block;
                    opacity: 1; /* Fade in */
                }

                .prank-content img {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 10px;
                }
                /* Style the fake password input */
                .fake-password-input {
                    width: 200px;
                    padding: 8px;
                    margin: 10px 0;
                    border-radius: 4px;
                    border: 1px solid #ccc;
                    /* Mimic password input appearance */
                    font-family: monospace; /* Use a monospace font to hide characters */
                    letter-spacing: 3px; /* Add spacing to further obscure characters */
                    color: #333;
                    text-align: center;
                }

                /* Style for the arrow button */
                .arrow-button {
                    display: inline-flex; /* Align items horizontally */
                    align-items: center;
                    justify-content: center;
                    width: 30px; /* Adjust size as needed */
                    height: 30px;
                    border-radius: 50%; /* Make it a circle */
                    background-color: rgba(255, 255, 255, 0.3); /* Semi-transparent white */
                    color: white;
                    border: none;
                    cursor: pointer;
                    font-size: 1.2em; /* Adjust arrow size */
                    margin-left: 5px; /* Spacing from the password input */
                    text-shadow: 0 0 5px black; /* Improve visibility against background */
                }

                .arrow-button:hover {
                    background-color: rgba(255, 255, 255, 0.5); /* Slightly darken on hover */
                }
            </style>
        </head>
        <body>
            <div id="background-container"></div>
            <div class = "content-wrapper">
                <div id="clock"></div>
                <div class="prank-content">
                    <img src="${profilePicSrc}" alt="Profile Picture">
                    <p>${username}</p>
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <input type="text" class="fake-password-input" value="••••••••" readonly onclick="this.select()">
                        <button class="arrow-button">▶</button>
                    </div>
                </div>
            </div>

            <script>
                const clock = document.getElementById('clock');
                const backgroundContainer = document.getElementById('background-container');
                const prankContent = document.querySelector('.prank-content');

                function updateClock() {
                    const now = new Date();
                    const hours = String(now.getHours()).padStart(2, '0');
                    const minutes = String(now.getMinutes()).padStart(2, '0');
                    document.getElementById('clock').textContent = hours + ':' + minutes;
                }

                // Update the clock every second
                setInterval(updateClock, 1000);

                // Initial clock update
                updateClock();

                // Show login info on click
                document.body.addEventListener('click', function() {
                    backgroundContainer.classList.add('blurred');
                    clock.classList.add('hidden');
                    prankContent.classList.add('visible');
                });
            <\/script>
        <\/body>
        <\/html>
    `;

    newTab.document.write(content);
    newTab.document.close();
}

  // Combined image upload function
  function setupImageUpload(platform, type) {
    const realFileBtn = document.getElementById(platform + "-" + type + "-file");
    const customBtn = document.querySelector('#' + platform + ' .upload-btn-wrapper:nth-of-type(' + (type === 'bg' ? 1 : 2) + ') .btn'); // Correctly select button
    let targetElement;

    if (type === 'bg') {
      targetElement = document.getElementById(platform + "-bg");
    } else {
      targetElement = document.getElementById(platform + "-profile-pic");
    }

    customBtn.addEventListener("click", function(e) {
      e.preventDefault();
      realFileBtn.click();
    });

    realFileBtn.addEventListener("change", function() {
      const file = realFileBtn.files[0];
      if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function() {
          if (type === 'bg') {
            targetElement.style.backgroundImage = "url('" + reader.result + "')";
          } else {
            targetElement.src = reader.result;
            targetElement.style.display = "block";
          }
        }, false);

        reader.readAsDataURL(file);
      }
    });
  }

  setupImageUpload("windows", "bg");
  setupImageUpload("windows", "pfp");
