// ==UserScript==
// @name         Tradução Dinâmica RMA (PT, FR, EN, ES) – Com reaplicação após DOM dinâmico
// @namespace    http://tampermonkey.net/
// @version      10.1
// @description  Traduz dinamicamente e volta a aplicar a tradução sempre que o DOM muda (ex: ao mudar de RMA). Usa estrutura como o script dos botões de copiar. 🔁🇫🇷🇬🇧🇪🇸🇵🇹
// @author       David
// @match        *://rma.enametech.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    console.log("🚀 [Tradução] Script carregado. A observar o DOM...");

    const dicionarios = {
        pt: {},
        fr: {
            "Novo": "Teste",
            "Vendas": "Teste",
            "Pesquisar": "Rechercher",
            "Problema": "Problème",
            "Diagnóstico": "Diagnostic",
            "Data de compra": "Date d'achat",
            "Fatura": "Facture",
            "Info. Cliente": "Info Client",
            "Info. Recolha": "Info Récolte",
            "Info. Entrega": "Info Livraison",
            "Referência": "Référence",
            "Descrição": "Description",
            "Ação": "Action",
            "Utilizador": "Utilisateur",
            "Detalhes": "Détails",
            "Estado": "État",
            "Comentário": "Commentaire",
            "Pedido de recolha": "Demande d'enlèvement",
            "Em Garantia Funcional": "Sous Garantie Fonctionnelle",
            "Aplicado": "Appliqué",
            "Fail/Drop": "Échec / Abandon",
            "Documentos do Cliente": "Document Client",
            "Fotos da Técnica": "Photos de la Technique",
            "Fotos do Cliente": "Photos du Client",
            "Abertura": "Ouverture",
            "Pedido": "Demande",
            "Peça alocada": "Pièce attribuée",
            "Peça fechada": "Pièce fermée",
            "Falhou": "Échec",
            "Passou": "Passé",
            "Outro": "Autre",
            "Pedido de Peça": "Demande de Pièce",
            "Obra aberta": "Travaux ouverts",
            "Alocação de Peça": "Affectation de pièce",
            "Obra fechada": "Travaux terminés",
            "Final Test": "Test final",
            "Stock Out": "Rupture de stock",
            "Cabo de alimentação": "Câble d’alimentation",
            "Carregador": "Chargeur",
            "Comando": "Télécommande",
            "Toalhete": "Lingette",
            "Transporte regular": "Transport régulier",
            "Manuais": "Manuels",
            "Problemas Conhecidos": "Problèmes connus",
            "Consumidor Final": "Consommateur final",
            "Local de Reparação:": "Lieu de réparation :",
            "Com recolha:": "Avec enlèvement :",
            "Tipo de recolha:": "Type d’enlèvement :",
            "Enviar caixa para recolher:": "Envoyer une boîte pour l’enlèvement :",
            "Pedidos de Recolha": "Demandes d’enlèvement",
            "Data": "Date",
            "Documentos da Técnica": "Documents Techniques",
            "Escolher ficheiros": "Choisir des fichiers"

        },
        en: {
            "Pesquisar": "Search",
            "Problema": "Problem",
            "Diagnóstico": "Diagnosis",
            "Data de compra": "Purchase Date",
            "Fatura": "Invoice",
            "Info. Cliente": "Customer Info",
            "Info. Recolha": "Pickup Info",
            "Info. Entrega": "Delivery Info",
            "Referência": "Reference",
            "Descrição": "Description",
            "Ação": "Action",
            "Utilizador": "User",
            "Detalhes": "Details",
            "Estado": "Status",
            "Comentário": "Comment",
            "Pedido de Peça": "Part Request",
            "Pedido de recolha": "Pickup Request",
            "Em Garantia Funcional": "Under Functional Warranty",
            "Aplicado": "Applied",
            "Fail/Drop": "Fail/Drop",
            "Documentos do Cliente": "Customer Document",
            "Fotos da Técnica": "Technical Photos",
            "Fotos do Cliente": "Customer Photos",
            "Abertura": "Opened",
            "Pedido": "Request",
            "Peça alocada": "Part Allocated",
            "Peça fechada": "Part Closed",
            "Falhou": "Failed",
            "Passou": "Passed",
            "Outro": "Other",
            "Obra aberta": "Work opened",
            "Alocação de Peça": "Part Allocation",
            "Obra fechada": "Work closed",
            "Final Test": "Final Test",
            "Stock Out": "Out of stock",
            "Cabo de alimentação": "Power cable",
            "Carregador": "Charger",
            "Comando": "Remote control",
            "Toalhete": "Wipe",
            "Transporte regular": "Regular transport",
            "Manuais": "Manuals",
            "Problemas Conhecidos": "Known Issues",
            "Consumidor Final": "End Consumer",
            "Local de Reparação:": "Repair Location:",
            "Com recolha:": "With pickup:",
            "Tipo de recolha:": "Pickup type:",
            "Enviar caixa para recolher:": "Send box for pickup:",
            "Pedidos de Recolha": "Pickup Requests",
            "Data": "Date",
            "Documentos da Técnica": "Technical Documents",
            "Escolher ficheiros": "Choose files"

        },
        es: {
            "Pesquisar": "Buscar",
            "Problema": "Problema",
            "Diagnóstico": "Diagnóstico",
            "Data de compra": "Fecha de compra",
            "Fatura": "Factura",
            "Info. Cliente": "Info Cliente",
            "Info. Recolha": "Info Recogida",
            "Info. Entrega": "Info Entrega",
            "Referência": "Referencia",
            "Descrição": "Descripción",
            "Ação": "Acción",
            "Utilizador": "Usuario",
            "Detalhes": "Detalles",
            "Estado": "Estado",
            "Comentário": "Comentario",
            "Pedido de recolha": "Solicitud de recogida",
            "Em Garantia Funcional": "En Garantía Funcional",
            "Aplicado": "Aplicado",
            "Fail/Drop": "Fallo / Anulado",
            "Documentos do Cliente": "Documento del Cliente",
            "Fotos da Técnica": "Fotos Técnicas",
            "Fotos do Cliente": "Fotos del Cliente",
            "Abertura": "Apertura",
            "Pedido": "Solicitud",
            "Peça alocada": "Pieza asignada",
            "Peça fechada": "Pieza cerrada",
            "Falhou": "Falló",
            "Passou": "Pasó",
            "Outro": "Otro",
            "Pedido de Peça": "Solicitud de Pieza",
            "Obra aberta": "Obra abierta",
            "Alocação de Peça": "Asignación de pieza",
            "Obra fechada": "Obra cerrada",
            "Final Test": "Prueba final",
            "Stock Out": "Sin stock",
            "Cabo de alimentação": "Cable de alimentación",
            "Carregador": "Cargador",
            "Comando": "Mando",
            "Toalhete": "Toallita",
            "Transporte regular": "Transporte regular",
            "Manuais": "Manuales",
            "Problemas Conhecidos": "Problemas conocidos",
            "Consumidor Final": "Consumidor final",
            "Local de Reparação:": "Lugar de reparación:",
            "Com recolha:": "Con recogida:",
            "Tipo de recolha:": "Tipo de recogida:",
            "Enviar caixa para recolher:": "Enviar caja para recoger:",
            "Pedidos de Recolha": "Solicitudes de recogida",
            "Data": "Fecha",
            "Documentos da Técnica": "Documentos Técnicos",
            "escolher ficheiros": "seleccionar archivos"

        }
    };

    let idiomaAtual = null;
    let ultimaAplicacao = 0;

    function detetarIdiomaNoTexto() {
        const img = document.querySelector("a.dropdown-toggle img.flag");
        if (!img) return "pt";

        const alt = (img.getAttribute("alt") || "").toLowerCase();
        const title = (img.getAttribute("title") || "").toLowerCase();

        if (alt.includes("fr") || title.includes("france")) return "fr";
        if (alt.includes("en") || title.includes("english")) return "en";
        if (alt.includes("es") || title.includes("españa")) return "es";
        if (alt.includes("pt") || title.includes("portugal")) return "pt";

        // Se não conseguimos identificar, usa classe como último recurso
        const classList = img.classList;
        if (classList.contains("flag-fr")) return "fr";
        if (classList.contains("flag-en")) return "en";
        if (classList.contains("flag-es")) return "es";
        if (classList.contains("flag-pt")) return "pt";

        return "pt";
    }


    function traduzir(dicionario, forcar = false) {
        const agora = Date.now();
        if (!forcar && agora - ultimaAplicacao < 300) return;
        ultimaAplicacao = agora;

        let alteracoes = 0;

        const elementos = document.querySelectorAll("body *:not(script):not(style):not(noscript)");

        // Ordena os termos do dicionário do maior para o menor
        const termosOrdenados = Object.keys(dicionario).sort((a, b) => b.length - a.length);

        elementos.forEach(el => {
            // Traduz nós de texto visíveis (sem mexer em HTML ou Angular)
            el.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length > 0) {
                    if (!node.originalText) node.originalText = node.nodeValue;

                    let novoTexto = node.originalText;
                    for (const pt of termosOrdenados) {
                        const regex = new RegExp(pt.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
                        novoTexto = novoTexto.replace(regex, dicionario[pt]);
                    }

                    if (novoTexto !== node.nodeValue) {
                        node.nodeValue = novoTexto;
                        alteracoes++;
                    }
                }
            });


            // Traduz atributos (placeholder, title, alt, value)
            ["placeholder", "title", "alt", "value"].forEach(attr => {
                const original = el.getAttribute(attr);
                if (original) {
                    if (el.dataset[`traduzidoAttrOriginal_${attr}`]) {
                        el.setAttribute(attr, el.dataset[`traduzidoAttrOriginal_${attr}`]);
                        delete el.dataset[`traduzidoAttrOriginal_${attr}`];
                    }

                    for (const pt of termosOrdenados) {
                        if (original.includes(pt)) {
                            el.dataset[`traduzidoAttrOriginal_${attr}`] = original;
                            const traduzido = original.replaceAll(pt, dicionario[pt]);
                            el.setAttribute(attr, traduzido);
                            alteracoes++;
                        }
                    }
                }
            });
        });

        if (alteracoes > 0) {
            console.log(`🔁 Reaplicada tradução (${alteracoes} elementos e atributos) para ${idiomaAtual.toUpperCase()}`);
        }
    }


    function verificarIdiomaEmMutacoes(mutations) {
        for (const mutation of mutations) {
            const texto = mutation.target?.textContent?.toLowerCase();
            const novoIdioma = detetarIdiomaNoTexto(texto || "");

            if (novoIdioma && novoIdioma !== idiomaAtual) {
                console.log(`🌐 Idioma mudou: ${idiomaAtual ?? "nenhum"} → ${novoIdioma}`);
                idiomaAtual = novoIdioma;
                traduzir(dicionarios[idiomaAtual], true);
                return;
            }
        }

        // Se o idioma já foi detetado antes, reaplicar tradução em cada mutação
        if (idiomaAtual && idiomaAtual !== "pt") {
            traduzir(dicionarios[idiomaAtual]);
        }
    }

    const observer = new MutationObserver((mutations) => {
        verificarIdiomaEmMutacoes(mutations);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
    });

    // Verificação inicial
    const loopInicial = setInterval(() => {
        const allText = document.body.innerText.toLowerCase();
        const detetado = detetarIdiomaNoTexto(allText);

        if (detetado && detetado !== idiomaAtual) {
            console.log(`🕵️ Idioma inicial detetado: ${detetado}`);
            idiomaAtual = detetado;
            traduzir(dicionarios[idiomaAtual], true);
            clearInterval(loopInicial);
        }
    }, 500);
})();
