sap.ui.define(
    [
        "sap/ui/model/json/JSONModel",
        "com/crisp/crisprueban/services/ConfigHelper",
        "com/crisp/crisprueban/services/AjaxCaller",
        "com/crisp/crisprueban/utils/formatter",
        "com/crisp/crisprueban/base/BaseObject"
    ],
    function (JSONModel, ConfigHelper, AjaxCaller, formatter, BaseObject) {
        "use strict";

        var oInstance;
        /**
         * Module for managing the calls of the controllers to the backend server
         * (input/output mapping, methods...)
         * @exports com/crisp/crisprueban/app/services/ApiFacade
         */
        var classSingleton = BaseObject.extend(
            "com.crisp.crisprueban.services.ApiFacade",
            {
                /**
                 * Shared app formatter
                 * @type {com.crisp.crisprueban.app.utils.formatter}
                 */
                formatter: formatter,

                constructor: function () {
                    //Call super constructor
                    BaseObject.call(this);
                },

                /**
                 * Method to obtain the product data from its serial number
                 * @public
                 * @param  {string}  sProductId The product id
                 * @return {Promise}            The call promise
                 */
                getCustomersData: function (sProductId) {
                    var oUserDataInfo = ConfigHelper.getInstance().getCallData("CustomerData", "GetCustomerData", sProductId);
                    return AjaxCaller.getInstance()
                        .requestAjax(oUserDataInfo.method, oUserDataInfo.url)
                        .then(function (oData) { //si va bien va por aqui
                            return oData.d.results;
                        }).catch(function (oData) {//si va mal
                            return [];
                        });
                }
            }
        );

        return {
            /**
             * Method to retrieve single instance for class
             * @public
             * @return {com.crisp.crisprueban.app.services.ApiFacade} The APIFacade instance
             */
            getInstance: function () {
                if (!oInstance) {
                    oInstance = new classSingleton();
                }
                return oInstance;
            }
        };
    }
);
