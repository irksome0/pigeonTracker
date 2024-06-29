"use server";

import ReactPDF, { Page, Document, StyleSheet} from '@react-pdf/renderer';
import { Pedigree } from './Pedigree';

interface PDFPedigreeItem{
    pigeonNumber: number | null;
    mother: PDFPedigreeItem | null;
    father: PDFPedigreeItem | null;
}
interface PDFPedigreeProps{
    pigeons: PDFPedigreeItem
}

const styles = StyleSheet.create({
    page: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        textAlign:"center",
    },
})

const PDFpedigree = (props: PDFPedigreeProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Pedigree pigeons={props.pigeons}/>
        </Page>
    </Document>
);

export const renderPage = (pedigree: PDFPedigreeItem) => {
    ReactPDF.render(<PDFpedigree pigeons={pedigree} />, `D:\\Downloads\\example.pdf`);
}