<template>
    <div class="register-wrapper">
        <ErrorNotification :Text="errorMessage" v-if="errorMessage != ''" />
    </div>
    <h1>My Teams</h1>
    <p v-if="teams.length == 0">You are currently not a member of a team</p>
    <table v-else>
        <thead>
            <tr>
                <th>Teamname</th>
                <th>Beschreibung</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="team in teams" :key="team.id" class="team">
                <td class="team-name">{{ team.teamname }}</td>
                <td class="team-description">{{ team.description }}</td>
                <td ><router-link class="view-link" :to="{ name: 'viewteam', params: { teamid: team.ID } }">View Team</router-link></td>
            </tr>
        </tbody>
    </table>
    <router-link id="router-link" :to="{ name: 'createteam' }">Create Team</router-link>
</template>
  
<script>
import { ref } from 'vue';
import ErrorNotification from '../components/Notifications/ErrorNotification.vue';
import router from '@/router';

export default {
    name: "Teams",
    components: {
        ErrorNotification
    },
    setup() {

        const response = fetch("http://213.229.25.14:3080/getTeams", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: localStorage.getItem("token"),
            }),
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success == false) {
                    router.push({ name: 'login' })
                }
                else {
                    teams.value = data.data
                    console.log(teams.value)
                }
            });
        let errorMessage = ref('');
        let teams = ref([]);
        return {
            errorMessage,
            teams
        };
    }
};
</script>
  
<style scoped>
.view-link {
    color: #ffffff;
    text-decoration: none;
    background-color: #7b52b9;
    padding: 5px 10px;
    border-radius: 8px;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.view-link:hover {
    background-color: #7c5cba;
    color: #ffffff;
    transition: all 0.3s ease;
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

p {
    font-size: 1.5rem;
    color: white;
    ;
    margin-top: 1%;
    margin-left: 5%;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

#router-link{
    margin-left: 5%;
    margin-top: 5%;
    color: #ffffff;
    text-decoration: none;
    background-color: #7b52b9;
    padding: 5px 10px;
    border-radius: 8px;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 1rem;
    transition: all 0.3s ease;
}

#router-link:hover {
    background-color: #7c5cba;
    color: #ffffff;
    transition: all 0.3s ease;
}

table {
    margin-left: 5%;
    margin-top: 1%;
    margin-bottom: 1%;
    width: 50%;
    border-collapse: collapse;
    background-color: #7b52b9;
    color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

th,
td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #707070;
}

th {
    background-color: #7b52b9;
    font-weight: bold;
}

tbody tr {
    background-color: #ffffff;
    color: #332d41;
}

tbody tr:nth-child(even) {
    background-color: rgb(226, 226, 226);
}

tbody tr:hover {
    background-color: #ebebeb;
}


tbody tr:last-child td {
    border-bottom: none;
    margin-bottom: 2%;
}
</style>
  