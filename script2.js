
// 1. Получаем корневой элемент
const app = document.getElementById('app')

const inputStart = document.getElementById('input-start');
const inputStartButton = document.getElementById('input-start-button');
const startForm = document.getElementById('start-form');

inputStartButton.onclick = function(e) {
    app.innerHTML = ''
    app.style.display = 'flex'
    startForm.remove()
    const cellNum = inputStart.value
    if (cellNum < 2 || cellNum > 10) {
        cellNum = Math.round(Math.random() * 8) + 2
        alert(`Нормальный? Написано с 2 до 10. Играй теперь ${cellNum}x${cellNum}`)
    }

    
    let current = 'cross'
    const score = {
        cross: 0,
        nought: 0
    }
    const turnCount = {
        cross: 0,
        nought: 0
    }
    
    // Общий счетчик ходов
    let turnCountGeneralCount = cellNum * cellNum
    let turnCountGeneralCountSmall = Math.floor(turnCountGeneralCount / 2)
    let turnCountGeneralCountLarge = Math.floor(turnCountGeneralCount / 2) + 1
    
    
    const turnCountLeft = {
        cross: current == 'cross' ? turnCountGeneralCountLarge : turnCountGeneralCountSmall,
        nought: current == 'nought' ? turnCountGeneralCountLarge : turnCountGeneralCountSmall
    }
    
    const turnCountGeneralText = document.createElement("span")
    turnCountGeneralText.classList.add('turn-count-general-left', current)
    turnCountGeneralText.innerText = `Осталось ходов: ${turnCountLeft[current]}`
    
    
    
    const scoreText = document.createElement("span")
    scoreText.classList.add('score-text')
    scoreText.innerText = `Крестики ${score.cross} - Нолики ${score.nought}`
    
    const turnCountBlock = document.createElement("div")
    turnCountBlock.classList.add('turn-count')
    const turnCountText = document.createElement("p")
    turnCountText.innerHTML = 'Счетчик ходов'
    const turnCountTable = document.createElement("div")
    turnCountTable.classList.add('turn-count-table')
    const turnCountCross = document.createElement("div")
    const turnCountNought = document.createElement("div")
    turnCountCross.innerHTML = '<p>Крестики</p>'
    turnCountNought.innerHTML = '<p>Нолики</p>'
    
    const field = document.createElement('div')
    field.classList.add('game-field')
    
    
    const text = document.createElement('div')
    text.classList.add('game-text')
    const textTop = document.createElement('p')
    textTop.classList.add('game-text-top')
    textTop.innerText = 'Сейчас ходят'
    const textTurn = document.createElement('p')
    textTurn.classList.add('game-text-turn')
    textTurn.innerText = 'Крестики'
    textTurn.classList.add('cross')
    
    const popup = document.getElementById('popup')
    const popupHeader = document.getElementById('popup-header')
    
    const nextGameButton = document.getElementById('next-game')
    nextGameButton.onclick = function(event) {
        nextGame()
    }
    
    
    // MP3
    const audio = document.getElementById('audio');
    // const meow = document.getElementById('meow');
    // const fanfar = document.getElementById('fanfar');
    
    // OGG
    
    const welcomeSpeach = document.getElementById('oggWelcome')
    const crossTurnSpeach = document.getElementById('oggCrossTurn')
    const crossWinSpeach = document.getElementById('oggCrossWin')
    const noughtTurnSpeach = document.getElementById('oggNoughtTurn')
    const noughtWinSpeach = document.getElementById('oggNoughtWin')
    
    welcomeSpeach.play()

    setTimeout(() => {
        crossTurnSpeach.play()
    }, 4000);
    audio.play()
    
    const cells = []
    // 2. Сгенерировать поле
    
    // Считаем высоту и ширину ячейки
    const cellWidth = 600 / cellNum
    const cellHeight = 600 / cellNum
    for (let i = 0; i < cellNum * cellNum; i++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
    
        cell.style.width = `${cellWidth}px`
        cell.style.height = `${cellHeight}px`
    
        const text = document.createElement('p')
        // 3. Логика кода
        cell.onclick = function(event) {
            // 3.1 определяем чей ход 
            // 3.2. размещение элемента на поле
            if (!cell.classList.contains('cross') && !cell.classList.contains('nought')) {
                cell.classList.add(current)
    
                let isWin = false
                const background = getRandomRGB();
                cell.style.background = background;
                
                // 3.2 Проверка завершения игры
    
                // Проверка горизонталей
                const row = parseInt(i / cellNum)
                let checkHorizontal = true;
    
                for (let k = 0; k < cellNum; k++) {
                    if (!cells[row * cellNum + k].classList.contains(current)) {
                        checkHorizontal = false
                        break
                    } 
                }
                if (checkHorizontal == true) {
                    for (let k = 0; k < cellNum; k++) {
                        if (cells[row * cellNum + k].classList.contains(current)) {
                            cells[row * cellNum + k].classList.add('winner')
                        } 
                    }

                    isWin = true
                }
    
                // Проверка вертикалей
    
                const column = parseInt(i % cellNum)
                let checkVertical = true
    
                for (let k = 0; k < cellNum; k++) {
                    if (!cells[column + k * cellNum].classList.contains(current)) {
                        checkVertical = false
                        break
                    } 
                }
                if (checkVertical == true) {
    
                    for (let k = 0; k < cellNum; k++) {
                        if (cells[column + k * cellNum].classList.contains(current)) {
                            cells[column + k * cellNum].classList.add('winner')
                        } 
                    }

                    isWin = true
                }
    
                // Проверка диагоналей
                checkDiagonal = true
                checkDiagonalSecond = true
                const diagonal = parseInt(i % cellNum)
    
                for (let k = 0; k < cellNum; k++) {
                    if (!cells[k + (cellNum * k)].classList.contains(current)) {
                        checkDiagonal = false
                        break
                    }
                }
    
                for (let k = 0; k < cellNum; k++) {
                    let matematika = (cellNum - 1) * (k + 1)
                    if (!cells[matematika].classList.contains(current)) {
                        checkDiagonalSecond = false
                        break
                    }
                }
    
                if (
                    row === column && checkDiagonal 
                    ||
                    row + column === cellNum - 1 && checkDiagonalSecond 
                ) {
    
                    for (let k = 0; k < cellNum; k++) {
                        if (cells[k + (cellNum * k)].classList.contains(current)) {
                            cells[k + (cellNum * k)].classList.add('winner')
                        }
                    }
    
                    for (let k = 0; k < cellNum; k++) {
                        let matematika = (cellNum - 1) * (k + 1)
                        if (cells[matematika].classList.contains(current)) {
                            cells[matematika].classList.add('winner')
    
                        }
                    }
                    
                    isWin = true
                }
    
                turnCountGeneralCount--
                // 3.3 Передача хода
                turnCountGeneralText.innerText = `Осталось ходов: ${turnCountLeft[current]}`
                if (!isWin) {
                    if (current === 'cross') {
                        textTurn.innerText = 'Нолики'
                        current = 'nought'
                        noughtTurnSpeach.play()
                        crossTurnSpeach.pause()
                        turnCountGeneralText.classList.add('nought')
                        turnCountGeneralText.classList.remove('cross')
                        textTurn.classList.add('nought')
                        textTurn.classList.remove('cross')
                        turnCountLeft['cross']--
                        console.log(turnCountLeft['cross'])
                    } else {
                        textTurn.innerText = 'Крестики'
                        current = 'cross'
                        crossTurnSpeach.play()
                        noughtTurnSpeach.pause()
                        turnCountGeneralText.classList.add('cross')
                        turnCountGeneralText.classList.remove('nought')
                        textTurn.classList.add('cross')
                        textTurn.classList.remove('nought')
                        turnCountLeft['nought']--
                        console.log(turnCountLeft['nought'])

                    }
    
                    
                    
                    turnCount[current]++
                    console.log(turnCountLeft)
                    
                    if (turnCountGeneralCount === 0) {
                        turnCountGeneralText.innerText = `Ходы закончились`
                        popup.style.display = 'flex'
                        popupHeader.innerText = 'Ничья'
                        const emptyTurnCount = document.createElement('p')
                        const emptyTurnCount2 = document.createElement('p')
                        emptyTurnCount.innerText = '💩'
                        emptyTurnCount2.innerText = '💩'
                        turnCountCross.appendChild(emptyTurnCount2)
                        turnCountNought.appendChild(emptyTurnCount)
                        turnCountGeneralCount = cellNum * cellNum
                    }
                } else {
                    score[current]++
                    popup.style.display = 'flex'
                    popupHeader.innerText = 'Победа'
                    const currentTurnCount = document.createElement('p')
                    const emptyTurnCount = document.createElement('p')
                    currentTurnCount.innerText = turnCount[current]
                    emptyTurnCount.innerText = '💩'
                    turnCountGeneralCount = cellNum * cellNum
                    console.log(turnCountGeneralCount)
                    if (current == 'cross') {
                        turnCountCross.appendChild(currentTurnCount)
                        turnCountNought.appendChild(emptyTurnCount)
                        crossWinSpeach.play()
                    } else if (current == 'nought') { 
                        turnCountNought.appendChild(currentTurnCount)
                        turnCountCross.appendChild(emptyTurnCount)
                        noughtWinSpeach.play()

                    }
    
                }
            }
        }
        field.appendChild(cell)
        cells.push(cell)
    }
    
    turnCountTable.appendChild(turnCountCross)
    turnCountTable.appendChild(turnCountNought)
    turnCountBlock.appendChild(turnCountText)
    turnCountBlock.appendChild(turnCountTable)
    
    text.append(textTop)
    text.appendChild(textTurn)
    text.appendChild(turnCountGeneralText)
    text.appendChild(scoreText)
    text.appendChild(turnCountBlock)
    
    app.appendChild(field)
    app.appendChild(text)


    function clearField() {
        for(const cell of cells) {
            cell.classList.remove("win", "cross", "nought")
            cell.className = 'cell'
            cell.style.background = 'white'
        }
    }
    
    function getRandomRGB() {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        const a = Math.random() * 2
        return `rgb(${r}, ${g}, ${b}, ${a})`
    }
    
    
    function nextGame() {
        clearField()
        popup.style.display = 'none'
        scoreText.innerText = `Крестики ${score.cross} - Нолики ${score.nought}`
        turnCount['cross'] = 0
        turnCount['nought'] = 0
        turnCountLeft['cross'] = current == 'cross' ? turnCountGeneralCountLarge : turnCountGeneralCountSmall
        turnCountLeft['nought'] = current == 'nought' ? turnCountGeneralCountLarge : turnCountGeneralCountSmall

        if (current == 'cross') {
            crossTurnSpeach.play()
        } else {
            noughtTurnSpeach.play()
        }
    }
}



