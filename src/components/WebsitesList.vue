<template>
    <div>
        <div class="row">
            <div class="col-10 offset-1">
                <div class="form-group text-left">
                    <label>Filter by name:</label>
                    <input type="text" class="form-control" v-model="query" @keyup="getWebsites"/>
                </div>
                <table class="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">
                            Name
                            <span @click="orderBy('name', 'desc')" v-show="orderByName === null">
                                <i class="fa fa-caret-down"></i>
                            </span>
                            <span @click="orderBy('name', 'asc')" v-show="orderByName === 'desc'">
                                <i class="fa fa-caret-up"></i>
                            </span>
                            <span @click="orderBy('name')" v-show="orderByName === 'asc'">
                                <i class="fa fa-caret-down" style="color: #DDD;"></i>
                            </span>
                        </th>
                        <th scope="col">URL</th>
                        <th>Created At
                            <span @click="orderBy('created', 'desc')" v-show="orderByCreated === null">
                                <i class="fa fa-caret-down"></i>
                            </span>
                            <span @click="orderBy('created', 'asc')" v-show="orderByCreated === 'desc'">
                                <i class="fa fa-caret-up"></i>
                            </span>
                            <span @click="orderBy('created')" v-show="orderByCreated === 'asc'">
                                <i class="fa fa-caret-down" style="color: #DDD;"></i>
                            </span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="site in sites" :key="site.id">
                        <td>{{site.id}}</td>
                        <td v-text="site.name"></td>
                        <td v-text="site.url"></td>
                        <td v-text="site.created_at"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="row">
            <div class="col-10 offset-1">
                <nav aria-label="Page navigation example text-center">
                    <ul class="pagination">
                        <li :id="'page-'+page" class="page-item" v-for="page in pages" :key="page"
                            @click.prevent="changePage(page)">
                            <a class="page-link" href="#">{{page}}</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WebsitesList",
        data() {
            return {
                orderByName: null,
                orderByCreated: null,
                pages: 0,
                page: 1,
                query: '',
                sites: [],
            }
        },
        mounted() {
            this.getWebsites();
        },
        methods: {
            async getWebsites() {
                const url = 'http://localhost:8000';
                try {
                    let response = await this.$axios.get(`${url}/api/websites?filter=${this.query}&name=${this.orderByName}&created=${this.orderByCreated}&page=${this.page}`);
                    if (response.data.status) {
                        console.log(response.data);
                        this.sites = response.data.websites;
                        this.pages = response.data.count;
                        setTimeout(() => this.activePage(response.data.page), 1);
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            orderBy(type, direction = null) {
                switch (type) {
                    case 'name':
                        this.orderByName = direction;
                        this.orderByCreated = null;
                        break;
                    case 'created':
                        this.orderByName = null;
                        this.orderByCreated = direction;
                        break;
                }
                this.getWebsites();
            },
            activePage(page) {
                const activeElement = document.querySelectorAll('.page-item.active')[0];
                if (activeElement) {
                    activeElement.classList.remove('active');
                }
                const target = document.querySelector('#page-' + page);
                if (target) {
                    target.classList.add('active');
                }
            },
            changePage(page) {
                console.log(page);
                this.page = page;
                this.getWebsites();
            },
        }
    }
</script>

<style scoped>

</style>
