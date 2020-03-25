import React from 'react';
import {PDFViewer, StyleSheet} from '@react-pdf/renderer'
import PDFCreator from './PDFCreator';



const PDFView = ({data, docTitle}) => {
    return (
        <PDFViewer style={styles.viewer}>
            <PDFCreator data={data} title={docTitle}/>
        </PDFViewer>
    );
};

const styles = StyleSheet.create({
    viewer: {
        width: '100%',
        height: '100%'
    }
})

export default PDFView;