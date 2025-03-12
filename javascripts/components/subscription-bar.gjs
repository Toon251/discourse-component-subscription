import Component from "@glimmer/component";
import { service } from "@ember/service";

export default class SubscriptionBar extends Component {
    @service site;

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