import Component from "@glimmer/component";
import { action } from '@ember/object';

export default class SubscriptionBar extends Component {

    @action
    handleClick() {
        alert("subscription");
    }

    <template>
        <div class='subscription-bar__wrapper {{settings.plugin_outlet}}'>
            <div class='subscription-bar__container'>
                <div class='subscription-bar__button'>
                    <a {{on 'click' this.handleClick}}>
                        Subscription
                    </a>
                </div>
            </div>
        </div>
    </template>
}