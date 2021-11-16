sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/crisp/crisprueban/services/ConfigHelper",
    "com/crisp/crisprueban/services/AjaxCaller",
    "com/crisp/crisprueban/services/ApiFacade",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/UriParameters",
    "com/crisp/crisprueban/base/BaseObject"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller, ConfigHelper, AjaxCaller, ApiFacade, JSONModel, UriParameters, BaseObject) {
        "use strict";

        return Controller.extend("com.crisp.crisprueban.controller.View1", {
            ApiFacade: ApiFacade,
            onInit: function () { 
            },

            getCustomersData: function (sMockServerUrl) {
                ApiFacade.getInstance().getCustomersData()

            }
        });
    });
