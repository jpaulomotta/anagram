import {fatorial, combinacao, permutacaoRepeticao, anagrama} from './discreta'

test('fatorial', () => {
    expect(fatorial(1)).toEqual(1)
    expect(fatorial(2)).toEqual(2)
    expect(fatorial(3)).toEqual(6)
    expect(fatorial(10)).toEqual(3628800)
})

test('combinacao', () => {
    //Capitulo 2, sesão 5
    expect(combinacao(5, 3)).toEqual(10)
    expect(combinacao(5, 5)).toEqual(1)
})


test('permutação com repetição', () => {
    //Capitulo 3, Sesão 4
    expect(permutacaoRepeticao(7, [3, 2, 2])).toEqual(210)
})

test('anamgrama', () => {
    //Capitulo 3, Sesão 4
    expect(anagrama('aaabbcc').total).toEqual(210)

    expect(anagrama('aabbccc ').total).toEqual(1260)

    expect(anagrama('FRASES COM 20 LETRAS').total).toEqual(6046686277632000)
    expect(anagrama('FRASES COM X').total).toEqual(99792000)
})