import Component from '@ember/component';
import { action } from '@ember/object';

export default Component.extend({
    // Component properties
    title: 'My Ember Component',
    description: 'This component demonstrates how to create a simple Ember component.',
    apiKey: 'c159790ac5f92bcff28630e7160b979a455d56989e85cf160613492895a05bfb',
    //apiKey: '02342bb49cea148e2f494df826d5e2541b98b1134d4778ecb7ad3b0dd02aad28',
    apiUsername: 'admin',

    // Action to handle button clicks
    @action
    handleClick() {

        const apiUrl = "/session/current.json";

        //const apiKey = app.get("siteSettings")["apiKey"];
        //const apiUsername = app.get("siteSettings")["apiUsername"];
        //alert('apiKey : ' + apiKey + "\napiUsername : " + apiUsername + "\n");

        const userInfoDisplay = document.getElementById("userInfoDisplay");
        userInfoDisplay.innerHTML = "Loading user info...";


        fetch(apiUrl, {
            headers: {
                'Accept': 'application/json',
                //'Api-Key': apiKey, // If using admin API, provide the API key
                //'Api-Username': apiUsername // Use 'system' to get current user info
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {

                const user = data.current_user

                const apiUrlEmail = "/u/" + user.username + "/emails.json";


                fetch(apiUrlEmail, {
                    headers: {
                        'Accept': 'application/json',
                        //'Api-Key': this.apiKey, // If using admin API, provide the API key
                        //'Api-Username': this.apiUsername // Use 'system' to get current user info
                    }
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((res) => {
                    console.log(res)
                    const {email} = res;

                    // userInfoDisplay.innerHTML = `username: ${user.username} <br> email : ${email}`
                    const apiToken = "https://demo-connect-web.efinancethai.com/api/generate-jwt";
                    /* Begin - Get user token */
                    fetch(apiToken, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            //'Api-Key': this.apiKey, // If using admin API, provide the API key
                            //'Api-Username': this.apiUsername // Use 'system' to get current user info
                        },
                        body: JSON.stringify({
                            username: user.username,   // Replace with the actual data you want to send
                            email: email
                        }),
                    }).then((response) => {
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        return response.json();
                    })
                        .then((res) => {
                            console.log(res)
                            const {token} = res;
                            alert("Token created: " + token);
                            //userInfoDisplay.innerHTML = `token:${token}`;

                        })

                    /* End - Get user token */
                })





                        // Display user information
                /*const user = data.current_user;
                userInfoDisplay.innerHTML = `
                      <strong>Name:</strong> ${user.name}<br>
                      <strong>Username:</strong> ${user.username}<br>
                      <strong>Email:</strong> ${user.email}<br>
                      <strong>Avatar:</strong> <img src="${user.avatar_template}" alt="${user.username} avatar" width="50"/>
                    `;*/
            })
            .catch((error) => {
                console.error("There was a problem with the fetch operation:", error);
                userInfoDisplay.innerHTML = "Error fetching user info.";
            });


    },

    async getSession() {

    }




});
