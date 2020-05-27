import React from "react";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import PDFCaiBillCreator from "./PDFCaiBillCreator";
import PDFProBillCreator from "./PDFProBillCreator";

const PDFBillView = ({ billInfo, billType }) => {
  if (billType) {
    return (
      <PDFViewer style={styles.viewer}>
        <PDFCaiBillCreator billInfo={billInfo} />
      </PDFViewer>
    );
  } else {
    return (
      <PDFViewer style={styles.viewer}>
        <PDFProBillCreator billInfo={billInfo} />
      </PDFViewer>
    );
  }
};

const styles = StyleSheet.create({
  viewer: {
    width: "100%",
    height: "100%",
  },
});

export default PDFBillView;
