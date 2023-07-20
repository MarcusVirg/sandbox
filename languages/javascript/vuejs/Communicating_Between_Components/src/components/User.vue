<template>
    <div class="component">
        <h1>The User Component</h1>
        <p>I'm an awesome User!</p>
        <button @click="changeName">Change my Name</button>
        <p>Name is {{ name }}</p>
        <p>Age is {{ age }}</p>
        <hr>
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <app-user-detail 
                :name="name" 
                @nameWasReset="name = $event"
                :resetFn="resetName"
                :userAge="age"
                ></app-user-detail> <!-- this listens for the event when the name is changed in the child component. -->
            </div>
            <div class="col-xs-12 col-sm-6">
                <app-user-edit :userAge="age" :userAgeFn="editAge" @ageWasEdited="age = $event"></app-user-edit>
            </div>
        </div>
    </div>
</template>

<script>
    import UserDetail from './UserDetail.vue';
    import UserEdit from './UserEdit.vue';

    export default {
        data (){
            return {
                name: 'Marcus',
                age: 20
            }
        },
        methods: {
            changeName(){
                this.name='Linda'
            },
            resetName(){
                this.name="Marcus"
            },
            editAge(){
                this.age = 21
            }
        },
        components: {
            appUserDetail: UserDetail,
            appUserEdit: UserEdit
        }
    }
</script>

<style scoped>
    div {
        background-color: lightblue;
    }
</style>
