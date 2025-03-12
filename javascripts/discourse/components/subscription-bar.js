import Component from "@glimmer/component";
import { action } from '@ember/object';

export default class SubscriptionBar extends Component {

    @action
    handleClick() {
        //alert("subscription");

        this.fetchUserSubscription();

    }

    async fetchUserSubscription() {
        try {
          let username = '';
          let email = '';
          // Fetch current user name
          const response1 = await fetch(`/session/current.json`);
          const data1 = await response1.json();
          username = data1.current_user.username
        
          
          
          //alert('Username:' +  username)

      
          // Fetch email
          const response2 = await fetch(`/u/${data1.current_user.username}/emails.json`);
          const data2 = await response2.json();
          //console.log('Second fetch result:', data2);
          email = data2.email;
          //alert('Email:' +  email)

          //alert(settings.url_generate_token);
      
          // Third fetch
          const response3 = await fetch(settings.url_generate_token, 
            { 
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
              body: JSON.stringify({
                  username: username,   // Replace with the actual data you want to send
                  email: email
              }) }
          );
          const data3 = await response3.json();
          //console.log(data3);
          let token = data3.token;
          //alert(token);
          window.open(settings.url_subscription + "?token=" + token,"_blank")
          //console.log('Third fetch result:', data3);
        } catch (error) {
          console.error('Error during fetch:', error);
        }
      }
}