const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANORABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANORABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

async function rollDice(){
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock(){
    let random = Math.random()
    let result

    switch(true) {
        case random < 0.33:
            result = "RETA"
            break;
       
        case random < 0.66:
            result = "CURVA";
            break;
        
        default:
            result = "CONFRONTO";
    }
    return result
}

async function logRollResult(characterName, block, diceResult, attribute){
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playerRaceEngine(character1, character2){
    for(let round = 1; round <=5; round++){
         console.log(`🏁 Rodada ${round}`);

        //sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)

        // rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // teste de habilidade
        let TotalTestSkill1 = 0;
        let TotalTestSkill2 = 0;

        if(block === "RETA") {
            TotalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            TotalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(
                character1.NOME, 
                "velocidade", 
                diceResult1, 
                character1.VELOCIDADE
            );
            await logRollResult(
                character2.NOME, 
                "velocidade", 
                diceResult2, 
                character2.VELOCIDADE
            );
        }

        if(block === "CURVA") {
            TotalTestSkill1 = diceResult1 + character1.MANORABILIDADE;
            TotalTestSkill2 = diceResult2 + character2.MANORABILIDADE;

            await logRollResult(
                character1.NOME, 
                "manobrabilidade", 
                diceResult1, 
                character1.MANORABILIDADE
            ); 
            await logRollResult(
                character2.NOME, 
                "manobrabilidade", 
                diceResult2, 
                character2.MANORABILIDADE
            );
        }

        if(block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

            await logRollResult(
                character1.NOME, 
                "poder", 
                diceResult1, 
                character1.PODER
            );
            await logRollResult(
                character2.NOME, 
                "poder", 
                diceResult2, 
                character2.PODER
            );

            if(powerResult1 > powerResult2){
                console.log(`${character1.NOME} venceu o confronto!`);
                character1.PONTOS++; // Ganha turbo (+1 ponto)
                character2.PONTOS--; // Perde bomba (-1 ponto)
            } else if (powerResult2 > powerResult1){
                console.log(`${character2.NOME} venceu o confronto!`);
                character2.PONTOS++; // Ganha turbo (+1 ponto)
                character1.PONTOS--; // Perde bomba (-1 ponto)
            }
        }

        // verificando o vencedor
        if(TotalTestSkill1 > TotalTestSkill2){
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        }else if(TotalTestSkill2 > TotalTestSkill1){
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        }

        console.log("________________________");
    }

    console.log("\n🏁 Resultado Final:\n");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

    if(character1.PONTOS > character2.PONTOS){
        console.log(`\n🏆 ${character1.NOME} venceu a corrida!`);
    } else if (character2.PONTOS > character1.PONTOS){
        console.log(`\n🏆 ${character2.NOME} venceu a corrida!`);
    } else {
        console.log("\nEmpate! Que corrida emocionante!");
    }
}
    
(async function main() {
    console.log(`🏁🏎️🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);

    await playerRaceEngine(player1, player2);
})();

