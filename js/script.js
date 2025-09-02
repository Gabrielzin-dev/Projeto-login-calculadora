document.addEventListener("DOMContentLoaded", () => {
    // --- ANIMAÇÃO DO CONTAINER DE LOGIN ---
    const container = document.querySelector("#container");
    if (container) {
        container.style.opacity = "0";
        container.style.transform = "translateY(-50px)";
        setTimeout(() => {
            container.style.transition = "all 0.8s ease";
            container.style.opacity = "1";
            container.style.transform = "translateY(0)";
        }, 300);
    }

    // --- LOGIN ---
    const btnLogin = document.getElementById("btnLogin");
    const inputNome = document.getElementById("Nome");
    const inputSenha = document.getElementById("Senha");

    if (btnLogin && inputNome && inputSenha) {
        btnLogin.addEventListener("click", (e) => {
            e.preventDefault();
            if(inputNome.value.trim() === "" || inputSenha.value.trim() === "") {
                alert("Por favor, preencha todos os campos antes de enviar!");
                return;
            }

            // animação de clique
            btnLogin.style.transform = "scale(0.9)";
            btnLogin.style.transition = "transform 0.2s ease";
            setTimeout(() => {
                btnLogin.style.transform = "scale(1)";
            }, 200);

            // redireciona para a calculadora
            window.location.href = "calculadora.html";
        });
    }

    // --- EFEITO NOS INPUTS ---
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        input.addEventListener("focus", () => {
            input.style.borderBottom = "2px solid #ff5026";
            input.style.transition = "border 0.3s ease";
        });
        input.addEventListener("blur", () => {
            input.style.borderBottom = "1px solid silver";
        });
    });

    // --- EFEITO HOVER PARA TODOS OS BOTÕES ---
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach(button => {
        button.addEventListener("mouseenter", () => {
            button.style.transform = "translateY(-5px)";
            button.style.transition = "transform 0.2s ease";
        });
        button.addEventListener("mouseleave", () => {
            button.style.transform = "translateY(0)";
        });
    });

    // --- EFEITO HOVER PARA BOTÕES SOCIAIS ---
    const socialBtns = document.querySelectorAll(".social img");
    socialBtns.forEach(img => {
        img.addEventListener("mouseenter", () => {
            img.style.transform = "translateY(-5px)";
            img.style.transition = "transform 0.2s ease";
        });
        img.addEventListener("mouseleave", () => {
            img.style.transform = "translateY(0)";
        });
    });

    // --- CALCULADORA ---
    const display = document.getElementById("display");
    if (display) {
        const buttons = document.querySelectorAll(".btn");
        let currentInput = "";
        let lastResult = null;

        // Clique nos botões
        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const value = btn.textContent;
                const action = btn.dataset.action;

                // limpar
                if (action === "clear") {
                    currentInput = "";
                    display.textContent = "0";
                    return;
                }

                // apagar último
                if (action === "delete") {
                    currentInput = currentInput.slice(0, -1);
                    display.textContent = currentInput || "0";
                    return;
                }

                // calcular resultado
                if (action === "=") {
                    try {
                        lastResult = eval(currentInput);
                        display.textContent = lastResult;
                        currentInput = lastResult.toString();
                    } catch {
                        display.textContent = "Erro";
                        currentInput = "";
                    }
                    return;
                }

                // adicionar operadores ou números
                if (action) {
                    currentInput += action;
                } else {
                    currentInput += value;
                }

                display.textContent = currentInput;
            });
        });

        // --- Digitação pelo teclado ---
        document.addEventListener("keydown", (e) => {
            if (!isNaN(e.key) || e.key === ".") {
                currentInput += e.key;
                display.textContent = currentInput;
            } else if (["+", "-", "*", "/"].includes(e.key)) {
                currentInput += e.key;
                display.textContent = currentInput;
            } else if (e.key === "Enter") {
                try {
                    lastResult = eval(currentInput);
                    display.textContent = lastResult;
                    currentInput = lastResult.toString();
                } catch {
                    display.textContent = "Erro";
                    currentInput = "";
                }
            } else if (e.key === "Backspace") {
                currentInput = currentInput.slice(0, -1);
                display.textContent = currentInput || "0";
            } else if (e.key === "Escape") {
                currentInput = "";
                display.textContent = "0";
            }
        });
    }
});
