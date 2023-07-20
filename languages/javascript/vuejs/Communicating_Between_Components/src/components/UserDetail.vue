<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>Many Details</p>
        <p>User Name: {{ name }}</p>
        <p>User Age: {{ userAge }}</p>
        <button @click="resetName">Reset Name</button>
        <button @click="resetFn">Reset Name</button>
    </div>
</template>

<script>
    import { eventBus } from '../main'
    export default {
        props: {
            name: {
                type: String, // Validates and throws an error when name is anything but a String
                required: true, // It can only be used if there is a value that was passed into it.
                // default: // Or you can set a default value use required or this default property
            },
            resetFn: Function,
            userAge: Number
        },
        methods: {
            switchName(){
                return this.name.split("").reverse().join("") // Reverses name
            },
            resetName(){
                this.name = 'Marcus'
                this.$emit('nameWasReset', this.name) // This causes an event to fire where the parent component can listen for it.
            }
        },
        created(){
            eventBus.$on('ageWasEdited', (data) => {
                this.userAge = data
            })
        }
    }
</script>

<style scoped>
    div {
        background-color: lightcoral;
    }
</style>
