sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("sapips.training.odata.controller.View", {
        onInit() {},
        
        onAfterRendering: function () {
            let oModel = this.getView().getModel();
            let oTable = this.byId("productTable");

            oModel.read("/Products", {
                success: function (oData) {
                    //sort the data by ProductName
                    let oBinding = oTable.getBinding("items");
                    oBinding.sort(new sap.ui.model.Sorter("ProductName"));

                    //filter the data to exclude discontinued products
                    oBinding.filter(new sap.ui.model.Filter("Discontinued", sap.ui.model.FilterOperator.EQ, false));
                    console.log("Success", oData);
                },
                error: function (oError) {
                    console.error("Error", oError);
                }
            });
        }

    });
});