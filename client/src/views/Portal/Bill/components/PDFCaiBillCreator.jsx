import React from "react";
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

        <View style={styles.vRow}>
          <View style={styles.vCol}>
            <Text style={styles.nText}>
              Puede hacer su depósito a nombre de PYFLOR en
            </Text>
            <Text style={styles.nText}>Banco Ficohsa: 001-101-408834</Text>
            <Text style={styles.nText}>
              Banco Banpais Cuenta de Cheque: 015990008396
            </Text>
            <Text style={styles.bText}>CAI #: {billInfo.numBill}</Text>
          </View>
          <View style={styles.vCol}>
            <Text style={styles.nText}>
              Aldea El Molino, Contiguo a Campo Scout, Valle de Angeles, F.M
            </Text>
            <Text style={styles.nText}>
              Tel: (504) 2221-9747, Cel: (504) 9958-3362
            </Text>
            <Text style={styles.nText}>
              representantelegal.pyflor@gmail.com
            </Text>
            <Text style={styles.bText}>R.T.N: 08239006014946</Text>
          </View>
        </View>

        <View style={styles.vRow}>
          <View style={styles.vCol2}>
            <Text style={styles.nText}>CLIENTE: {billInfo.nameClient}</Text>
            <Text style={styles.nText}>R.T.N: 0801-1900-112233</Text>
            <Text style={styles.nText}>DIRECCIÓN: Col. Las Uvas</Text>
          </View>
          <View style={styles.vCol2}>
            <Text style={styles.nText}>
              FECHA DEL DÍA:{" "}
              {moment(billInfo.emissionDate).format("DD/MM/YYYY")}
            </Text>
            <Text style={styles.nText}>
              FECHA DE VENCIMIENTO:{" "}
              {moment(billInfo.emissionDate).add(7, "d").format("DD/MM/YYYY")}
            </Text>
            <Text style={styles.nText}>VENDEDOR: PYFLOR</Text>
          </View>
        </View>

        <Table style={styles.table}>
          <TableHeader>
            <TableCell style={styles.headerText}>CANT.</TableCell>
            <TableCell style={styles.headerText}>DESCRIPCIÓN</TableCell>
            <TableCell style={styles.headerText}>P. UNITARIO</TableCell>
            <TableCell style={styles.headerText}>
              DESCUENTOS Y REBAJAS OTORGADOS
            </TableCell>
            <TableCell style={styles.headerText}>TOTAL</TableCell>
          </TableHeader>
          <TableBody>
            {billInfo.products.map((reg) => (
              <TableRow>
                <TableCell>{reg.quantity}</TableCell>
                <TableCell>{reg.nameProduct} LPS.</TableCell>
                <TableCell></TableCell>
                <TableCell>{reg.price} LPS.</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <View style={styles.vRow}>
          <View style={styles.vCol}>
            <View style={styles.containerShipping}>
              <View style={styles.vRow}>
                <View style={styles.vCol4L}>
                  <Text style={styles.nText}>N° ORDEN DE COMPRA EXENTA</Text>
                  <Text style={styles.nText}>
                    N° CONSTANCIA REGISTRO EXONERADO
                  </Text>
                  <Text style={styles.nText}>N° REGISTRO DE LA SAG</Text>
                </View>
                <View style={styles.vCol4}>
                  <Text style={styles.nText}></Text>
                  <Text style={styles.nText}></Text>
                  <Text style={styles.nText}></Text>
                </View>
              </View>
            </View>

            <View style={styles.vSign}>
              <Text style={styles.nText}>FIRMA AUTORIZADA</Text>
            </View>
          </View>
          <View style={styles.vCol3}>
            <View style={styles.containerShipping}>
              <View style={styles.vRow}>
                <View style={styles.vColPayDescL}>
                  <Text style={styles.nText}>DESCUENTOS OTORGADOS L.</Text>
                  <Text style={styles.nText}>REBAJAS OTORGADAS L.</Text>
                  <Text style={styles.nText}>FLETE L.</Text>
                  <Text style={styles.nText}>SUB-TOTAL L.</Text>
                  <Text style={styles.nText}>IMPORTE EXENTO L.</Text>
                  <Text style={styles.nText}>IMPORTE GRAVADO 18% L.</Text>
                  <Text style={styles.nText}>IMPORTE GRAVADO 15% L.</Text>
                  <Text style={styles.nText}>TASA ALÍCUOTA L.</Text>
                  <Text style={styles.nText}>I.S.V 15% L.</Text>
                  <Text style={styles.nText}>I.S.V 18% L.</Text>
                  <Text style={styles.nText}>IMOPRTE EXONERADO L.</Text>
                  <Text style={styles.nText}>TOTAL A PAGAR L.</Text>
                </View>
                <View style={styles.vColPayDesc}>
                  <Text style={styles.nText}></Text>
                  <Text style={styles.nText}></Text>
                  <Text style={styles.nText}></Text>
                  <Text style={styles.nText}></Text>
                  <Text style={styles.nText}></Text>
                  <Text style={styles.nText}></Text>
                  <Text style={styles.nText}></Text>
                  <Text style={styles.nText}></Text>
                  <Text style={styles.nText}></Text>
                  <Text style={styles.nText}></Text>
                  <Text style={styles.nText}></Text>
                  <Text style={styles.nText}></Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.vRow}>
          <Text>FACTURA N° {billInfo.numBill}</Text>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
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
  containerShipping: {
    borderStyle: "solid",
    borderWidth: "1",
    borderRadius: "10",
    borderColor: "black",
    width: "95%",
    marginTop: "10",
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
  vSign: {
    marginTop: "150",
    alignItems: "center",
    borderTop: "1",
    borderTopStyle: "solid",
    borderTopColor: "black",
  },
});

export default PDFCaiBillCreator;
