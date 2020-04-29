import React from "react";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import PDFBillCreator from "./PDFBillCreator";
import BillContent from "./BillContent";

const PDFBillView = ({ data, docTitle }) => {
  return (
    <PDFViewer style={styles.viewer}>
      <PDFBillCreator data={data} title={docTitle} />
    </PDFViewer>
  );
};

const styles = StyleSheet.create({
  viewer: {
    width: "100%",
    height: "100%",
  },
});

export default PDFBillView;
