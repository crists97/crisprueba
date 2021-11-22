sap.ui.define([
    "com/crisp/crisprueban/base/BaseController",
    "com/crisp/crisprueban/services/ConfigHelper",
    "com/crisp/crisprueban/services/AjaxCaller",
    "com/crisp/crisprueban/services/ApiFacade",
    "sap/ui/model/json/JSONModel",
    "com/crisp/crisprueban/base/BaseObject", 'sap/m/MessageToast',
    "com/crisp/crisprueban/model/github"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, ConfigHelper, AjaxCaller, ApiFacade, JSONModel, BaseObject, MessageToast, github) {
        "use strict";

        return BaseController.extend("com.crisp.crisprueban.controller.View1", {
            onInit: function () {
            },
            repo: function () {
                github.getRepos("crists97");

            },
            getCustomersData: function () {
                 ApiFacade.getInstance().getCustomersData()
                    .then(function (oData) {
                        MessageToast.show("THERE ARE ->  " +
                            oData.length + " <- CUSTOMER");
                    });
            }


        });
    });