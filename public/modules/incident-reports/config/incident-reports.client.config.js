'use strict';

// Configuring the Articles module
angular.module('incident-reports').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Incident reports', 'incident-reports', 'dropdown', '/incident-reports(/create)?');
		Menus.addSubMenuItem('topbar', 'incident-reports', 'List Incident reports', 'incident-reports');
		Menus.addSubMenuItem('topbar', 'incident-reports', 'New Incident report', 'incident-reports/create');
	}
]);