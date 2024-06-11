<template>
    <div id="landing-page">
        <section id="first-sec">
            <div id="left">
                <h1>
                    Optimize your workflow with <span>Viewly</span>
                </h1>
                <p>
                    Use Viewly to manage your projects, tasks, and team members.
                </p>
                <button>
                    Get Started
                </button>
            </div>
            <img src="https://images.milanote.com/milanote/fe89acd7-6881-4ff3-923f-08fff37dfce0_Agency-design-brief-board+example.png" alt="">
        </section>
    </div>
</template>

<script>

export default {
}

</script>

<style scoped>
#landing-page{
    background-color: #ffffff;
    height: 100vh;
}

#first-sec{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10%;
    height: 100vh;

    img{
        width: 100%;
    }

    h1{
        font-size: 3rem;
        text-align: left;
        margin: 0;
        font-weight: 800;

    }

    p{
        font-size: 1.5rem;
        text-align: left;
        margin: 0;
        color: #6c757d;
    }

    button{
        background-color: #007bff;
        color: #ffffff;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        margin-top: 20px;
        cursor: pointer;
    }
}

</style>
