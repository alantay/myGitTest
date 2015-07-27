'use strict';

// Configuring the Articles module
angular.module('risk-assessments').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Risk assessments', 'risk-assessments', 'dropdown', '/risk-assessments(/create)?');
		Menus.addSubMenuItem('topbar', 'risk-assessments', 'List Risk assessments', 'risk-assessments');
		Menus.addSubMenuItem('topbar', 'risk-assessments', 'New Risk assessment', 'risk-assessments/create');
        Menus.addSubMenuItem('topbar', 'risk-assessments', 'Alternate Risk assessment', 'risk-assessments/alternate');
	}
]);
