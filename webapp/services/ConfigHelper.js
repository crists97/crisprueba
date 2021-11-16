sap.ui.define(
    [
        "sap/ui/model/json/JSONModel",
        "com/crisp/crisprueban/base/BaseObject"
    ],
    function (JSONModel, BaseObject) {
        "use strict";

        var oInstance;
        /**
         * Module for extracting configuration values from the config.json file
         * @exports com/crisp/crisprueban/services/ConfigHelper
         */
        var oClassInstance = BaseObject.extend(
            "com.crisp.crisprueban.services.ConfigHelper", {
            /* =========================================================== */
            /* begin: public methods                                     */
            /* =========================================================== */

            /**
             * Get access to config model from "config.json" file
             * @public
             * @return {[type]} [description]
             */
            constructor: function () {
                //Call super constructor
                BaseObject.call(this);

                //Load config json
                var oConfigModel = new JSONModel();
                oConfigModel.loadData(
                    jQuery.sap.getModulePath(
                        "com.crisp.crisprueban",
                        "/config.json"
                    )
                );

                oConfigModel.attachRequestCompleted(
                    function () {
                        this._oConfigData = oConfigModel.getData();

                        //Build url base
                        this._buildUrlBase();
                    }.bind(this)
                );
            },

            /**
             * Get working mode.
             * @public
             * @return {string} Working mode
             */
            getWorkingMode: function () {
                return this._oConfigData.mode;
            },

            /**
             * Return semantic timeout: short, medium & long
             * @public
             * @param {string} sTimeoutDuration Timeout duration: "short", "medium" & "long"
             * @return {number} semantic timeout: short, medium & long
             */
            getTimeout: function (sTimeoutDuration) {
                if (this._oConfigData) {
                    return this._oConfigData.timeout[sTimeoutDuration];
                } else {
                    return "long"
                }
            },

            /**
             * Return an info object with all data needed to call the Product Data API Endpoint
             * @public
             * @return {object} The product data info object
             */
            getCustomerDataInfo: function () {
                return this._getCallData("customerData", "GetCustomerData");
            },

            /**
             * Get common url path and local auth for app
             * @public
             * @return {object} Get common context path and local auth
             */
            getCommonPath: function () {
                return this._oConfigData.urls.path;
            },

            /**
             * Returns the base backend path
             * @return {string} The base backend path
             */
            getBasePath: function () {
                return this._oConfigData.urls.path;
            },

            /* =========================================================== */
            /* begin: internal methods                                     */
            /* =========================================================== */

            /**
             * Return url base calculated at initialization of object
             * @private
             * @return {string} url based on system
             */
            _getUrlBase: function () {
                return this._sUrlBase;
            },

            /**
             * Get an url like "https://<host>:port" based on working mode and system
             * configuration.
             *
             * When "sMode" internally configured to use "relative" mode,
             * then it is not necessary to build absolute URL, so empty string is
             * returns.
             *
             * Method save "urlBase" built at "_sUrlBase".
             *
             * @private
             * @return {string} The base url
             */
            _buildUrlBase: function () {
                var sMode = this._oConfigData.mode,
                    sHttps = this._oConfigData.https === "true" ? "https" : "http",
                    oSystems = this._oConfigData.environments;

                switch (sMode) {
                    case "relative":
                    case "local":
                        this._sUrlBase = "";
                        break;

                    default:
                        if (!sMode) {
                            sMode = "dev";
                        }

                        var oEnvironmentInfo = oSystems[sMode],
                            sHostname = oEnvironmentInfo.host,
                            sPort = oEnvironmentInfo.port;

                        this._sUrlBase = sHttps + "://" + sHostname + ":" + sPort;

                        break;
                }
            },

            /**
             * Get specific url path and mehod call
             * @private
             * @param {string} sApiPath The API path
             * @param {string} sApiMethod The HTTP Method
             * @param {array} aParams The array of parameters
             * @return {object} Get API Method specific context path and http method
             */
            _getCallData: function (sApiPath, sApiMethod, aParams) {
                var sContextPath = "";
                sContextPath = this._oConfigData.urls[sApiPath].path;

                //If there are given parameters then apply it on url
                if (aParams) {
                    for (var i in aParams) {
                        if (aParams.hasOwnProperty(i)) {
                            sContextPath =
                                sContextPath.split(/\$(.+)/)[0] +
                                aParams[i] +
                                sContextPath.split(/\$(.+)/)[1];
                        }
                    }
                }
                //Delete possible unnecesary param placeHolders
               /* if (sContextPath.indexOf("$") !== -1) {
                    sContextPath = sContextPath.split("$")[0];
                }*/

                var sMethod = "";
                sMethod = this._oConfigData.urls[sApiPath][sApiMethod].method;
                return {
                    method: sMethod,
                    url: this.getCommonPath() + sContextPath
                };
            }
        }
        );

        return {
            /**
             * Method to retrieve single instance for class
             * @public
             * @return {com.xpr.test.app.app.services.ConfigHelper} ConfigHelp singleton instance
             */
            getInstance: function () {
                if (!oInstance) {
                    oInstance = new oClassInstance();
                }
                return oInstance;
            }
        };
    }
);