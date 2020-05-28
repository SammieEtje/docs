/*
 * Copyright (C) 2019 - 2020 Rabobank Nederland
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
module.exports = {
  docs: 
  {
    Overview: ['00_overview/10_overview'],
    'Getting started': ['10_get_started/10_get_started', '10_get_started/20_examples'],
    Architecture: ['20_architecture/10_architecture', '20_architecture/20_decisions'],
    Installation: ['30_installation/10_installation', '30_installation/20_upgrade'],
    'System administration': ['40_administration/10_maintenance', '40_administration/20_recover'],
    Security: ['50_security/10_authentication', '50_security/20_authorization'],
    'Supply Chain management': ['60_supplychain_management/10_wip'],
    Reference: [
    	'70_reference/20_layout',
    	'70_reference/21_link',
    	'70_reference/22_signing',
    	'70_reference/23_verification',
    	{ 
    		type: 'category',
    		label: 'Javadocs',
    		items: [
    			{type: "link", label:"argos-service", href: "https://argosnotary.github.io/generated/javadoc/argos-service"},
        	    {type: "link", label:"argos4j", href: "https://argosnotary.github.io/generated/javadoc/argos4j"},
        	]
    	},
    	{type: "link", label:"REST api", href: "https://argosnotary.github.io/generated/openapi"},
    ],
    Contributing: ['80_contributing/10_contributing','80_contributing/20_code_of_conduct','80_contributing/30_developing'],
  },
};
