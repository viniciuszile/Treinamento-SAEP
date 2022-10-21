import "../../Estilo_Global/style.css"
import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function Sala1() {

    const [sala, SetSala] = useState([])
    const [capacidade, SetCapacidade] = useState()
    const [faturamento, SetFaturamento] = useState(0)
    const [horario, SetHorario] = useState(0)

    const [programacao, SetProgramacao] = useState("")
    const [duracao, SetDuracao] = useState("")
    const [teste, setTeste] = useState("")

    const [ingressodisp, SetIngressodips] = useState()
    const [ingressosvend, SetIngressosvend] = useState()

    const [desativar, SetDesativar] = useState(false)
    const [cor, SetCor] = useState("")
    const [cortexto, SetCortexto] = useState("")
    const [id, SetId] = useState()

    const [desativar2,setDesativar2] = useState(false)


    useEffect(() => {
        axios.get("http://localhost:3006/")
            .then((response) => response.data)
            .then((response) => {
                console.log(response[8])
                SetSala(response[8]["NUMERO_SALA"])
                SetCapacidade(response[8]["CAPACIDADE"])
                SetHorario(response[8]["HORARIO"])
                SetFaturamento(response[8]["FATURAMENTO"])
                SetCor(response[8]["COR"])
                SetId(response[8]["IDSALAS"])
                

            })
        axios.get("http://localhost:3006/Filmes")
            .then((response) => response.data)
            .then((response) => {
                console.log(response[8])
                SetProgramacao(response[8]["FILME"])
                SetDuracao(response[8]["DURACAO"])
                setTeste(response[8]["SINOPSE"])


            })
        axios.get("http://localhost:3006/Ingresso")
            .then((response) => response.data)
            .then((response) => {
                console.log(response[8])
                SetIngressodips(response[8]["INGRESSOSDISP"])
                SetIngressosvend(response[8]["INGRESSOSVEND"])
                
            })
    }, [])

    


    function comprarIngressos(){
        if(ingressodisp === 0){
            SetDesativar(true)
            window.location.reload();
        }

        if(ingressodisp >= 1){
            axios.put("http://localhost:3006/Atulizar",{
                id:id
            }).then((res) => {
                console.log(res.data)
            })
            window.location.reload();
       }
        
    }

    function Sinopse () {
        let infos = document.getElementById("infos-sala")
        var textArea = document.createElement("textarea");
        textArea.className = "text"
        textArea.textContent = teste
        textArea.setAttribute('disabled', true);
        infos.appendChild(textArea)
        console.log(teste)
        setDesativar2(true)
    }

    return (

        <div>

            <div className="header-sala">
                <h1>Cine-Zile</h1>
            </div>

            <div className="container-sala"  >

                <div className="infos-sala" id="infos-sala" style={{ backgroundColor: cor }}>

                    <h1 style={{ color: cortexto }} className="texto_nome-sala">{sala}</h1>


                    <p style={{ color: cortexto }}>Programação : {programacao}</p>
                    <p style={{ color: cortexto }}>Duração Do Filme : {duracao}</p>
                    <p style={{ color: cortexto }}>Horario Da Sessão : {horario}</p>
                    <p style={{ color: cortexto }}>Capacidade : 100</p>
                    <p style={{ color: cortexto }}>Ingressos Disponiveis : {ingressodisp}</p>
                    <p style={{ color: cortexto }}>Ingressos vendidos : {ingressosvend}</p>
                    <button disabled={desativar} onClick={comprarIngressos} className="botao-sala">Comprar Ingresso</button>
                    <button onClick={Sinopse} className="botao-sala" disabled={desativar2}>Sinopse</button>
                    <p style={{ color: cortexto }}>faturamento Total : {faturamento} R$ </p>
                </div>
            </div>
        </div>
    )
}
