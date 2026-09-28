(() => {
    const container = document.getElementById("signin-container");

    if (!container) {
        console.error("No se encontró el contenedor #signin-container.");
        return;
    }

    function showAuthView(view) {
        const loginForm = container.querySelector(".form-login");
        const registerForm = container.querySelector(".form-register");

        // Si el componente aún no llegó, no intentamos alternar nada.
        if (!loginForm || !registerForm) {
            console.warn(
                "Los formularios todavía no están disponibles en el DOM."
            );
            return;
        }

        const showLogin = view === "login";

        loginForm.classList.toggle("is-active", showLogin);
        registerForm.classList.toggle("is-active", !showLogin);

        loginForm.setAttribute("aria-hidden", String(!showLogin));
        registerForm.setAttribute("aria-hidden", String(showLogin));
    }

    // Escucha clics aunque signin.html se haya insertado después.
    document.addEventListener("click", (event) => {
        const switchLink = event.target.closest("[data-auth-view]");

        if (!switchLink || !container.contains(switchLink)) {
            return;
        }

        const view = switchLink.dataset.authView;

        if (view !== "login" && view !== "register") {
            console.error("Vista de autenticación no reconocida:", view);
            return;
        }

        event.preventDefault();
        showAuthView(view);
    });

    // components.js emite este evento cuando ya insertó signin.html.
    document.addEventListener("componentesCargados", () => {
        showAuthView("login");
    });

    // También cubre el caso en que el componente ya estaba cargado.
    if (
        container.querySelector(".form-login") &&
        container.querySelector(".form-register")
    ) {
        showAuthView("login");
    }
})();