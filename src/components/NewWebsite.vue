<template>
    <div class="row">
        <div class="col-10 offset-1">
            <div class="card">
                <div class="card-body">
                    <div class="alert alert-danger" v-show="Object.keys(errors).length">
                        <ul>
                            <li v-for="(error, index) in errors" :key="index" class="font-weight-bold">{{error[0]}}</li>
                        </ul>
                    </div>
                    <div class="alert alert-success" v-show="response">
                        <p v-text="response"></p>
                    </div>
                    <form @submit.prevent="submit">
                        <div class="form-group text-left">
                            <label for="exampleInputEmail1">Website name</label>
                            <input type="text" class="form-control" id="exampleInputEmail1"
                                   aria-describedby="emailHelp" v-model="form.name"
                                   placeholder="Enter name">
                        </div>
                        <div class="form-group text-left">
                            <label for="exampleInputPassword1">Website URL</label>
                            <input type="text" class="form-control" id="exampleInputPassword1" v-model="form.url"
                                   placeholder="Enter URL">
                            <small id="emailHelp" class="form-text text-muted">Make sure you use http://, otherwise it
                                won't be accepted.
                            </small>
                        </div>
                        <button type="submit" class="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NewWebsite",
        data() {
            return {
                form: {
                    name: '',
                    url: '',
                },
                errors: {},
                response: '',
            }
        },
        methods: {
            async submit() {
                try {
                    const url = process.env.VUE_APP_API_URL;
                    let response = await this.$axios.post(`${url}/api/websites`, this.form);
                    this.response = response.data.message;
                    for (let key in this.form) {
                        this.form[key] = '';
                    }
                    this.errors = {};
                } catch (error) {
                    this.errors = error.response.data.errors;
                }
            }
        }
    }
</script>

<style scoped>
    ul {
        list-style: none;
    }
</style>
