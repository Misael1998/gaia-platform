import React, { useState, useEffect } from "react";
import {
  Page,
  View,
  Text,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../../../../assets/img/logo.png";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";
import moment from "moment";
import { TableRow } from "@david.kucsai/react-pdf-table/lib/TableRow";

const PDFCaiBillCreator = ({ billInfo, title }) => {
  //State para guardar los productos
  const [prod, setProd] = useState([]);

  useEffect(() => {
    setProd(billInfo.products);
  }, []);

  let totalIm = 0;

  for (var i = 0; i < prod.length; i++) {
    totalIm = totalIm + parseInt(prod[i].importTotal, 10);
  }

  return (
    <Document title={`${title} - ${moment().format("DD/MM/YYYY")}`}>
      <Page size="RA3" wrap={false} style={styles.page}>
        <View style={styles.vRow}>
          <View style={styles.vCol}>
            <Image source={logo} style={styles.image} />
          </View>
          <View style={styles.vCol}>
            <Text style={styles.subTitle}>PILONES Y FLORES DE HONDURAS</Text>
            <Text style={styles.subTitle2}>S.A DE C.V</Text>
          </View>
        </View>

        <View style={styles.vRow2}>
          <View style={styles.vCol2}>
            <Text style={styles.nText}>PARA: {billInfo.nameClient}</Text>
          </View>
          <View style={styles.vCol2}>
            <Text style={styles.nText}>FACTURA #: {billInfo.numBill}</Text>
            <Text style={styles.nText}>
              FECHA: {moment(billInfo.emissionDate).format("DD/MM/YYYY")}
            </Text>
            <Text style={styles.nText}>
              FECHA VENCIMIENTO:
              {moment(billInfo.emissionDate).add(7, "d").format("DD/MM/YYYY")}
            </Text>
          </View>
        </View>

        <Table style={styles.table} data={billInfo.products}>
          <TableHeader>
            <TableCell style={styles.headerText}>ARTÍCULO</TableCell>
            <TableCell style={styles.headerText}>CANTIDAD</TableCell>
            <TableCell style={styles.headerText}>PRECIO</TableCell>
            <TableCell style={styles.headerText}>IMPORTE</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell
              style={styles.infoCell}
              getContent={(r) => r.nameProduct}
            />
            <DataTableCell
              style={styles.infoCell}
              getContent={(r) => r.quantity}
            />
            <DataTableCell
              style={styles.infoCell}
              getContent={(r) => r.price + "Lps."}
            />
            <DataTableCell
              style={styles.infoCell}
              getContent={(r) => r.importTotal + "Lps."}
            />
          </TableBody>
        </Table>

        <View style={styles.vRow}>
          <View style={styles.vCol}></View>
          <View style={styles.vCol3}>
            <View style={styles.containerShipping}>
              <View style={styles.vRow}>
                <View style={styles.vColPayDescL}>
                  <Text style={styles.nText}>TOTAL PARCIAL L.</Text>
                  <Text style={styles.nText}>TOTAL L.</Text>
                </View>
                <View style={styles.vColPayDesc}>
                  <Text style={styles.infoCellDNone}></Text>
                  <Text style={styles.infoCell}>{totalIm} Lps.</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.vRow}>
          <View style={styles.vCol}></View>
          <View style={styles.vCol3}>
            <View style={styles.containerGreen}>
              <View style={styles.vRow}>
                <View style={styles.vColPayDescL}>
                  <Text style={styles.nText}>SALDO DEUDOR L.</Text>
                </View>
                <View style={styles.vColPayDesc}>
                  <Text style={styles.nText}></Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  mContainer: {
    borderStyle: "solid",
    borderWidth: "1",
    borderRadius: "10",
    borderColor: "black",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    margin: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "flex-start",
  },
  subTitle2: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: "100",
  },
  date: {
    fontSize: 14,
  },
  image: {
    width: 140,
    height: 40,
  },
  text: {
    fontSize: 12,
    padding: 5,
    textAlign: "center",
  },
  nText: {
    fontSize: 10,
    padding: 5,
  },
  bText: {
    fontSize: 10,
    padding: 5,
    fontWeight: "extrabold",
  },
  headerText: {
    padding: 5,
    fontSize: 10,
    backgroundColor: "#27ae60",
    textAlign: "center",
    color: "white",
  },
  headerText2: {
    fontSize: 8,
    textAlign: "left",
  },
  infoCell: {
    padding: 5,
    fontSize: 10,
    textAlign: "center",
  },
  infoCellDNone: {
    padding: 5,
    fontSize: 10,
    textAlign: "center",
    flex: "none",
  },
  containerShipping: {
    borderStyle: "solid",
    borderWidth: "1",
    borderRadius: "10",
    borderColor: "black",
    width: "95%",
    marginTop: "10",
  },
  containerGreen: {
    borderStyle: "solid",
    borderWidth: "1",
    borderRadius: "10",
    borderColor: "black",
    width: "95%",
    backgroundColor: "#27ae60",
    color: "white",
  },
  vCol: {
    display: "flex",
    flexDirection: "column",
    width: "45%",
  },
  vCol2: {
    display: "flex",
    flexDirection: "column",
    width: "60%",
    marginLeft: "10",
    marginBottom: "20",
  },
  vCol3: {
    display: "flex",
    flexDirection: "column",
    width: "54%",
    marginLeft: "10",
    marginBottom: "20",
    alignItems: "flex-end",
  },
  vCol4: {
    display: "flex",
    flexDirection: "column",
    width: "60%",
    marginTop: "0",
    marginBottom: "0",
    marginLeft: "10",
    marginRight: "10",
  },
  vCol4L: {
    display: "flex",
    flexDirection: "column",
    width: "60%",
    marginTop: "0",
    marginBottom: "0",
    marginLeft: "10",
    marginRight: "10",
    borderRight: "1",
  },
  vColPayDescL: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    marginTop: "0",
    marginBottom: "0",
    marginLeft: "10",
    marginRight: "10",
    borderRight: "1",
  },
  vColPayDesc: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    marginTop: "0",
    marginBottom: "0",
    marginLeft: "10",
    marginRight: "10",
  },
  vRow: {
    display: "flex",
    flexDirection: "row",
  },
  vRow2: {
    display: "flex",
    flexDirection: "row",
    marginTop: "20",
  },
  vSign: {
    marginTop: "150",
    alignItems: "center",
    borderTop: "1",
    borderTopStyle: "solid",
    borderTopColor: "black",
  },
});

export default PDFCaiBillCreator;
