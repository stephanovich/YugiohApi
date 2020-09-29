let divMain = document.querySelector("#lista");
let divRando = document.createElement("div");
let divLista = document.createElement("div");
divRando.className = "alingCards";
divLista.className = "alingCards";
random();
async function buscar(){
    console.log("caiu aquui");
    let url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?"
    let select = document.getElementById("select");
    let valor = select.options[select.selectedIndex].value;
    if(valor == "all"){
        url = url;
    } else {
        url += `&type=${valor}`;
    }
    let termo = document.getElementById("termoBusca").value;
    let urlFinal = `${url}&fname=${termo}&language=pt`;
    console.log(urlFinal)
    const response = await fetch(urlFinal);
    if(response.ok){
        const json = await response.json();
        console.log(json.data);
        divMain.innerText = "";
        divRando.innerText = "";
        divMain.appendChild(divRando);
        for(card of json.data){
            console.log(card)
            cardDetail(card);
        }
    } else {
        divRando.innerText = "";
        let erro = document.createElement("h3");
        erro.className = "centerErro";
        erro.innerText = "Não foi encontrado cartas com o valor inserido!"
        divRando.appendChild(erro);
    }

}
async function random(){
    let url = "https://db.ygoprodeck.com/api/v7/randomcard.php";
    divMain.appendChild(divRando);
    for(let i = 0; i<2; i++){
        const response = await fetch(url);
        const card = await response.json();
        console.log(card);
        cardDetail(card);
    }
}
function cardDetail(card){
    let divTitulo = document.createElement("div");
    let divAle = document.createElement("div");
    divAle.className = "divAle";
    let link = document.createElement("h2");
    link.innerText = card.name;
    let divImg = document.createElement("div");
    divImg.className = "divImg";
    let img = document.createElement("img");
    img.className = "randomImg";
    img.src = `https://ygoprodeck.com/pics/icons/${card.type}.jpg`;
    img.title = `Foto da carta ${card.name}`;
    img.alt = `Foto da carta ${card.name}`;
    divImg.appendChild(img);
    let divLink = document.createElement("div");
    divTitulo.appendChild(link);
    divTitulo.className = "divTitulo";
    divLink.appendChild(divTitulo);
    divLink.className = "divLink";
    let race = document.createElement("div");
    let pLevel = document.createElement("p");
    pLevel.className = "p";
    if(card.level != undefined){
        let formatLevel = "";
        formatLevel = "Level: ".bold();
        formatLevel += `${card.level}\n`;
        pLevel.innerHTML = formatLevel;
        race.appendChild(pLevel);
    }
    let formatRace = "";
    let formatType = "";
    let pRace = document.createElement("p");
    let pType = document.createElement("p");
    pType.className = "p";
    pRace.className = "p";
    formatRace = "Raça: ".bold();
    formatRace += `${card.race}`;
    formatType += `Tipo: `.bold();
    formatType += `${card.type}`;
    pRace.innerHTML = formatRace;
    pType.innerHTML = formatType;
    race.appendChild(pRace);
    race.appendChild(pType);
    let divDesc = document.createElement("div");
    let pDesc = document.createElement("p");
    pDesc.className = "p";
    let formartDesc = "Descrição: ".bold();
    formartDesc += `${card.desc}`
    pDesc.innerHTML = formartDesc;
    divDesc.appendChild(pDesc);
    let divAtkDef = document.createElement("div");
    let pAtkDef = document.createElement("p");
    pAtkDef.className = "p";
    if(card.atk != undefined){
        let formatAtk = "Ataque: ".bold();
        formatAtk += `${card.atk}\xa0\xa0\xa0\xa0\xa0\xa0\xa0`;
        pAtkDef.innerHTML = formatAtk
    }
    if(card.def != undefined){
        let formatDef = "Defesa: ".bold(); 
        formatDef += `${card.def}`;
        pAtkDef.innerHTML += formatDef;
    }
    let divSome = document.createElement("div");
    divSome.appendChild(race);
    divSome.appendChild(divDesc);
    divSome.appendChild(divAtkDef);
    divSome.className = "aparece";
    divLink.onclick = function(){
        showDiv(divSome);               
    }
    divAtkDef.appendChild(pAtkDef);
    divLink.appendChild(divSome);
    divAle.appendChild(divImg);
    divAle.appendChild(divLink);
    img.src = card['card_images'][0]['image_url'];
    divRando.appendChild(divAle);
}
function showDiv(div){
    if(div.className == "some"){
        div.className = "aparece";
    } else {
        div.className = "some";
    }
}