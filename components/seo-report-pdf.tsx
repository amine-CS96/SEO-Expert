import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { SEOAuditReport } from '@/types/seo'

export const generateProfessionalPDF = async (data: SEOAuditReport) => {
  try {
    console.log('🚀 Starting professional PDF generation with HTML capture:', data.url)
    
    // Find the SEO report element
    const reportElement = document.getElementById('seo-report')
    if (!reportElement) {
      throw new Error('SEO report element not found')
    }

    // Show loading indicator
    const loadingToast = document.createElement('div')
    loadingToast.innerHTML = `
      <div style="position: fixed; top: 20px; right: 20px; background: #3B82F6; color: white; padding: 12px 20px; border-radius: 8px; z-index: 9999; font-family: system-ui; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="width: 16px; height: 16px; border: 2px solid #ffffff40; border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
          Generating professional PDF...
        </div>
      </div>
      <style>
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      </style>
    `
    document.body.appendChild(loadingToast)

    // Prepare the element for high-quality capture
    await prepareElementForCapture(reportElement)

    // Configure html2canvas for maximum quality
    const canvas = await html2canvas(reportElement, {
      scale: 2, // High DPI for crisp text
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
      width: reportElement.scrollWidth,
      height: reportElement.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: 1200,
      windowHeight: reportElement.scrollHeight,
      onclone: (clonedDoc) => {
        // Apply print-specific styles to the cloned document
        const clonedElement = clonedDoc.getElementById('seo-report')
        if (clonedElement) {
          applyPrintStyles(clonedElement)
        }
      }
    })

    // Create PDF with optimal settings
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    // Add metadata
    pdf.setProperties({
      title: `SEO Audit Report - ${data.url}`,
      subject: 'Professional SEO Analysis and Recommendations',
      author: 'SEO Audit Tool',
      keywords: 'SEO, audit, analysis, optimization, website, performance',
      creator: 'Professional SEO Audit Generator'
    })

    let heightLeft = imgHeight
    let position = 0

    // Add first page
    pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    // Generate filename
    const cleanUrl = data.url.replace(/https?:\/\//, '').replace(/[^a-zA-Z0-9.-]/g, '-')
    const timestamp = new Date().toISOString().split('T')[0]
    const fileName = `Professional-SEO-Audit-${cleanUrl}-${timestamp}.pdf`

    // Save the PDF
    pdf.save(fileName)

    // Remove loading indicator
    document.body.removeChild(loadingToast)

    // Restore original styles
    await restoreElementStyles(reportElement)

    console.log('✅ Professional PDF generated successfully:', fileName)
    console.log('📊 Report details:', {
      url: data.url,
      overallScore: data.overallScore,
      canvasSize: `${canvas.width}x${canvas.height}`,
      pdfPages: Math.ceil(imgHeight / pageHeight),
      quality: 'High (2x scale, JPEG 95%)'
    })

  } catch (error) {
    console.error('❌ Error generating PDF:', error)
    
    // Remove loading indicator if it exists
    const loadingElement = document.querySelector('[style*="Generating professional PDF"]')?.parentElement
    if (loadingElement) {
      document.body.removeChild(loadingElement)
    }
    
    // Show error message
    const errorToast = document.createElement('div')
    errorToast.innerHTML = `
      <div style="position: fixed; top: 20px; right: 20px; background: #EF4444; color: white; padding: 12px 20px; border-radius: 8px; z-index: 9999; font-family: system-ui; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
        ❌ Error generating PDF. Please try again.
      </div>
    `
    document.body.appendChild(errorToast)
    
    setTimeout(() => {
      if (document.body.contains(errorToast)) {
        document.body.removeChild(errorToast)
      }
    }, 5000)
  }
}

// Prepare element for high-quality capture
async function prepareElementForCapture(element: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    // Force layout recalculation
    element.style.transform = 'translateZ(0)'
    element.style.backfaceVisibility = 'hidden'
    element.style.perspective = '1000px'
    
    // Ensure all images are loaded
    const images = element.querySelectorAll('img')
    const imagePromises = Array.from(images).map((img) => {
      return new Promise((resolve) => {
        if (img.complete) {
          resolve(true)
        } else {
          img.onload = () => resolve(true)
          img.onerror = () => resolve(true)
        }
      })
    })

    Promise.all(imagePromises).then(() => {
      // Small delay to ensure rendering is complete
      setTimeout(resolve, 100)
    })
  })
}

// Apply print-specific styles
function applyPrintStyles(element: HTMLElement): void {
  const style = document.createElement('style')
  style.textContent = `
    /* High-quality print styles */
    * {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    /* Ensure text is crisp */
    body, * {
      text-rendering: optimizeLegibility !important;
      -webkit-font-smoothing: antialiased !important;
      -moz-osx-font-smoothing: grayscale !important;
    }
    
    /* Improve contrast for better readability */
    .text-gray-600 { color: #4B5563 !important; }
    .text-gray-500 { color: #6B7280 !important; }
    .text-gray-400 { color: #9CA3AF !important; }
    
    /* Ensure backgrounds are visible */
    .bg-white { background-color: #ffffff !important; }
    .bg-gray-50 { background-color: #F9FAFB !important; }
    .bg-gray-100 { background-color: #F3F4F6 !important; }
    .bg-blue-50 { background-color: #EFF6FF !important; }
    .bg-green-50 { background-color: #F0FDF4 !important; }
    .bg-red-50 { background-color: #FEF2F2 !important; }
    .bg-yellow-50 { background-color: #FEFCE8 !important; }
    
    /* Enhance borders */
    .border { border-width: 1px !important; }
    .border-gray-200 { border-color: #E5E7EB !important; }
    .border-gray-300 { border-color: #D1D5DB !important; }
    
    /* Improve shadows for depth */
    .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important; }
    .shadow { box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important; }
    
    /* Ensure proper spacing */
    .space-y-4 > * + * { margin-top: 1rem !important; }
    .space-y-6 > * + * { margin-top: 1.5rem !important; }
    .space-y-8 > * + * { margin-top: 2rem !important; }
    
    /* Hide elements that shouldn't be in PDF */
    .no-print,
    [data-no-print],
    .print\\:hidden {
      display: none !important;
    }
    
    /* Ensure charts and graphics are visible */
    canvas, svg {
      max-width: 100% !important;
      height: auto !important;
    }
    
    /* Improve button and interactive element appearance */
    button, .button {
      border: 1px solid #D1D5DB !important;
      background-color: #F9FAFB !important;
    }
    
    /* Ensure proper text wrapping */
    .break-words {
      word-wrap: break-word !important;
      overflow-wrap: break-word !important;
    }
  `
  
  element.ownerDocument.head.appendChild(style)
}

// Restore original element styles
async function restoreElementStyles(element: HTMLElement): Promise<void> {
  element.style.transform = ''
  element.style.backfaceVisibility = ''
  element.style.perspective = ''
}

// Export additional utility for direct HTML capture
export const captureElementAsPDF = async (elementId: string, filename?: string) => {
  const element = document.getElementById(elementId)
  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found`)
  }

  await prepareElementForCapture(element)

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: false,
    backgroundColor: '#ffffff',
    logging: false,
    onclone: (clonedDoc) => {
      const clonedElement = clonedDoc.getElementById(elementId)
      if (clonedElement) {
        applyPrintStyles(clonedElement)
      }
    }
  })

  const imgWidth = 210
  const pageHeight = 297
  const imgHeight = (canvas.height * imgWidth) / canvas.width

  const pdf = new jsPDF('p', 'mm', 'a4')
  
  let heightLeft = imgHeight
  let position = 0

  pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, position, imgWidth, imgHeight)
  heightLeft -= pageHeight

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight
    pdf.addPage()
    pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
  }

  const finalFilename = filename || `capture-${Date.now()}.pdf`
  pdf.save(finalFilename)

  await restoreElementStyles(element)
}