<template>
    <div class="register-wrapper">
        <ErrorNotification :Text="errorMessage" v-if="errorMessage != ''" />
    </div>
    <h1>{{ teamName }}</h1>
    <p id="description">{{ teamDescription }}</p>

    <router-link id="router-link" :to="{ name: 'teams' }"><span class="material-symbols-outlined">
            keyboard_backspace
        </span></router-link>
    <p v-if="teamMembers.length == 0">You are currently not a member of a team</p>
    <table v-else>
        <thead>
            <tr>
                <th></th>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>E-mail</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in teamMembers" :key="user.id" class="team">
                <td>
                    <span v-if="user.id == teamAdmin" id="admin" class="material-symbols-outlined">
                        star
                    </span>
                </td>
                <td>{{ user.username }}</td>
                <td>{{ user.firstname }}</td>
                <td>{{ user.lastname }}</td>
                <td>{{ user.email }}</td>
            </tr>
        </tbody>
    </table>

    <div id="PopUp">
        <div id="PopUpContent">
            <h1>Are you sure you want to leave the team?</h1>
            <div id="PopUpButtons">
                <input class="leave" type="button" value="Leave" @click="leave()" />
                <input class="cancel" type="button" value="Cancel" @click="closePopUp()" />
            </div>
        </div>
    </div>
    <input class="leave" type="button" value="Leave Team" @click="openPopup()" />
</template>
  
<script>
import { ref, onMounted } from 'vue';
import ErrorNotification from '../components/Notifications/ErrorNotification.vue';
import router from '@/router';
import { useRoute } from 'vue-router';
export default {
    name: "ViewTeam",
    components: {
        ErrorNotification
    },
    setup() {
        let teamMembers = ref([]);
        let teamId = location.href.split("/").slice(-1)[0]
        let teamName = ref('');
        let teamDescription = ref('');
        let teamAdmin = ref('');
        fetch('http://213.229.25.14:3080/isInTeam', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem("token"),
                team_id: teamId
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    errorMessage.value = data.error
                    setTimeout(() => {
                        errorMessage.value = ""
                    }, 6000);
                } else {
                    if (data.data.length == 0) {
                        router.push({ name: 'teams' })
                    } else {

                    }
                }
            })


        fetch('http://213.229.25.14:3080/getTeamMembers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                team_id: teamId
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    errorMessage.value = data.error
                    setTimeout(() => {
                        errorMessage.value = ""
                    }, 6000);
                } else {
                    teamMembers.value = data.data
                }
            })
        fetch('http://213.229.25.14:3080/getTeamData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                team_id: teamId
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    errorMessage.value = data.error
                    setTimeout(() => {
                        errorMessage.value = ""
                    }, 6000);
                } else {
                    teamName.value = data.data[0].teamname
                    teamDescription.value = data.data[0].description
                    teamAdmin.value = data.data[0].FK_Admin_ID
                }
            })



        let openPopup = () => {
            document.getElementById("PopUp").style.display = "block";
        }
        let closePopUp = () => {
            document.getElementById("PopUp").style.display = "none";
        }


        let leave = () => {
            let newAdmin = undefined;
            fetch('http://213.229.25.14:3080/getToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: localStorage.getItem("token")
                })
            }).then(res => res.json())
                .then(data => {
                    if (!data.success) {
                        errorMessage.value = "Error getting token"
                        setTimeout(() => {
                            errorMessage.value = ""
                        }, 6000);
                    } else {
                        console.log(data)
                        console.log(teamAdmin.value)
                        console.log(data.body.userId)
                        if (data.body.userId == teamAdmin.value) {
                            console.log("admin")
                            console.log(teamMembers.value.length)
                            if (teamMembers.value.length > 1) {
                                teamMembers.value.forEach(member => {
                                    if (member.id != teamAdmin) {
                                        newAdmin = member.id
                                    }
                                });
                                changeAdmin(newAdmin)
                                leaveTeam()
                            }
                            else {
                                console.log("delete")
                                deleteTeam()
                            }
                        }
                        else {
                            leaveTeam()
                        }
                    }
                })
        }

        let leaveTeam = () => {
            fetch('http://213.229.25.14:3080/leaveTeam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: localStorage.getItem("token"),
                    team_id: teamId
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        errorMessage.value = data.error
                        setTimeout(() => {
                            errorMessage.value = ""
                        }, 6000);
                    } else {
                        router.push({ name: 'teams' })

                    }
                })
        }

        let changeAdmin = (newAdmin) => {
            fetch('http://213.229.25.14:3080/changeTeamAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    team_id: teamId,
                    newAdmin: newAdmin
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        errorMessage.value = data.error
                        setTimeout(() => {
                            errorMessage.value = ""
                        }, 6000);
                    }
                })


        }


        let deleteTeam = () => {
            fetch('http://213.229.25.14:3080/deleteTeam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    team_id: teamId
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        errorMessage.value = data.error
                        setTimeout(() => {
                            errorMessage.value = ""
                        }, 6000);
                    } else {
                        router.push({ name: 'teams' })
                    }
                })


        }


        let errorMessage = ref('');
        return {
            errorMessage,
            teamMembers,
            teamName,
            teamDescription,
            teamAdmin,
            openPopup,
            closePopUp,
            leave

        };
    }
};
</script>
  
<style scoped>
.cancel {
    background-color: rgb(48, 48, 48);
    color: white;
    border: 1px solid rgb(48, 48, 48);
}

.cancel:hover {
    background-color: white;
    color: rgb(48, 48, 48);
    border: 1px solid rgb(48, 48, 48)
}

#PopUpContent input {
    margin-left: 5%;
    margin-top: 5%;
    text-decoration: none;
    border-radius: 10px;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 1rem;
    transition: all 0.3s ease-in-out;
    padding: 8px 12px;
}

#PopUp {
    display: none;
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
}

#PopUpContent {
    background-color: rgb(84, 84, 84);
    margin: 10% auto 10% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
    border-radius: 10px;

}

.leave {
    margin-left: 5%;
    margin-top: 5%;
    color: white;
    text-decoration: none;
    background-color: rgb(253, 83, 83);
    border-radius: 10px;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 1rem;
    transition: all 0.3s ease-in-out;
    padding: 8px 12px;
    border: 1px solid rgb(253, 83, 83);
}

.leave:hover {
    background-color: white;
    ;
    color: rgb(253, 83, 83);
    border: 1px solid rgb(253, 83, 83);

}

#admin {
    font-size: 1.5rem;
}

h1 {
    font-size: 3rem;
    font-weight: 700;
    text-transform: uppercase;
    color: white;

    margin-top: 3%;
    margin-left: 5%;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    margin-bottom: 0;
}

#description {
    margin-top: 0;
}

p {
    font-size: 1.5rem;
    color: white;
    ;
    margin-top: 1%;
    margin-left: 5%;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

#router-link {
    margin-left: 5%;
    margin-top: 5%;
    color: #ffffff;
    text-decoration: none;
    background-color: #7b52b9;
    padding: 14px 15px 0px 15px;
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


th:first-child,
td:first-child {
    padding: 0;
    padding-left: 10px;
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
  