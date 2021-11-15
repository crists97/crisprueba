sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/crisp/crisprueban/services/ConfigHelper",
    "com/crisp/crisprueban/services/AjaxCaller",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/UriParameters",
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller, ConfigHelper, AjaxCaller, JSONModel, UriParameters) {
        "use strict";

        return Controller.extend("com.crisp.crisprueban.controller.View1", {
            onInit: function () {
                var urlWindows = window["location"]["href"];
                urlWindows = urlWindows.split("/index")[0]
                var url = urlWindows + this.getView().getParent().getModel("undefined").sMetadataUrl;
                var that = this;
                setTimeout(function (that) {
                    AjaxCaller.getInstance()
                        .requestAjax("GET", url)
                        .then(function (oData) {
                            return oData;
                        });
                }, 2000);

            },

            getInfoService: function (sMockServerUrl) {


            }
        });
    });
