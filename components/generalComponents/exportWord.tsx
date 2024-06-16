// components/ExportWordButton.tsx
import { Button } from 'flowbite-react';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun } from 'docx';
import type { Clientes } from '@prisma/client';

interface ExportWordButtonProps {
  data: Clientes[];
}

export const ExportWordButton = ({ data }: ExportWordButtonProps) => {
  const exportToWord = async () => {
    const tableRows = [
      new TableRow({
        children: [
            new TableCell({ children: [new Paragraph("ID")] }),
          new TableCell({ children: [new Paragraph("CLIENT NAME")] }),
          new TableCell({ children: [new Paragraph("EMAIL")] }),
          new TableCell({ children: [new Paragraph("TELEFONO")] }),
          new TableCell({ children: [new Paragraph("DIRECCIÓN")] }),
          new TableCell({ children: [new Paragraph("CIUDAD")] }),
          new TableCell({ children: [new Paragraph("PAIS")] }),
        ],
      }),
      ...data.map(item => new TableRow({
        children: [
            new TableCell({ children: [new Paragraph(item.IDCliente.toString())] }),
          new TableCell({ children: [new Paragraph(item.Nombre)] }),
          new TableCell({ children: [new Paragraph(item.Correo)] }),
          new TableCell({ children: [new Paragraph(item.Telefono || '')] }),
          new TableCell({ children: [new Paragraph(item.Direccion || '')] }),
          new TableCell({ children: [new Paragraph(item.Ciudad || '')] }),
          new TableCell({ children: [new Paragraph(item.Pais || '')] }),
        ],
      })),
    ];

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Table({
              rows: tableRows,
            }),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    saveAs(blob, 'data.docx');
  };

  return (
    <Button color="blue" onClick={exportToWord}>Exportar a Word</Button>
  );
};
