// ==========================================
// STUDENT PORTAL - MAIN JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // PAGE PROTECTION
    // ==========================================

    const protectedPages = [
        "dashboard.html",
        "student.html",
        "profile.html",
        "settings.html",
        "charts.html"
    ];

    const currentPage =
        window.location.pathname.split("/").pop();

    const isLoggedIn =
        localStorage.getItem("isLoggedIn") === "true";


    // ==========================================
    // PROTECT PAGES
    // ==========================================

    if (
        protectedPages.includes(currentPage) &&
        !isLoggedIn
    ) {
        window.location.replace("login.html");
        return;
    }


    // ==========================================
    // LOGIN
    // ==========================================

    const loginButton =
        document.getElementById("loginButton");

    if (loginButton) {

        loginButton.addEventListener("click", function () {

            const usernameInput =
                document.getElementById("username");

            const passwordInput =
                document.getElementById("password");

            const message =
                document.getElementById("message");

            const remember =
                document.getElementById("remember");

            const username =
                usernameInput.value.trim();

            const password =
                passwordInput.value.trim();


            // Clear previous message
            message.textContent = "";


            // ==================================
            // EMPTY FIELD VALIDATION
            // ==================================

            if (username === "" || password === "") {

                message.textContent =
                    "Please enter username and password.";

                return;
            }


            // ==================================
            // VALID DEMO CREDENTIALS
            // ==================================

            if (
                username === "admin" &&
                password === "admin123"
            ) {

                // Save login session
                localStorage.setItem(
                    "isLoggedIn",
                    "true"
                );

                localStorage.setItem(
                    "username",
                    username
                );


                // ==================================
                // REMEMBER ME
                // ==================================

                if (remember && remember.checked) {

                    localStorage.setItem(
                        "rememberMe",
                        "true"
                    );

                    localStorage.setItem(
                        "savedUsername",
                        username
                    );

                } else {

                    localStorage.removeItem(
                        "rememberMe"
                    );

                    localStorage.removeItem(
                        "savedUsername"
                    );
                }


                // ==================================
                // REDIRECT TO DASHBOARD
                // ==================================

                window.location.href =
                    "dashboard.html";

            } else {

                message.textContent =
                    "Invalid username or password.";
            }

        });
    }


    // ==========================================
    // PASSWORD SHOW / HIDE
    // ==========================================

    const togglePassword =
        document.getElementById("togglePassword");

    const passwordField =
        document.getElementById("password");

    if (togglePassword && passwordField) {

        togglePassword.addEventListener(
            "click",
            function () {

                if (
                    passwordField.type === "password"
                ) {

                    passwordField.type = "text";

                    togglePassword.innerHTML =
                        '<i class="bi bi-eye-slash"></i>';

                } else {

                    passwordField.type = "password";

                    togglePassword.innerHTML =
                        '<i class="bi bi-eye"></i>';
                }
            }
        );
    }


    // ==========================================
    // REMEMBER ME - RESTORE USERNAME
    // ==========================================

    const remember =
        document.getElementById("remember");

    const usernameInput =
        document.getElementById("username");

    if (
        remember &&
        usernameInput &&
        localStorage.getItem("rememberMe") === "true"
    ) {

        remember.checked = true;

        const savedUsername =
            localStorage.getItem("savedUsername");

        if (savedUsername) {

            usernameInput.value =
                savedUsername;
        }
    }


    // ==========================================
    // LOGOUT
    // ==========================================

    const logoutButtons =
        document.querySelectorAll(
            'a[href="login.html"], #logoutBtn'
        );

    logoutButtons.forEach(function (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                // Clear login session
                localStorage.removeItem(
                    "isLoggedIn"
                );

                localStorage.removeItem(
                    "username"
                );


                // Redirect to login
                window.location.replace(
                    "login.html"
                );
            }
        );
    });


    // ==========================================
    // DISPLAY LOGGED-IN USERNAME
    // ==========================================

    const loggedUsername =
        localStorage.getItem("username");

    const usernameElements =
        document.querySelectorAll(
            "#loggedUsername, .logged-username"
        );

    usernameElements.forEach(function (element) {

        if (loggedUsername) {

            element.textContent =
                loggedUsername;
        }
    });


    // ==========================================
    // DARK MODE
    // ==========================================

    const darkModeButtons =
        document.querySelectorAll(
            "#darkModeBtn, #darkModeToggle"
        );

    darkModeButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                document.body.classList.toggle(
                    "dark-mode"
                );

                const darkModeEnabled =
                    document.body.classList.contains(
                        "dark-mode"
                    );

                localStorage.setItem(
                    "darkMode",
                    darkModeEnabled
                        ? "true"
                        : "false"
                );
            }
        );
    });


    // ==========================================
    // RESTORE DARK MODE
    // ==========================================

    if (
        localStorage.getItem("darkMode") ===
        "true"
    ) {

        document.body.classList.add(
            "dark-mode"
        );
    }

});


// ==========================================
// BACK BUTTON / BFCache PROTECTION
// ==========================================

window.addEventListener(
    "pageshow",
    function () {

        const protectedPages = [
            "dashboard.html",
            "student.html",
            "profile.html",
            "settings.html",
            "charts.html"
        ];

        const currentPage =
            window.location.pathname
                .split("/")
                .pop();

        const isLoggedIn =
            localStorage.getItem("isLoggedIn") === "true";


        if (
            protectedPages.includes(currentPage) &&
            !isLoggedIn
        ) {

            window.location.replace(
                "login.html"
            );
        }
    }
);
