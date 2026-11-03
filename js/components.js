
document.addEventListener("DOMContentLoaded", async function () {

    /* =========================================================
       CARREGAR COMPONENTES
    ========================================================= */

    async function carregarComponente(seletor, arquivo) {

        const alvo = document.querySelector(seletor);

        if (!alvo) return;

        try {

            const resposta = await fetch(arquivo);

            if (!resposta.ok) {
                throw new Error("Não foi possível carregar " + arquivo);
            }

            alvo.innerHTML = await resposta.text();

        } catch (erro) {

            console.error(erro);

        }

    }


    /* =========================================================
       CARREGAR CABEÇALHO E RODAPÉ
    ========================================================= */

    await Promise.all([

        carregarComponente(
            "#site-header-slot",
            "components/header.html?v=6"
        ),

        carregarComponente(
            "#site-footer-slot",
            "components/footer.html?v=6"
        )

    ]);


    /* =========================================================
       MENU MOBILE
    ========================================================= */

    const menuButton =
        document.getElementById("siteMenuToggle");

    const navigation =
        document.getElementById("siteNavigation");


    if (menuButton && navigation) {

        menuButton.addEventListener(
            "click",
            function () {

                const aberto =
                    navigation.classList.toggle("open");

                menuButton.classList.toggle(
                    "is-open",
                    aberto
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    aberto ? "true" : "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    aberto
                        ? "Fechar menu"
                        : "Abrir menu"
                );

            }
        );


        /* FECHAR MENU AO CLICAR */

        navigation
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navigation.classList.remove("open");

                        menuButton.classList.remove("is-open");

                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        menuButton.setAttribute(
                            "aria-label",
                            "Abrir menu"
                        );

                    }
                );

            });


        /* FECHAR MENU AO VOLTAR PARA DESKTOP */

        window.addEventListener(
            "resize",
            function () {

                if (window.innerWidth > 820) {

                    navigation.classList.remove("open");

                    menuButton.classList.remove("is-open");

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuButton.setAttribute(
                        "aria-label",
                        "Abrir menu"
                    );

                }

            }
        );

    }


    /* =========================================================
       IDENTIFICAR PÁGINA ATUAL
    ========================================================= */

    const pagina =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase()
        || "index.html";

    const hash =
        window.location.hash.toLowerCase();


    /* =========================================================
       LIMPAR MENU ATIVO
    ========================================================= */

    document
        .querySelectorAll(".site-header-v2__nav a")
        .forEach(function (link) {

            link.classList.remove("active");

        });


    /* =========================================================
       DEFINIR ITEM ATIVO
    ========================================================= */

    let ativo = null;


    /* SOBRE */

    if (pagina === "sobre.html") {

        ativo =
            document.querySelector(
                '[data-nav="sobre"]'
            );

    }


    /* CURSOS */

    else if (

        pagina === "cursos.html" ||

        pagina === "cura-interior.html" ||

        pagina === "trono-lilith.html" ||

        pagina === "trono-mamon.html" ||

        pagina === "batalha-espiritual.html" ||

        pagina === "trono-belial.html"

    ) {

        ativo =
            document.querySelector(
                '[data-nav="cursos"]'
            );

    }


    /* CONTATO */

    else if (pagina === "contato.html") {

        ativo =
            document.querySelector(
                '[data-nav="contato"]'
            );

    }


    /* DÍZIMOS E OFERTAS */

    else if (pagina === "ofertas.html") {

        ativo =
            document.querySelector(
                '[data-nav="ofertas"]'
            );

    }


    /* LINKS DA HOME COM HASH */

    else if (hash === "#cursos") {

        ativo =
            document.querySelector(
                '[data-nav="cursos"]'
            );

    }

    else if (hash === "#contato") {

        ativo =
            document.querySelector(
                '[data-nav="contato"]'
            );

    }


    /* INÍCIO */

    else if (
        pagina !== "biblioteca.html" &&
        pagina !== "leitor-jejum.html"
    ) {

        ativo =
            document.querySelector(
                '[data-nav="inicio"]'
            );

    }


    /* =========================================================
       ATIVAR ITEM CORRETO
    ========================================================= */

    if (ativo) {

        ativo.classList.add("active");

    }

    /* =========================================================
       BOTÃO FLUTUANTE — BIBLIOTECA DIGITAL
       Independente do cabeçalho e do rodapé
    ========================================================= */

    if (!document.getElementById("bibliotecaFlutuante")) {

        const estilo = document.createElement("style");

        estilo.textContent = `
            .biblioteca-flutuante {
                position: fixed;
                right: 22px;
                bottom: 24px;
                z-index: 9999;

                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 10px;

                padding: 14px 20px;
                border: 1px solid #c6a15c;
                border-radius: 50px;

                background: #102b59;
                color: #ffffff;

                font-family: Montserrat, Arial, sans-serif;
                font-size: 12px;
                font-weight: 700;
                letter-spacing: 0.2px;
                line-height: 1.3;
                text-decoration: none;

                box-shadow:
                    0 8px 26px rgba(8, 27, 59, 0.28);

                transition:
                    transform 0.2s ease,
                    background 0.2s ease,
                    box-shadow 0.2s ease;
            }

            .biblioteca-flutuante:hover {
                background: #173a73;
                color: #ffffff;
                transform: translateY(-3px);
                box-shadow:
                    0 12px 30px rgba(8, 27, 59, 0.35);
            }

            .biblioteca-flutuante:focus-visible {
                outline: 3px solid #c6a15c;
                outline-offset: 4px;
            }

            .biblioteca-flutuante svg {
                width: 21px;
                height: 21px;
                flex-shrink: 0;
                stroke: #e3c58c;
            }

            @media (max-width: 600px) {

                .biblioteca-flutuante {
                    right: 14px;
                    bottom: 18px;
                    padding: 12px 15px;
                    gap: 8px;
                    font-size: 11px;
                }

                .biblioteca-flutuante svg {
                    width: 19px;
                    height: 19px;
                }

            }

            @media (prefers-reduced-motion: reduce) {

                .biblioteca-flutuante {
                    transition: none;
                }

            }
        `;

        document.head.appendChild(estilo);


        const botao = document.createElement("a");

        botao.id = "bibliotecaFlutuante";
        botao.className = "biblioteca-flutuante";
        botao.href = "biblioteca.html";

        botao.setAttribute(
            "aria-label",
            "Acessar Biblioteca Digital de Seminários"
        );

        botao.innerHTML = `
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <path d="M12 7v14"/>
                <path d="M3 18V5.6a2 2 0 0 1 2-2h2.5
                         c1.8 0 3.4.6 4.5 1.7
                         1.1-1.1 2.7-1.7 4.5-1.7H19
                         a2 2 0 0 1 2 2V18
                         h-4.5c-1.8 0-3.4.6-4.5 1.7
                         -1.1-1.1-2.7-1.7-4.5-1.7H3Z"/>
            </svg>
            <span>Biblioteca Digital</span>
        `;

        document.body.appendChild(botao);

    }

});


   
