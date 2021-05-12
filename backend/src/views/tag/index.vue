<template>
    <div>
        <h2>标签管理</h2>
        <form @submit.prevent="addTag">
            <input type="text" name="tag-text" v-model="newTagText" placeholder="New tag">
            <button type="submit">添加</button>
        </form>
        <table>
            <thead>
                <tr>
                    <th width="200px">id</th>
                    <th>name</th>
                    <th style="width: 100px;">action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="tag in tags" :key="tag.id">
                    <td>{{ tag._id }}</td>
                    <td>{{ tag.name }}</td>
                    <td><a class="button-link" @click="showEditDialog(tag)">编辑</a><a class="button-link" href="javascript:;" @click="deleteItem(tag._id)">删除</a></td>
                </tr>
            </tbody>
        </table>
        <div id="editDialog" class="modal" v-if="showEdit">
            <div class="modal_content">
                <form @submit.prevent="EditTag">
                    <input type="text" name="tag-text" v-model="editTag.name" placeholder="tag name">
                    <button type="submit">保存</button>
                </form>
                <a href="javascript:;" class="modal_close" @click="showEdit = false">×</a>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials=true;//携带cookie,默认不携带

export default {
    data() {
        return {
            tags: [{id: 1, name: "aa"}],
            newTagText: "",
            editTag: {},
            showEdit: false
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            let that = this;
            axios.get('http://localhost:3000/decode/api/tag/list')
                .then(function (response) {
                    // handle success
                    console.log(response);
                    that.tags = response.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        },
        addTag() {
            const trimmedText = this.newTagText.trim()
            let that = this;
            if (trimmedText) {
                axios({
                    method: 'post',
                    url: 'http://localhost:3000/decode/api/tag/create',
                    data: {
                        name: trimmedText
                    },
                    headers: {
                    'Content-Type': 'application/json'
                    },
                })
                .then(function (response) {
                    console.log(response);
                    that.newTagText = "";
                    let item = {
                        _id: response.data.data._id,
                        name: response.data.data.name
                    };
                    that.tags.push(item);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },
        showEditDialog(item) {
            this.showEdit = true;
            this.editTag = Object.assign({}, item);
        },
        deleteItem(id) {
            axios({
                    method: 'get',
                    url: 'http://localhost:3000/decode/api/tag/' + id +'/delete',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    }
}
</script>

<style scoped>
form {
    margin: 20px 0;
}
input {
    display: block;
    margin-bottom: 10px;
    height: 32px;
    padding: 0 10px;
    line-height: 32px;
    width: 320px;
}
.modal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(77, 77, 77, .7);
    transition: all .4s;
}
.modal_content {
    border-radius: 4px;
    position: relative;
    width: 500px;
    max-width: 90%;
    background: #fff;
    padding: 1em 2em;
}
.modal_close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #585858;
    text-decoration: none;
}
</style>
