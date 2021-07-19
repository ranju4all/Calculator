import React from 'react';

import {
    Document,
    Page,
    Text,
    View,
    StyleSheet
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        fontSize: 10
    }

});

const PdfDocument = props => (
    <Document>
        <Page size="A4" >
            <Text style={{ fontSize: 15, padding: 10, margin: 10, textAlign: 'left' }}> {props.pdfDocumentData} </Text>
            <View style={styles.view}>
               
            </View>
        </Page>
    </Document>
);

export default PdfDocument
