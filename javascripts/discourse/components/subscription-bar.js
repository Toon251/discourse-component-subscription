import Component from "@glimmer/component";
import { action } from '@ember/object';

export default class SubscriptionBar extends Component {

    @action
    handleClick() {
        alert("subscription");

        this.fetchUserSubscription();

    }

    async fetchUserSubscription() {
        try {
          // Fetch current user name
          const response1 = await fetch('/session/current.json');
          const data1 = await response1.json();
        
          console.log(data1)
          
          alert('Username:', data1?.current_user?.username)

      
          // Fetch email
          /*const response2 = await fetch('https://jsonplaceholder.typicode.com/posts/2');
          const data2 = await response2.json();
          console.log('Second fetch result:', data2);
      
          // Third fetch
          const response3 = await fetch('https://jsonplaceholder.typicode.com/posts/3');
          const data3 = await response3.json();
          console.log('Third fetch result:', data3);*/
        } catch (error) {
          console.error('Error during fetch:', error);
        }
      }
}