sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/crisp/crisprueban/services/ConfigHelper",
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller,ConfigHelper) {
        "use strict";

        return Controller.extend("com.crisp.crisprueban.controller.View1", {
            onInit: function () {
              //  this.getInfoService();
            },

            getInfoService: function (sProdctId) {
                var oUserDataInfo = ConfigHelper.getInstance().getProductDataInfo();

                return AjaxCaller.getInstance()
                    .requestAjax(oUserDataInfo.method, oUserDataInfo.url)
                    .then(function (oData) {
                        return oData;
                    });
            }
        });
    });
