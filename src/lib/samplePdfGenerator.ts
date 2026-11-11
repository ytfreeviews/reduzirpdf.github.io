import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

/**
 * Cria uma imagem realista de alta resolução em canvas para simular fotos em documentos
 */
function createHighResImageBlob(width: number, height: number, color1: string, color2: string, text: string): Promise<Uint8Array> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    // Fundo com gradiente suave
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Adicionar texturas e padrões simulando fotografia de alta resolução
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${0.05 + (i % 5) * 0.02})`;
      ctx.beginPath();
      ctx.arc(
        (i * 137) % width,
        (i * 97) % height,
        20 + (i % 8) * 15,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Grade técnica
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    for (let x = 0; x < width; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Texto centralizado
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, width / 2, height / 2);
    ctx.font = '20px sans-serif';
    ctx.fillText('Registro Fotográfico de Alta Resolução', width / 2, height / 2 + 40);

    canvas.toBlob((blob) => {
      blob!.arrayBuffer().then((buffer) => {
        resolve(new Uint8Array(buffer));
      });
    }, 'image/jpeg', 0.95);
  });
}

/**
 * Gera um arquivo PDF de exemplo de ~1,5 MB a 2 MB com 2 páginas, textos e fotos
 * para demonstração e testes imediatos no navegador.
 */
export async function generateSamplePdfFile(): Promise<File> {
  const pdfDoc = await PDFDocument.create();
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Gerar duas imagens JPEG ricas de alta resolução (1200x800) para criar um arquivo de ~1.5 - 2 MB
  const imgBytes1 = await createHighResImageBlob(1400, 900, '#1E40AF', '#3B82F6', 'Anexo Fotográfico 01');
  const imgBytes2 = await createHighResImageBlob(1400, 900, '#065F46', '#10B981', 'Anexo Fotográfico 02');

  const embeddedImg1 = await pdfDoc.embedJpg(imgBytes1);
  const embeddedImg2 = await pdfDoc.embedJpg(imgBytes2);

  // Página 1: Folha de Rosto e Documento Principal
  const page1 = pdfDoc.addPage([595.28, 841.89]); // A4 padrão
  const { width: p1Width, height: p1Height } = page1.getSize();

  // Cabeçalho
  page1.drawText('REPÚBLICA FEDERATIVA DO BRASIL', {
    x: 50,
    y: p1Height - 50,
    size: 11,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2)
  });

  page1.drawText('RELATÓRIO TÉCNICO E DOCUMENTAÇÃO COMPLETA', {
    x: 50,
    y: p1Height - 75,
    size: 16,
    font: fontBold,
    color: rgb(0.09, 0.25, 0.7)
  });

  page1.drawText('Documento para submissão digital em plataforma governamental ou corporativa.', {
    x: 50,
    y: p1Height - 95,
    size: 9,
    font: fontRegular,
    color: rgb(0.4, 0.4, 0.4)
  });

  // Linha divisória
  page1.drawLine({
    start: { x: 50, y: p1Height - 110 },
    end: { x: p1Width - 50, y: p1Height - 110 },
    thickness: 1,
    color: rgb(0.8, 0.8, 0.8)
  });

  // Texto descritivo
  const paragraph = 
    'Este é um arquivo PDF de exemplo gerado localmente pelo ReduzirPDF para testes de compressão.\n' +
    'Ele contém 2 páginas, textos formatados, metadados e imagens em alta definição que aumentam o\n' +
    'tamanho original do arquivo para cerca de 1,5 MB. Utilize-o para testar as opções de compressão\n' +
    'para 500 KB, 200 KB ou 100 KB e verificar a qualidade resultante após o processamento local.';

  page1.drawText(paragraph, {
    x: 50,
    y: p1Height - 140,
    size: 10,
    font: fontRegular,
    lineHeight: 14,
    color: rgb(0.15, 0.15, 0.15)
  });

  // Imagem na página 1
  page1.drawImage(embeddedImg1, {
    x: 50,
    y: p1Height - 480,
    width: p1Width - 100,
    height: 300
  });

  page1.drawText('Figura 1: Registro fotográfico anexado em resolução original (300 DPI equivalente).', {
    x: 50,
    y: p1Height - 500,
    size: 8,
    font: fontRegular,
    color: rgb(0.5, 0.5, 0.5)
  });

  // Rodapé página 1
  page1.drawText('Página 1 de 2 — Gerado para teste com ReduzirPDF', {
    x: 50,
    y: 35,
    size: 8,
    font: fontRegular,
    color: rgb(0.6, 0.6, 0.6)
  });

  // Página 2: Continuação com mais imagem e assinatura
  const page2 = pdfDoc.addPage([595.28, 841.89]);
  const { height: p2Height, width: p2Width } = page2.getSize();

  page2.drawText('ANEXO II — REGISTRO COMPLEMENTAR E TERMO DE CIÊNCIA', {
    x: 50,
    y: p2Height - 50,
    size: 13,
    font: fontBold,
    color: rgb(0.09, 0.25, 0.7)
  });

  page2.drawImage(embeddedImg2, {
    x: 50,
    y: p2Height - 420,
    width: p2Width - 100,
    height: 330
  });

  page2.drawText('Termo de Conformidade Digital:', {
    x: 50,
    y: p2Height - 450,
    size: 11,
    font: fontBold,
    color: rgb(0.15, 0.15, 0.15)
  });

  page2.drawText(
    'Declaro para os devidos fins que o presente arquivo foi conferido na íntegra e atende aos\n' +
    'padrões de envio exigidos. Processamento local realizado com estrita privacidade de dados.',
    {
      x: 50,
      y: p2Height - 475,
      size: 9,
      font: fontRegular,
      lineHeight: 14,
      color: rgb(0.3, 0.3, 0.3)
    }
  );

  // Caixa de assinatura simulada
  page2.drawRectangle({
    x: 50,
    y: p2Height - 600,
    width: 250,
    height: 70,
    borderColor: rgb(0.7, 0.7, 0.7),
    borderWidth: 1,
    color: rgb(0.97, 0.98, 1.0)
  });

  page2.drawText('Assinatura do Responsável Técnico', {
    x: 60,
    y: p2Height - 590,
    size: 9,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2)
  });

  page2.drawText('Carimbo e autenticação digital', {
    x: 60,
    y: p2Height - 550,
    size: 8,
    font: fontRegular,
    color: rgb(0.5, 0.5, 0.5)
  });

  // Rodapé página 2
  page2.drawText('Página 2 de 2 — ReduzirPDF — Documento de Teste', {
    x: 50,
    y: 35,
    size: 8,
    font: fontRegular,
    color: rgb(0.6, 0.6, 0.6)
  });

  const pdfBytes = await pdfDoc.save();
  return new File([pdfBytes.buffer as ArrayBuffer], 'exemplo-documento-com-fotos.pdf', {
    type: 'application/pdf',
    lastModified: Date.now()
  });
}
