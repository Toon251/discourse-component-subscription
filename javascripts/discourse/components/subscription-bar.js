import Component from "@glimmer/component";
import { action } from '@ember/object';

export default class SubscriptionBar extends Component {

    @action
    handleClick() {
        alert("subscription");
    }
}