<template>
    <div id="app">
        <div class="container-fluid">
            <img alt="Vue logo" src="./assets/logo.png">
            <div id="nav">
                <router-link to="/">Home</router-link> |
                <router-link to="/websites">Websites</router-link> |
                <router-link to="/websites/create">Create</router-link>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'App',
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
