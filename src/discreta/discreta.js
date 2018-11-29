/**
 * Este arquivo é responsavel pelas funções de Matematica Discreta relativas a lógica do programa.
 * As formulas foram extraidas do livro "Introdução à Analise Combinatória", SANTOS, J. P. O. et al  quarta edição
 * 
 * AUTOR: João Paulo Motta Oliveira Silva
 */

var f = [];
function fatorial (n) {
  if (n == 0 || n == 1)
    return 1;
  if (f[n] > 0)
    return f[n];
  return f[n] = fatorial(n-1) * n;
}

function combinacao(n, p) {
    return fatorial(n)/(fatorial(p) * fatorial( n - p ))
}

/** Implementando segundo sesão 3.4 */
function permutacaoRepeticao(n, rVet=[]) {
    if(rVet.length === 0) {
        return 0
    }
    if(rVet.reduce((memo, r) => memo+r) !== n) {
        throw new Error('O somatório de rVet deve ser = n')
    }
    let denominador = 1
    for(let r of rVet) {
        denominador *= fatorial(r)
    }
    let resultado = fatorial(n)/denominador
    return resultado
}

/**
 * Calcula a quantidade de distintos anagramas em um texto com as seguintes restrições
 * "As permutações devem ser tais que os espaços não ocorrem subseqüentes (i.e., seguidos) 
 * um de outro, e nem nas extremidades do anagrama."
 * 
 * Explicação:
 * O algoritmo foi elaborado baseando-se no principio da inclusão e exclusão.
 * Temos os conjuntos
 * total :=  total de anagramas possiveis, sem restrições
 * a1 := anagramas sem espaços repetidos
 * a2 := anagramas sem espaços no inicio do texto
 * a3 := anagramas sem espaços no fim do texto
 * s := quantidade de espaços no texto
 * 
 * A resposta para o problema pode ser encontrada atraves de
 * |total| - |a1 U a2 U a3|
 * => |total| - |a1| - |a2| - |a3| + |a1 ∩ a2| + |a1 ∩ a3| + |a2 ∩ a3| - |a1 ∩ a2 ∩ a3|
 *  
 * sendo:
 *  n := numero de caracteres no texto
 *  ri := quantidade do caractere i no texto, com i pertencendo a  {A, B, ..., Z} U {0, 1, 2, ..., 9}
 * PR := permutacaoRepeticao(n, [r1, r2 ..., rn])
 * |total| = PR(n, r1, ..., rn, s)
 * |a1| = PR((n - s) + 1, r1, ..., rn, 1 ) se s >= 2
 * |a2| = |a3| = PR((n-1), r1, ..., rn, s-1) se s >= 1
 * |a1 ∩ a2| = |a1 ∩ a3| = Pr( (n-1) - (s-1) + 1, r1, ..., rn, 1), se s >= 2 
 * ou
 * |a1 ∩ a2| = |a1 ∩ a3| = Pr( (n-1) - (s-1), r1, ..., rn, 0), se s = 1
 * |a1 ∩ a2 ∩ a3| = Pr((n-2) - (s-2) + 1, r1, ..., rn, 1) se se >= 3
 * |a1 ∩ a2 ∩ a3| = Pr((n-2), r1, ..., rn, 1) se se = 2 
 */
function anagrama(texto) {
    let quantidade = {' ': 0}
    //Calcula quantidade de simbolos no texto
    for(let simbolo of texto) {
        if(!quantidade[simbolo]) {
            quantidade[simbolo] = 1
        } else {
            quantidade[simbolo] += 1
        }
    }
    
    //Calcula total de permutações possiveis
    let n = texto.length
    let nTotal = permutacaoRepeticao(n, Object.values(quantidade))
    let s = quantidade[' ']
    
    if(s === 0) {
        //Se não houver espaços no texto, retorne nTotal
        return {total: nTotal, quantidade}
    } else if(s === 1) {
        //se s = 1 então devemos calcular |total| - |a2 U a3| já que não existira repetição
        //pelo principio inclusao e exclusao isso é 
        // |total| - |a2| - |a3| + |a2 ∩ a3|
        // e |a2 ∩ a3| = 0 pois não existem permutações com 1 espaço onde ele esteja no inicio E fim
        // do texto
        let a2 = permutacaoRepeticao(n-1, Object.values( {...quantidade, ' ': s-1} ))
        let a3 = a2
        return {total: nTotal - a2 - a3 + 0, quantidade}
    } else if(s >= 2) {
        let a1 = permutacaoRepeticao((n - s) + 1, Object.values({...quantidade, ' ': 1}))
        let a2 = permutacaoRepeticao(n-1, Object.values( {...quantidade, ' ': s-1} ))
        let a3 = a2
        let a1Ea2 = permutacaoRepeticao((n - 1) - (s-1) + 1, Object.values({...quantidade, ' ': 1}) )
        let a1Ea3 = a1Ea2
        let a2Ea3 = permutacaoRepeticao(n-2, Object.values({...quantidade, ' ': s-2}))
        let a1Ea2Ea3
        if(s === 2) {
            a1Ea2Ea3 = permutacaoRepeticao(n-2, Object.values({...quantidade, ' ': 0}))
        } else {
            a1Ea2Ea3 = permutacaoRepeticao((n-2) - (s-2) + 1, Object.values({...quantidade, ' ': 1}))
        }
        return {total: nTotal - a1 - a2 - a3 + a1Ea2 + a1Ea3 + a2Ea3 - a1Ea2Ea3, quantidade}
    }
}

export {fatorial, combinacao, permutacaoRepeticao, anagrama}