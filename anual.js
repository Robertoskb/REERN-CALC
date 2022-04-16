function get_notes() {

    createtags = document.getElementById('text')
    score1 = parseFloat(document.getElementById('input1').value)
    score2 = parseFloat(document.getElementById('input2').value)
    score3 = parseFloat(document.getElementById('input3').value)
    score4 = parseFloat(document.getElementById('input4').value)
    score5 = parseFloat(document.getElementById('input5').value)

    check_notes()
}

function check_notes() {
    var arr = [score1, score2, score3, score4, score5]

    for (let pos in arr) {
        if (arr[pos] < 0 || arr[pos] > 10) {
            return InvalidParagraph()
        }

    }

    get_result()
}

function get_result() {
    const five_notes = !isNaN(score1) && !isNaN(score2) && !isNaN(score3) && !isNaN(score4) && !isNaN(score5)
    const four_notes = !isNaN(score1) && !isNaN(score2) && !isNaN(score3) && !isNaN(score4)
    const three_notes = !isNaN(score1) && !isNaN(score2) && !isNaN(score3)
    const two_notes = !isNaN(score1) && !isNaN(score2)

    result(five_notes, four_notes, three_notes, two_notes)
}

function result(five_notes, four_notes, three_notes, two_notes) {
    var md

    if (five_notes) {
        let md = fullCalc(normaCalc())

        return get_ValidParagraph(md, false, true)

    }

    if (four_notes) {
        md = normaCalc()

        return get_ValidParagraph(md, false, false)

    }

    if (three_notes) {
        md = threeScores()

        return get_ValidParagraph(md, true, false)

    }

    else if (two_notes) {
        md = twoScores()

        return get_ValidParagraph(md, true, false)

    }

    else { return InvalidParagraph() }

}

function get_ValidParagraph(md, studying, final_test) {
    sit = get_sit(md, studying, final_test)
    msg = get_msg(md, sit)
    color = get_color(sit)

    ValidParagraph(color, sit, md, msg)
}

function get_sit(md, studying, final_test) {
    const mdf = md.toFixed(1)

    sits = {
        'Aprovado': [!final_test && !studying && mdf >= 6, final_test && mdf >= 5],
        'Reprovado': [!final_test && !studying && mdf < 2.5, final_test && mdf < 5],
        'Cursando': [!final_test && studying && 2.5 < mdf < 6],
        'Prova Final': [!studying && 2.5 < mdf < 6]
    }

    for (let sit in sits) {
        if (sits[sit].includes(true)) {
            return sit
        }
    }

}

function get_msg(md, sit) {
    const sits = {
        'Aprovado': 'Parabéns, você passou de ano (～￣▽￣)～',
        'Reprovado': 'Você não passou de ano ಠ╭╮ಠ',
        'Cursando': get_studying_msg(),
        'Prova Final': `Você precisa de ${(finalNeeded(md)).toFixed(1)} na prova final`
    }

    return sits[sit]
}

function get_studying_msg() {
    var need = !isNaN(score1) && !isNaN(score2) && !isNaN(score3)
        ? `Você precisa de ${need1().toFixed(1)} no 4º Bimestre`
        : `Você precisa de ${need2().toFixed(1)} no 3º e 4º Bimestre`

    return need
}

function get_color(sit) {
    const colors = {
        'Aprovado': 'rgb(24, 155, 24)',
        'Reprovado': 'red',
        'Cursando': 'yellow',
        'Prova Final': 'rgb(218, 134, 0)'
    }

    return colors[sit]

}

function InvalidParagraph() {
    createtags.innerHTML = `
    <div class='x' onclick='getoutResult()'>x</div>
    <h1 class="invalid">Notas Inválidas</h1>
    <p class="invalid">Verifique se você preencheu os campos corretamente</p>`

}

function ValidParagraph(color, sit, md, msg) {
    createtags.innerHTML = `
     <div class='x' onclick='getoutResult()'>x</div>
     <h1  style='background-color:${color};' class='result'>Resultado: </h1>
     <h2 class='inline'>Situação: </h2>
     <p class='inline' id = 'sit'>${sit}</p>

     <p class='inline md'><strong>Média: </strong></p>
     <p class='inline' id='md'>${md.toFixed(1)}</p>
     <p>${msg}</p>`
}

const fullCalc = (md) => (md * 2 + score5) / 3
const normaCalc = () => (score1 + score2 + score3 + score4) / 4
const threeScores = () => (score1 + score2 + score3) / 4
const twoScores = () => (score1 + score2) / 4

const finalNeeded = (md) => 15 - md * 2
const need2 = () => - (score1 + score2 - 24) / 2
const need1 = () => - (score1 + score2 + score3 - 24)