function Req(){
    fetch("https://httpbin.org/html")
        .then(resp => {
            if(resp.status != 200){
                throw new Error("Problemas no sevidor")
            }
            return resp.text();
        })
        .then(text => {
            let d = new DOMParser();
            let doc = d.parseFromString(text,"text/html");
            console.log(doc)
            extrairElemento(doc)
        })
        .catch(err => {
            document.querySelector("#res").innerHTML = err.message;
        })
}

function extrairElemento(doc){
    let div = document.querySelector("#res");
    let conteudo = doc.querySelectorAll("h1, p")
    conteudo.forEach(el => {
        let p = document.createElement("p");
        p.textContent = el.textContent;
        div.appendChild(p);
    });
}

function main(){
    document.querySelector("#btn")
    .addEventListener("click", () => { 
        Req();
        document.getElementById("res").style.display = "block";
        window.scrollTo({ top: document.getElementById("res").offsetTop - 20, behavior: 'smooth' });
    });
}

window.onload = main

  