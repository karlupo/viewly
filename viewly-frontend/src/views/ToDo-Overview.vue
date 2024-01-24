<template>
    <div id="todo-overview" @contextmenu.prevent>
        <div class="edit-ToDo" v-if="showEdit">
            <div id="cancelNewToDo" @click="closeEdit">
                <div class="cancel" id="leftrot"></div>
                <div class="cancel"></div>
            </div>
            <input type="text" v-model="toEdit" placeholder="Unnamed">

            <div id="edit-wrapper">
                <div id="desc-wrapper">
                    <h2>Description</h2>
                    <textarea id="desc" cols="30" rows="5" placeholder="Your description goes here"></textarea>
                </div>
                <div id="property-wrapper">
                    <h2>Properties</h2>
                    <div id="status">
                        <label for="status">Status</label>
                        <select name="status" id="status">
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                            <option value="Canceled">Canceled</option>
                            <option value="Add New" id="addnewstatus">Add New</option>
                        </select>
                    </div>
                    <div id="dueto">
                        <label for="dueto">Due To</label>
                        <input type="date" name="dueto" id="dueto-edit">
                    </div>
                    <div id="tags">
                        <label for="tags">Tags</label>
                        <input type="text" name="tags" id="tags-edit" placeholder="Tags (Seperate with ,)">
                        <div id="show-tags">
                            <span class="tag-in-edit"><span class="material-symbols-outlined del-tag">
                                    delete
                                </span>Homework</span>
                            <span class="tag-in-edit"><span class="material-symbols-outlined del-tag">
                                    delete
                                </span>Homework</span>
                            <span class="tag-in-edit"><span class="material-symbols-outlined del-tag">
                                    delete
                                </span>Homework</span>
                            <span class="tag-in-edit"><span class="material-symbols-outlined del-tag">
                                    delete
                                </span>Homework</span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="todo-cont">
            <h1>ToDo List</h1>
            <div id="headers">
                <div id="title" class="header"><span class="material-symbols-outlined">
                        title
                    </span>Title</div>
                <div id="dueto" class="header"><span class="material-symbols-outlined">
                        calendar_month
                    </span>Due To</div>
                <div id="status" class="header"><span class="material-symbols-outlined">
                        checklist
                    </span>Status</div>
                <div id="actions" class="header"><span class="material-symbols-outlined">
                        label
                    </span>Tags</div>
            </div>
            <div id="todos">
                <div class="todo" v-for="todo in todos" :key="todo.id" @contextmenu.prevent="edit">
                    <div class="todo-property">{{ todo.title }}</div>
                    <div class="todo-property">{{ todo.dueto }}</div>
                    <div class="todo-property" id="status">{{ todo.status }}</div>
                    <div class="todo-property tags" @mousedown="mousedown" @mousemove="drag" @mouseup="dragend">
                        <span class="tag" v-for="tag in todo.tags" :key="tag">
                            <span class="material-symbols-outlined del-tag">
                                delete
                            </span>
                            {{ tag }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup() {
        let todos = ref([
            {
                id: 1,
                title: "Do the dishes",
                description: "Do the dishes and clean the kitchen",
                status: "In Progress",
                dueto: "2021-10-10",
                tags: ["Home", "Chores"]
            },
            {
                id: 2,
                title: "Do the laundry",
                description: "Do the laundry and clean the house",
                status: "In Progress",
                dueto: "2021-10-10",
                tags: ["Home", "Chores"]
            },
            {
                id: 3,
                title: "Do the homework",
                description: "Do the homework and clean the house",
                status: "In Progress",
                dueto: "2021-10-10",
                tags: ["School", "Homework"]
            },
            {
                id: 4,
                title: "Do the homework",
                description: "Do the homework and clean the house",
                status: "In Progress",
                dueto: "2021-10-10",
                tags: ["School", "Homework"]
            },
            {
                id: 5,
                title: "Do the homework",
                description: "Do the homework and clean the house",
                status: "In Progress",
                dueto: "2021-10-10",
                tags: ["School", "Homework"]
            },
            {
                id: 6,
                title: "Do the homework",
                description: "Do the homework and clean the house",
                status: "In Progress",
                dueto: "2021-10-10",
                tags: ["School", "Homework"]
            },
            {
                id: 7,
                title: "Do the homework",
                description: "Do the homework and clean the house",
                status: "In Progress",
                dueto: "2021-10-10",
                tags: ["School", "Homework"]
            },
            {
                id: 8,
                title: "Do the homework",
                description: "Do the homework and clean the house",
                status: "In Progress",
                dueto: "2021-10-10",
                tags: ["School", "Homework"]
            },
            {
                id: 9,
                title: "Do the homework",
                description: "Do the homework and clean the house",
                status: "In Progress",
                dueto: "2021-10-10",
                tags: ["School", "Homework", "Test"]
            },
        ]);

        let toEdit = ref("")

        let showEdit = ref(true);

        let edit = (e) => {
            e.preventDefault();
            toEdit.value = e.currentTarget.innerText.split("\n")[0];
            showEdit.value = true;
        }

        let closeEdit = (e) => {
            e.preventDefault();
            toEdit.value = "";
            showEdit.value = false;
        }

        let mousedown = (e) => {
            e.preventDefault();
            document.body.style.cursor = "grabbing";
            document.body.style.userSelect = "none";
        }
        let drag = (e) => {
            if (e.buttons == 1) {
                e.preventDefault();
                e.currentTarget.scrollLeft = e.currentTarget.scrollLeft - e.movementX;
            } else {
                document.body.style.cursor = "default";
                e.target.style.userSelect = "auto";
            }
        }
        let dragend = (e) => {
            document.body.style.cursor = "default";
            e.target.style.userSelect = "auto";
        }

        return { todos, drag, dragend, mousedown, edit, toEdit, closeEdit, showEdit }
    }
}
</script>

<style scoped>
h1 {
    color: white;
    text-align: left;
    margin-left: 0;
    margin-bottom: 40px;
    font-size: 2.5rem;
}

#todo-cont {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
    width: 60%;
    margin: 120px auto;
}

#headers {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2.5%;
    color: white;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.151);
    margin-bottom: 5px;
}

.header {
    display: flex;
    flex-direction: row;
    gap: 2.5%;
    align-items: center;
    color: rgba(255, 255, 255, 0.548);
}

#todos {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
    width: 100%;
}

.todo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2.5%;
    color: white;
    width: 100%;
    padding: 0px 10px;
}

.todo:hover {
    background-color: rgba(255, 255, 255, 0.151);
    border-radius: 10px;
}

.header {
    width: 25%;
}

.todo-property {
    width: 25%;
    padding: 10px 0;
    padding-right: 20px;
}

.todo-property:not(:last-child) {
    border-right: 1px solid rgba(255, 255, 255, 0.151);
}

.tags {
    overflow-x: scroll;
    white-space: nowrap;
    /* Verhindert, dass Spans in die nächste Zeile springen */
    scrollbar-color: rgba(255, 255, 255, 0.151) transparent;
    /* Farbe des Scrollbalkens */
    scrollbar-width: thin;
    /* Breite des Scrollbalkens */
    scrollbar-arrow-color: transparent;
}


.tag {
    background-color: rgba(255, 255, 255, 0.151);
    padding: 2px 10px;
    border-radius: 20px;
    color: white;
    font-size: 0.8rem;
    font-weight: bold;
    margin-right: 10px;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    width: max-content;
}

.del-tag {
    font-size: 1.2rem;
    font-weight: 300;
}

.del-tag:hover {
    color: rgba(255, 255, 255, 0.37);
    cursor: pointer;
}

.edit-ToDo {
    color: white;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 900px;
    height: 600px;
    background-color: rgb(34, 34, 34);
    z-index: 100;
    display: block;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.205);
    overflow: scroll;
}

.edit-ToDo>input {
    font-size: 2rem;
    font-weight: 800;
    color: white;
    text-align: center;
    width: 100%;
    padding: 20px 0;
    height: 5%;
    overflow: hidden;
    white-space: nowrap;
    word-break: keep-all;
    background: transparent;
    outline: none;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.151);
    margin-top: 50px;
}

#cancelNewToDo {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    z-index: 100;
}

.cancel {
    width: 2.5px;
    height: 30px;
    background-color: white;
    transform: rotate(45deg);
    cursor: pointer;
    position: absolute;
}

#cancelNewToDo:hover {
    background-color: rgba(255, 255, 255, 0.151);
    border-radius: 50%;
}


#leftrot {
    transform: rotate(-45deg);
}


#desc {
    background-color: transparent;
    color: white;
    font-size: 1.2rem;
    font-weight: 300;
    resize: none;
    outline: none;
    border: none;
    padding: 10px;
    border-radius: 5px;

}

#desc:hover {
    background-color: rgba(61, 61, 61, 0.151);
}

#desc:focus {
    background-color: rgba(119, 119, 119, 0.151);
}

#edit-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
    gap: 20px;
}

#property-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    gap: 50px;
}

#property-wrapper h2 {
    margin-bottom: 0px;
}

#property-wrapper select {
    background-color: transparent;
    color: white;
    font-size: 1rem;
    outline: none;
    border: none;
    padding: 10px;
    border-radius: 5px;
    width: 70%;
}

#property-wrapper select:hover {
    background-color: rgba(61, 61, 61, 0.151);
}

#property-wrapper label {
    display: inline-block;
    width: 90px;
}

/* Stil für die Optionen im Dropdown-Menü */
select option {
    padding: 8px;
    /* Anpassung der Innenpolsterung */
    background-color: #fff;
    /* Hintergrundfarbe setzen */
    color: rgb(34, 34, 34);
    /* Textfarbe setzen */
    border-radius: 30px;
}

/* Ändern Sie die Farbe des Dropdown-Pfeils (wenn vom Browser unterstützt) */
select::-ms-expand {
    color: rgb(34, 34, 34);
    /* Textfarbe setzen */
}

#dueto-edit {
    background-color: transparent;
    border: none;
    outline: none;
    color: white;
    padding: 10px;
    border-radius: 5px;
    cursor: text;
    font-size: 1rem;
}


#dueto-edit:hover {
    background-color: rgba(61, 61, 61, 0.151);
}

#tags-edit {
    background-color: transparent;
    border: none;
    outline: none;
    color: white;
    padding: 10px;
    border-radius: 5px;
    cursor: text;
    width: 70%;
    font-size: 1rem;
    font-weight: 300;

}

#tags-edit:hover {
    background-color: rgba(61, 61, 61, 0.151);
}

#show-tags{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 10px;
    margin-top: 20px;
}
.tag-in-edit {
    background-color: rgba(255, 255, 255, 0.151);
    padding: 2px 10px;
    border-radius: 20px;
    color: white;
    font-size: 0.8rem;
    font-weight: bold;
    margin-right: 10px;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    width: max-content;
}
</style>