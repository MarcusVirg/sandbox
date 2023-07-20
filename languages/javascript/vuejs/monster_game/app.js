new Vue ({
    el: '#app',
    data: {
        name: 'YOU',
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    computed: {},
    methods: {
        startGame: function() {
            this.gameIsRunning = true
            this.playerHealth = 100
            this.monsterHealth = 100
            this.turns = []
        },
        attack: function() {
            var damage = this.setDamage(3, 10)
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage 
            })
            if(this.checkWin()){
                return
            }

            this.monsterAttacks()
        },
        specialAttack: function() {
            var damage = this.setDamage(10, 20)
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster hard for ' + damage 
            })
            if(this.checkWin()){
                return
            }
            this.monsterAttacks()
        },
        heal: function() {
            if(this.playerHealth <= 85){
                this.playerHealth += 15
            }
            else {
                this.playerHealth = 100
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals 15 health'
            })
            this.monsterAttacks()
        },
        giveUp: function () {
            this.playerHealth = 0
            this.gameIsRunning = false
        },
        monsterAttacks: function() {
            var damage = this.setDamage(5, 12)
            this.playerHealth -= damage
            this.checkWin()
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Monster for ' + damage
            })
        },
        setDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },
        checkWin: function() {
            if(this.monsterHealth <= 0){
                if(confirm('You won!! New game?')){
                    this.startGame()
                }
                else {
                    this.gameIsRunning = false
                    this.turns = []
                }
                return true
            }
            else if(this.playerHealth <= 0){
                if(confirm('You suck! New Game??')){
                    this.startGame()
                }
                else {
                    this.gameIsRunning = false
                    this.turns = []
                }
                return true
            }
            return
        }
    }
})