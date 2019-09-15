import Vue from 'vue';
import AppMenuItem from '../src/app-menu/app-menu-item.vue';
import AppMenu from '../src/app-menu/app-menu.vue';

document.addEventListener('DOMContentLoaded', function(){
	var menu = new Vue({
		el: "#menu",
		components: {
			"app-menu": AppMenu,
			"app-menu-item": AppMenuItem
		}
	})
})
