import React from "react";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import PDFCaiBillCreator from "./PDFCaiBillCreator";
import PDFProBillCreator from "./PDFProBillCreator";

const PDFBillView = ({ data, billType }) => {
  if (billType) {
    return (
      <PDFViewer style={styles.viewer}>
        <PDFCaiBillCreator data={data} />
      </PDFViewer>
    );
  } else {
    return (
      <PDFViewer style={styles.viewer}>
        <PDFProBillCreator data={data} />
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
