export default {
  async isTokenValid() {
    try {
      const response = await fetch("http://213.229.25.14:3080/getToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
        }),
      });

      const data = await response.json();

      if (data.success) {
        return true;
      } else {
        localStorage.removeItem("token");
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false; // Hier kannst du entscheiden, wie du mit Fehlern umgehen möchtest
    }
  },

  async getUserData() {
    try {
      const response = await fetch("http://213.229.25.14:3080/getToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
        }),
      });

      const data = await response.json();

      if (data.success) {
        return data.body;
      } else {
        localStorage.removeItem("token");
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false; // Hier kannst du entscheiden, wie du mit Fehlern umgehen möchtest
    }
  }

};
