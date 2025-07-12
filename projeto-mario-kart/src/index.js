// Objeto dos personagens com atributos iniciais
const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 10,
};
const player2 = {
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 10,
};

// Simula um dado de 1 a 6
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// Chance de ganhar turbo extra
async function Turbo(personagem) {
    let random = Math.floor(Math.random() * 1000) + 1;

    if (random % 2 === 0) {
        console.log(`${personagem.NOME} ganhou o confronto e ativou o Turbo! (+1 ponto) 🚀`);
        personagem.PONTOS++;
    } else {
        console.log(`${personagem.NOME} não conseguiu ativar o Turbo 😢`);
    }
}

// Sorteia entre CASCO e BOMBA
async function cascoOuBomba() {
    const random = Math.floor(Math.random() * 10) + 1;

    if (random > 5) {
        return "CASCO";
    } else {
        return "BOMBA";
    }
}

// Sorteia o tipo de bloco: RETA, CURVA ou CONFRONTO
async function getRadomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random > 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }
    return result;
}

// Exibe o resultado da rolagem do dado e o cálculo com o atributo
async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName.NOME} 🎲 rolou um dado de ${block} 
        ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

// Verifica quem venceu no bloco e adiciona ponto
async function verificarVencedor(totalTestSkill1, totalTestSkill2, character1, character2) {
    if (totalTestSkill1 > totalTestSkill2) {
        console.log(`${character1.NOME} marcou um ponto`);
        character1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
        console.log(`${character2.NOME} marcou um ponto`);
        character2.PONTOS++;
    } else {
        console.log(`${character1.NOME} e ${character2.NOME} tem a mesma pontuação. Empate 🤝`);
    }
}

// Trata o confronto direto entre personagens
async function confronto(characterName, charactername2) {
    let escolhaArma = await cascoOuBomba();

    if (charactername2.PONTOS > 0 && escolhaArma === "CASCO") {
        console.log(`${characterName.NOME} venceu o confronto! ${charactername2.NOME} perdeu 1 ponto com um CASCO 🐢 (ataque leve)`);
        charactername2.PONTOS--;
        await Turbo(characterName);
    } else if (charactername2.PONTOS > 0 && escolhaArma === "BOMBA") {
        console.log(`${characterName.NOME} venceu o confronto! ${charactername2.NOME} perdeu 2 pontos com uma BOMBA 💣 (ataque forte)`);
        charactername2.PONTOS -= 2;
        await Turbo(characterName);
    } else {
        console.log(`${characterName.NOME} venceu o confronto, mas ${charactername2.NOME} já está com 0 pontos e não pode perder mais 🛡️`);
        await Turbo(characterName);
    }
}


// Lógica principal da corrida: 11 rodadas com blocos aleatórios
async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 11; round++) {
        console.log(`🏁 Round ${round}`);

        let block = await getRadomBlock();
        console.log(`Bloco: ${block}`);

        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2, "velocidade", diceResult2, character2.VELOCIDADE);

            await verificarVencedor(totalTestSkill1, totalTestSkill2, character1, character2);
        }

        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(character1, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);

            await verificarVencedor(totalTestSkill1, totalTestSkill2, character1, character2);
        }

        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            await logRollResult(character1, "poder", diceResult1, character1.PODER);
            await logRollResult(character2, "poder", diceResult2, character2.PODER);

            if (powerResult1 > powerResult2) {
                await confronto(character1, character2);
            } else if (powerResult2 > powerResult1) {
                await confronto(character2, character1);
            } else {
                console.log("Confronto empatado! Nenhum ponto foi perdido 🤝");
            }
        }

        console.log("---------------------------------------------------------");
    }
}

// Exibe o vencedor final da corrida
async function declareWinner(character1, character2) {
    console.log("Resultado Final");
    console.log(`${character1.NOME}: ${character1.PONTOS} pontos(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} pontos(s)`);

    if (character1.PONTOS > character2.PONTOS) {
        console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
    } else {
        console.log("A corrida terminou em empate");
    }
}

// Inicia a corrida
(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando ...\n`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();
