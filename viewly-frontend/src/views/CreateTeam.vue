<template>
    <div class="register-wrapper">
        <ErrorNotification :Text="errorMessage" v-if="errorMessage != ''" />
    </div>
    <h1>Create Team</h1>
    <div class="form-wrapper">
        <div class="input-wrapper">
            <label for="name"><span>Teamname</span><span style="color: red; font-size: 0.7rem;">*</span></label>
            <input name="name" id="name" type="text" placeholder="Teamname" />
        </div>
        <div class="input-wrapper">
            <label for="description">Description</label>
            <textarea name="description" id="description" rows="3" placeholder="short description"></textarea>
        </div>
        <input type="button" value="Create" @click="submitCreate()" />

    </div>
</template>
  
<script>
import { ref } from 'vue';
import ErrorNotification from '../components/Notifications/ErrorNotification.vue';
import sha256 from 'js-sha256';
import router from '@/router';

export default {
    name: "CreateTeam",
    components: {
        ErrorNotification
    },
    setup() {
        let errorMessage = ref('');
        let counter = 0;
        let team_id = sha256.create().update(Math.random().toString()).hex().substring(0, 16)
        let submitCreate = () => {
            if (counter != 0) return;
            counter++;
            if (document.getElementById('name').value == '') {
                errorMessage.value = 'Please enter a teamname'
                setTimeout(() => {
                    errorMessage.value = ""
                }, 6000);
                return
            }
            fetch('http://213.229.25.14:3080/createTeam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: localStorage.getItem("token"),
                    teamname: document.getElementById('name').value,
                    description: document.getElementById('description').value,
                    ID: team_id
                })
            }).then(res => res.json()).then(data => {
                if (data.error) {
                    errorMessage.value = data.errorMessage
                    setTimeout(() => {
                        errorMessage.value = ""
                    }, 6000);
                } else {
                    console.log(data)
                    joinTeam()
                }
            })
        };
        let joinTeam = () => {
            fetch('http://213.229.25.14:3080/joinTeam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: localStorage.getItem("token"),
                    team_id: team_id
                })

            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        errorMessage.value = data.error
                        setTimeout(() => {
                            errorMessage.value = ""
                        }, 6000);
                    } else {
                        router.push({ name: 'viewteam', params: { teamid: team_id } })
                        
                    }
                })
        };

        return {
            errorMessage,
            submitCreate
        };
    }
};
</script>
  
<style scoped>
.form-wrapper {
    display: flex;
    flex-direction: column;
    height: 30vh;

    background-color: rgba(240, 244, 246);
    width: 27.5%;
    margin-left: 5%;
    margin-top: 10vh;
    border-radius: 1.35rem;
    padding: 5vh 5vw;

    -webkit-box-shadow: 0px 0px 50px 13px rgba(0, 0, 0, 0.589);
    -moz-box-shadow: 0px 0px 50px 13px rgba(0, 0, 0, 0.589);
    box-shadow: 0px 0px 50px 13px rgba(0, 0, 0, 0.589);
}

.input-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    min-width: 250px;
}

label {
    margin-bottom: 0.5%;
    font-size: 0.9rem;
}

input,
textarea {
    background-color: transparent;
    border: 1px solid rgba(87, 87, 87, 0.425);
    outline: none;
    color: rgba(28, 28, 28, 255);
    font-size: 0.9rem;
    font-weight: 300;
    padding: 10px 10px;
    width: 80%;
    resize: none;
    margin-bottom: 2vh;
    border-radius: 5px;
}

h1 {
    font-size: 3rem;
    font-weight: 700;
    text-transform: uppercase;
    color: white;
    ;
    margin-top: 3%;
    margin-left: 5%;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}


input[type="button"] {
    bottom: 2rem;
    width: 6rem;
    background-color: rgba(28, 28, 28, 255);
    color: rgba(240, 244, 246);
    border-radius: 0.8rem;
    padding: 0.5rem 1.5rem;
    cursor: pointer;

    transition: all 0.3s ease-in-out;
    border: 1px solid rgba(28, 28, 28, 255);

}

input[type="button"]:hover {
    background-color: rgba(240, 244, 246);
    color: rgba(28, 28, 28, 255);
    border: 1px solid rgba(28, 28, 28, 255);
}
</style>
  