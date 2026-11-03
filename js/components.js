
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


   
