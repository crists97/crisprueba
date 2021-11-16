sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "sap/m/MessageBox",
    "com/crisp/crisprueban/services/utils/formatter",
    "com/crisp/crisprueban/services/ConfigHelper",
    "com/crisp/crisprueban/services/ApiFacade",
    "com/crisp/crisprueban/services/AjaxCaller",
    "com/crisp/crisprueban/model/models"
],
    function (
        UIComponent,
        Device,
        MessageBox,
        formatter,
        ConfigHelper,
        ApiFacade,
        AjaxCaller,
        models
    ) {
        "use strict";

        return UIComponent.extend("com.crisp.crisprueban.Component", {

            metadata: {
                manifest: "json"
            },
            /**
                  * Shared app formatter
                  * @type {com.ssp.skeleton.app.utils.formatter}
                  */
            formatter: formatter,

            /**
             * Constructor for dependency injection. Only should be called directly by unit tests
             * @public
             * @constructor
             * @param {object} oFormatter Formatter mock. Use only in unit tests
             * @param {object} oConfigHelper ConfigHelper mock. Use only in unit tests
             * @param {object} oApiFacade ApiFacade mock. Use only in unit tests
             * @param {object} oAjaxCaller AjaxCaller mock. Use only in unit tests
             * @param {object} oModels Models mock. Use only in unit tests.
             * @return {com.ssp.skeleton.Component} The app component
             */
            constructor: function (
                oFormatter,
                oConfigHelper,
                oApiFacade,
                oAjaxCaller,
                oModels
            ) {
                if (oFormatter) {
                    formatter = oFormatter;
                }

                if (oConfigHelper) {
                    ConfigHelper = oConfigHelper;
                }

                if (oApiFacade) {
                    ApiFacade = oApiFacade;
                }

                if (oAjaxCaller) {
                    AjaxCaller = oAjaxCaller;
                }

                if (oModels) {
                    models = oModels;
                }

                UIComponent.prototype.constructor.call(this, {});
            },

            /* =========================================================== */
            /* lifecycle methods                                           */
            /* =========================================================== */

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                // initialize all utilities class to have access to owner component
                this._initializeBaseObjectSingletonClasses(); // create the views based on the url/hash
                this.getRouter().initialize();

                // send a message in case SCP tells us to refresh
                sap.ui
                    .getCore()
                    .getEventBus()
                    .subscribe("xpr:ajaxCaller", "sessionTimeout", function () {
                        MessageBox.warning(
                            this.getModel("i18n")
                                .getResourceBundle()
                                .getText("refreshPrompt")
                        );
                    });
            },

            /**
         * Initialize owner component when necessary
         * @private
         * @return {undefined}
         */
            _initializeBaseObjectSingletonClasses: function () {
                ConfigHelper.getInstance().setOwnerComponent(this);
                ApiFacade.getInstance().setOwnerComponent(this);
                AjaxCaller.getInstance().setOwnerComponent(this);
            }
        });
    });
