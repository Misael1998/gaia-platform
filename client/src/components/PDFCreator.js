import React from 'react';
import { Page, View, Text, Document, StyleSheet, Image } from '@react-pdf/renderer'
import logo from '../assets/img/logo.png'
import { Table, TableHeader, TableCell, TableBody, DataTableCell } from '@david.kucsai/react-pdf-table'
import moment from 'moment'



const PDFCreator = ({ data, title }) => {
    return (
        <Document title={`${title} - ${moment().format('DD/MM/YYYY')}`}>
            <Page size='A4' wrap={false} style={styles.page}>
                <View style={styles.titleContainer}>
                    <View>
                        <Image source={logo} style={styles.image} />
                    </View>

                    <View>
                        <Text style={styles.title}>Remisiones</Text>
                    </View>
                    <View>
                        <Text style={styles.date}>Fecha: {moment().format('DD/MM/YYYY')}</Text>
                    </View>

                </View>
                <Table data={data}>
                    <TableHeader>
                        <TableCell style={styles.headerText}>
                            N° de Orden
                        </TableCell>
                        <TableCell style={styles.headerText}>
                            Fecha de emisión
                        </TableCell>
                        <TableCell style={styles.headerText}>
                            Fecha de expiración
                        </TableCell>
                        <TableCell style={styles.headerText}>
                            Empleado solicitante
                        </TableCell>
                        <TableCell style={styles.headerText}>
                            Empleado receptor
                        </TableCell>
                        <TableCell style={styles.headerText}>
                            Empleado que envía
                        </TableCell>
                        <TableCell style={styles.headerText}>
                            Empleado que realizó la orden
                        </TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell style={styles.text} getContent={(r) => r.idOrder} />
                        <DataTableCell style={styles.text} getContent={(r) => moment(r.emission_date).format('DD/MM/YYYY')} />
                        <DataTableCell style={styles.text} getContent={(r) => moment(r.expired_date).format('DD/MM/YYYY')} />
                        <DataTableCell style={styles.text} getContent={(r) => r.AddresseeEmployee} />
                        <DataTableCell style={styles.text} getContent={(r) => r.ReceiverEmployee} />
                        <DataTableCell style={styles.text} getContent={(r) => r.SenderEmployee} />
                        <DataTableCell style={styles.text} getContent={(r) => r.CreatedEmployee} />
                    </TableBody>
                </Table>
            </Page>
        </Document>
    );
};


const styles = StyleSheet.create({
    page: {
        padding: 20,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        width: '100%',
        margin: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    date:{
        fontSize: 14
    },
    image: {
        width: 130,
        height: 40,
    },
    text: {
        fontSize: 12,
        padding: 5,
        textAlign: 'center'
    },
    headerText: {
        padding: 5,
        fontSize: 10,
        backgroundColor: '#27ae60',
        textAlign: 'center',
        color: 'white',
    }
})


export default PDFCreator;