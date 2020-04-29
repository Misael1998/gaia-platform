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

const PDFBillCreator = ({ data, title }) => {
  return (
    <Document title={`${title} - ${moment().format("DD/MM/YYYY")}`}>
      <Page size="A3" wrap={false} style={styles.page}>
        <View style={styles.titleContainer}>
          <View>
            <Image source={logo} style={styles.image} />
          </View>

          <View>
            <Text style={styles.subTitle}>PILONES Y FLORES DE HONDURAS</Text>
            <Text style={styles.subTitle}>S.A DE C.V</Text>
          </View>
        </View>

        <View style={styles.titleContainer}>
          <View>
            <Text style={styles.nText}>
              Puede hacer su depósito a nombre de PYFLOR en
            </Text>
            <Text style={styles.nText}>Banco Ficohsa: 001-101-408834</Text>
            <Text style={styles.nText}>
              Banco Banpais Cuenta de Cheque: 015990008396
            </Text>
            <Text style={styles.bText}>
              CAI: XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX
            </Text>
          </View>
          <View>
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

        <View style={styles.titleContainer}>
          <View>
            <Text style={styles.nText}>CLIENTE: Juan Perez</Text>
            <Text style={styles.nText}>R.T.N: 0801-1900-112233</Text>
            <Text style={styles.nText}>DIRECCIÓN: Col. Las Uvas</Text>
          </View>
          <View>
            <Text style={styles.nText}>FECHA DEL DÍA: 29/4/2020</Text>
            <Text style={styles.nText}>FECHA DE VENCIMIENTO: 3/5/2020</Text>
            <Text style={styles.nText}>VENDEDOR: PYFLOR</Text>
          </View>
        </View>

        <Table>
          <TableHeader>
            <TableCell style={styles.headerText}>CANT.</TableCell>
            <TableCell style={styles.headerText}>DESCRIPCIÓN</TableCell>
            <TableCell style={styles.headerText}>P. UNITARIO</TableCell>
            <TableCell style={styles.headerText}>
              DESCUENTOS Y REBAJAS OTORGADOS
            </TableCell>
            <TableCell style={styles.headerText}>TOTAL</TableCell>
          </TableHeader>
          <TableBody></TableBody>
        </Table>

        <View>
          <View style={styles.headerText2}>
            <Text>DESCUENTOS OTORGADOS L.</Text>
          </View>
          <View style={styles.headerText2}>
            <Text>REBAJAS OROTGADAS L.</Text>
          </View>
          <View style={styles.headerText2}>
            <Text>FLETE L.</Text>
          </View>
          <View style={styles.headerText2}>
            <Text>SUB-TOTAL L.</Text>
          </View>
          <View style={styles.headerText2}>
            <Text>IMPORTE EXENTO L.</Text>
          </View>
          <View style={styles.headerText2}>
            <Text>IMPORTE GRAVADO 18% L.</Text>
          </View>
          <View style={styles.headerText2}>
            <Text>IMPORTE GRAVADO 15% L.</Text>
          </View>
          <View style={styles.headerText2}>
            <Text>TASA ALÍCUOTA 0% L.</Text>
          </View>
          <View style={styles.headerText2}>
            <Text>I.S.V 15% L.</Text>
          </View>
          <View style={styles.headerText2}>
            <Text>I.S.V 18% L.</Text>
          </View>
          <View style={styles.headerText2}>
            <Text>IMPORTE EXONERADO L.</Text>
          </View>
          <View style={styles.headerText2}>
            <Text>TOTAL A PAGAR L.</Text>
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
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    margin: 5,
  },
  titleCol: {
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bolder",
    alignItems: "flex-start",
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
    flexDirection: "row",
  },
  lowSec: {
    display: "flex",
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: "10px",
    borderColor: "darkgrey",
  },
});

export default PDFBillCreator;
