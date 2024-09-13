class RecintosZoo {
    constructor() {
        this.recintos = [
            { id: 1, capacidade: 10, ocupacaoAtual: 5 },
            { id: 2, capacidade: 5, ocupacaoAtual: 2 },
            { id: 3, capacidade: 7, ocupacaoAtual: 5 },
            { id: 4, capacidade: 8, ocupacaoAtual: 3 }
        ];
        this.animaisValidos = ['MACACO', 'CROCODILO'];
    }

    analisaRecintos(animal, quantidade) {
        const resultado = {
            erro: null,
            recintosViaveis: null  // Inicializamos como null para garantir que seja falsy quando necessário
        };

        // Validação do animal
        if (!this.animaisValidos.includes(animal)) {
            resultado.erro = 'Animal inválido';
            return resultado;
        }

        // Validação da quantidade
        if (quantidade <= 0) {
            resultado.erro = 'Quantidade inválida';
            return resultado;
        }

        // Ordenar os recintos pelo espaço livre e, em caso de empate, pelo menor ID
        const recintosDisponiveis = this.recintos
            .map(recinto => ({
                ...recinto,
                espacoLivre: recinto.capacidade - recinto.ocupacaoAtual
            }))
            .filter(recinto => recinto.espacoLivre > 0)  // Só considera recintos com espaço disponível
            .sort((a, b) => b.espacoLivre - a.espacoLivre || a.id - b.id);  // Prioriza espaço livre e, em caso de empate, menor ID

        let quantidadeNecessaria = quantidade;
        const recintosViaveis = [];

        for (const recinto of recintosDisponiveis) {
            if (quantidadeNecessaria <= 0) break;

            const espacoUtilizavel = Math.min(quantidadeNecessaria, recinto.espacoLivre);
            recintosViaveis.push(`Recinto ${recinto.id} (espaço livre: ${recinto.espacoLivre} total: ${recinto.capacidade})`);
            quantidadeNecessaria -= espacoUtilizavel;
        }

        // Se ainda houver quantidade necessária após tentar alocar todos os recintos, retornar erro
        if (quantidadeNecessaria > 0) {
            resultado.erro = 'Não há recinto viável';
        } else {
            resultado.recintosViaveis = recintosViaveis;
        }

        return resultado;
    }
}

export { RecintosZoo as RecintosZoo };
