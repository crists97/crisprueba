sap.ui.define([
], function () {
    jQuery.sap.registerModulePath("axios", "https://unpkg.com/axios/dist/axios.min");
    jQuery.sap.require("axios")

    // Documentation is at https://developer.github.com/v3/
    const BASE_URL = "https://api.github.com";

    return {

        getRepos: function (username) {
            const url = `${BASE_URL}/users/${username}/repos?per_page=250`;
            var that = this;
            this.getUserDatafunction(username);
            var call = axios.get(url).then(function (response) {
                that.getMain(username, response.data[0].trees_url, "main");

            });

            return call;
        },

        getUserDatafunction: function (username) {
            return axios
                .all([
                    axios.get(`${BASE_URL}/users/${username}`),
                    axios.get(`${BASE_URL}/users/${username}/orgs`)
                ])
                .then(([user, orgs]) => ({
                    user: user.data,
                    orgs: orgs.data
                }));
        },

        getMain: function (username, url, rama) {
            var url1 = url.replace("{/sha}", "/" + rama);
            var that=this;
            axios.get(url1).then( function (response) {
                that.createDialog(response)
            })
        },

        createDialog: function (data) {
            var oDialog1 = new sap.m.Dialog();
            var oTable = new sap.m.Table("oTable", {
                columns: [new sap.m.Column({
                    header: new sap.m.Label({
                        text: "NAME"
                    })
                }),new sap.m.Column({
                    header: new sap.m.Label({
                        text: "URL"
                    })
                })
                ],
                items: {
                    path: '/',
                    template: new sap.m.ColumnListItem({
                        cells: [new sap.m.Text({
                            text: "{path}"
                        }),new sap.m.Link({
                            text: "{url}", href: "{url}", target:"_blank"
                        })
                        ]
                    })
                }
            });


            oTable.setModel(new sap.ui.model.json.JSONModel(data.data.tree));

            oDialog1.addContent(oTable);

            oDialog1.open();

        }


    };
});